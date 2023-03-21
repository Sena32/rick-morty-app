import { useEffect, useState } from "react";
import InfoCard from "../../shared/info-card";
import InfoCardList from "../../shared/infor-card-list";
import SectionWrapper from "../../shared/section-wrapper";
import http from "../../utils/http";
import "./CharacterList.css";

const CharacterList = () => {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const { data } = await http.get("/character");
        setCharacter(data.results);
      } catch (erro) {
        if (erro.response.status === 404) {
          setHasError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getCharacter();
  }, []);

  if (isLoading) {
    return "...carregando";
  }

  return (
    <SectionWrapper>
      <InfoCardList>
        {hasError && <span>Nenhum personagem encontrado</span>}
        {character?.length ? (
          character.map((item) => (
            <InfoCard
              imgUrl={item.image}
              imgAlt={`${item.name} imagem`}
              source={`personagem/${item.id}`}
              isClickable={true}
              key={item.id}
            >
              <div className="info-card__content">
                <h5 className="title">
                  {item.name}
                </h5>
                <div className="content-row">
                  <div className={`status ${item.status==='human' && 'green'}`}></div>
                  <span>{item.status}</span>
                  <span>{item.species}</span>
                </div>
                <span>Origem: {item.origin?.name ?? "--"}</span>
              </div>
            </InfoCard>
          ))
        ) : (
          <p>Nenhum personagem encontrado</p>
        )}
      </InfoCardList>
    </SectionWrapper>
  );
};

export default CharacterList;
