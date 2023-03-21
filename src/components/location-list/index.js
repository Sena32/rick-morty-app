import { useEffect, useState } from "react";
import InfoCard from "../../shared/info-card";
import InfoCardList from "../../shared/infor-card-list";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import http from "../../utils/http";
import "./LocationList.css";

const LocationList = () => {
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const { data } = await http.get("/location");
        setLocation(data.results);
      } catch (erro) {
        if (erro.response.status === 404) {
          setHasError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getLocation();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper>
        <CustomSpinner/>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <InfoCardList>
        {hasError && <span>Nenhuma localização encontrada</span>}
        {location?.length ? (
          location.map((item) => (
            <InfoCard
              type={'card-text'}
              source={`/localizacao/${item.id}`}
              isClickable={true}
              key={item.id}
            >
              <div className="info-card__content">
                <h5 className="title">
                  {item.name}
                </h5>
                <span>Tipo: {item.type ?? "--"}</span>
                <span>Dimensão: {item.dimension ?? "--"}</span>
              </div>
            </InfoCard>
          ))
        ) : (
          <p>Nenhuma localização encontrada</p>
        )}
      </InfoCardList>
    </SectionWrapper>
  );
};

export default LocationList;
