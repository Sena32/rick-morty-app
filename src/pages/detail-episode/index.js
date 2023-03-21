import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionWrapper from "../../shared/section-wrapper";
import ListTable from "../../shared/table";
import http from "../../utils/http";
import "./DetailEpisode.css";

const DetailEpisode = () => {
  const [episode, setEpisode] = useState(null);
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
    const ids = characters.map((el) => el.replace(/\D/g, ""));
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
    const getEpisode = async () => {
      setIsLoading(true);
      try {
        const { data } = await http.get(`/episode/${id}`);
        setEpisode(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    getEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return "carregando";
  }

  return (
    <SectionWrapper>
      {episode ? (
        <div className="container-episode">
          <div className="container-content">
            <div className="content">
              <h3 className="title">{episode.name}</h3>
              <span>Data de Estréia: {episode.air_date ?? "--"}</span>
            </div>
            <div className="list-content">
              <ListTable
                header={{ title: "Título do Episódio" }}
                rows={() => handleCharacter(episode.characters)}
                handleRow={(id) => handleNext(id)}
              />
            </div>
          </div>
        </div>
      ) : (
        <span>Nenhum Episódio foi carregado</span>
      )}
    </SectionWrapper>
  );
};

export default DetailEpisode;
