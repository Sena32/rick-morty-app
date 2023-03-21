import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatterCharactersToTable } from "../../helpers";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import ListTable from "../../shared/table";
import http from "../../utils/http";
import "./DetailLocation.css";

const DetailLocation = () => {
  const [location, setLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
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

  const handleCharacter = (characters) => {
    const charactersArr = characters.map((el) => el.replace(/\D/g, ""));
    const ids = charactersArr?.length ? charactersArr.join(", ") : null;
    if (!ids) return [];
    getCharacters(ids, (data, error) => {
      if (data) {
        setCharacters(data);
      }
      if (error) {
        console.log(error);
      }
    });
  };

  const handleNext = (row) => {
    navigate(`/personagem/${row[0]}`);
  };

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/location/${id}`);
        handleCharacter(data.residents);
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
        <CustomSpinner />
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
            <h5 className="title-table">Quem mora aqui</h5>
              <div className="list-content">
                <ListTable
                  header={["#", "Nome do Personagem", ""]}
                  rows={formatterCharactersToTable(characters)}
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
