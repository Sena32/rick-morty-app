import { Link } from "react-router-dom";
import "./InfoCard.css";

const InfoCard = ({
  children,
  type = "card-image",
  imgUrl,
  imgAlt,
  source,
  isClickable = false,
  isFullWith = false,
}) => {
  if (!isClickable) {
    return (
      <div className={isFullWith ? "info-card-full" : "info-card"}>
        {type === "card-image" && (
          <div className="image-container">
            <img src={imgUrl} alt={imgAlt} />
          </div>
        )}

        {children}
      </div>
    );
  } else {
    return (
      <Link
        to={source}
        className={`${isFullWith ? "info-card-full" : "info-card"} ${
          isClickable && "info-card-link"
        }`}
      >
        {type === "card-image" && (
          <div className="image-container">
            <img src={imgUrl} alt={imgAlt} />
          </div>
        )}
        {children}
      </Link>
    );
  }
};

export default InfoCard;
