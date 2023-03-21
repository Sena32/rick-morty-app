import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatterEpisodesToTable, statusToColor } from "../../helpers";
import InfoCard from "../../shared/info-card";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import ListTable from "../../shared/table";
import http from "../../utils/http";
import "./DetailCharacter.css";

const DetailCharacter = () => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getEpisodes = async (ids, cb) => {
    try {
      const { data } = await http.get(`/episode/${ids}`);
      cb && cb(data, null);
    } catch (e) {
      cb && cb(null, e);
    }
  };

  const handleEpisode = (characters) => {
    const episodesArr = characters.map((el) => el.replace(/\D/g, ""));
    const ids = episodesArr?.length ? episodesArr.join(", ") : null;
    if (!ids) return [];
    getEpisodes(ids, (data, error) => {
      if (data) {
        setEpisodes(data);
      }
      if (error) {
        console.log(error);
      }
    });
  };

  const handleNext = (row) => {
    navigate(`/episodio/${row[0]}`);
  };

  useEffect(() => {
    const getCharacter = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/character/${id}`);
        handleEpisode(data.episode);
        setCharacter(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    getCharacter();
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
      {character ? (
        <div className="container-character">
          <div className="container-card">
            <InfoCard
              imgUrl={character.image}
              imgAlt={`${character.nome} imagem`}
            />
          </div>
          <div className="container-content">
            <div className="content">
              <h3 className="title">{character.name}</h3>
              <div className="content-row">
                <div
                  className={`status ${statusToColor(character.status)}`}
                ></div>
                <span>{character.status}</span>
                <span>{character.species}</span>
              </div>
              <span>Origem: {character.origin?.name ?? "--"}</span>
              <span>Localização: {character.location?.name ?? "--"}</span>
            </div>
            <div className="list-content">
              <ListTable
                header={["#","Título do Episódio"] }
                rows={formatterEpisodesToTable(episodes)}
                handleRow={(row)=>handleNext(row)}
              />
            </div>
          </div>
        </div>
      ) : (
        <span>Nenhum personagem foi carregado</span>
      )}
    </SectionWrapper>
  );
};

export default DetailCharacter;
