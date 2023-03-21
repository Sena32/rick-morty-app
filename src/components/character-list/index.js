import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import { statusToColor } from "../../helpers";
import InfoCard from "../../shared/info-card";
import InfoCardList from "../../shared/infor-card-list";
import SectionWrapper from "../../shared/section-wrapper";
import CustomSpinner from "../../shared/spinner/Spinner";
import http from "../../utils/http";
import "./CharacterList.css";

const CharacterList = () => {
  const [character, setCharacter] = useState([]);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getCharacter = async (page) => {
    try {
      setIsLoading(true);
      setHasError(false);
      const { data } = await http.get(
        `/character/${page ? `?page=${page}` : ""}`
      );
      setCharacter(data.results);
      setInfo(data.info);
    } catch (erro) {
      if (erro.response.status === 404) {
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (info.next) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const handlePrev = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    getCharacter(page);
  }, [page]);

  if (isLoading) {
    return (
      <SectionWrapper className="d-flex justify-content-center">
        <CustomSpinner />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="d-flex">
      <InfoCardList>
        {hasError && <span>Nenhum personagem encontrado</span>}
        {character?.length ? (
          character.map((item) => (
            <InfoCard
              imgUrl={item.image}
              imgAlt={`${item.name} imagem`}
              source={`/personagem/${item.id}`}
              isClickable={true}
              key={item.id}
            >
              <div className="info-card__content">
                <h5 className="title">{item.name}</h5>
                <div className="content-row">
                  <div className={`status ${statusToColor(item.status)}`}></div>
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
      <Row className="mt-4">
        <ButtonGroup >
          <Button variant="dark" className="py-3" onClick={handlePrev}>
            Voltar
          </Button>
          <Button variant="dark" onClick={handleNext}>
            Avançar
          </Button>
        </ButtonGroup>
      </Row>
    </SectionWrapper>
  );
};

export default CharacterList;
