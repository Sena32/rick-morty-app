import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import ListTable from "../../shared/table";
import http from "../../utils/http";
import "./DetailLocation.css";

const DetailLocation = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCharacters = async (ids, cb) => {
    try {
      const { data } = await http.get(`/character/${ids}`);
      cb && cb(data, null);
    } catch (e) {
      cb && cb(null, e);
    }
  };

  const  handleCharacter =  (characters) => {

    const charactersArr = characters.map((el) => el.replace(/\D/g, ""));
    const ids = charactersArr?.length?charactersArr.join(', '): null;
    if(!ids) return [];
     getCharacters(ids, (data, error) => {
      if (data) {
        return data;
      }
      if (error) {
        console.log(error);
      }
    });
  };

  const handleNext = (id) => {
    navigate(`/episodio/${id}`);
  };

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/location/${id}`);
        setLocation(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    getLocation();
  }, [id]);

  if (isLoading) {
    return (
      <SectionWrapper>
        <CustomSpinner/>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      {location ? (
        <div className="container-location">
          <div className="container-content">
            <div className="content">
              <h3 className="title">{location.name}</h3>
              <span>Tipo: {location.type ?? "--"}</span>
              <span>Dimensão: {location.dimension ?? "--"}</span>
            </div>
            <div className="list-content">
              <ListTable
                header={["#","Nome do Personagem"]}
                rows={handleCharacter(location.residents)}
                handleRow={(id) => handleNext(id)}
              />
            </div>
          </div>
        </div>
      ) : (
        <span>Nenhuma localização foi carregada</span>
      )}
    </SectionWrapper>
  );
};

export default DetailLocation;
