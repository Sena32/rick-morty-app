import { useEffect, useState } from "react";
import InfoCard from "../../shared/info-card";
import InfoCardList from "../../shared/infor-card-list";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import http from "../../utils/http";
import "./EpisodeList.css";

const EpisodeList = () => {
  const [episode, setEpisode] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getEpisode = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const { data } = await http.get("/episode");
        setEpisode(data.results);
      } catch (erro) {
        if (erro.response.status === 404) {
          setHasError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getEpisode();
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
        {hasError && <span>Nenhum episódio encontrado</span>}
        {episode?.length ? (
          episode.map((item) => (
            <InfoCard
              type={'card-text'}
              source={`/episodio/${item.id}`}
              isClickable={true}
              key={item.id}
            >
              <div className="info-card__content">
                <h5 className="title">
                  {item.name}
                </h5>
                <span>Data de Estréia: {item.air_date ?? "--"}</span>
              </div>
            </InfoCard>
          ))
        ) : (
          <p>Nenhum episódio encontrado</p>
        )}
      </InfoCardList>
    </SectionWrapper>
  );
};

export default EpisodeList;
