import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const flagEmojiToPNG = function (flag) {
    let countryCode = Array.from(flag, function (codeUnit) {
      return codeUnit.codePointAt();
    })
      .map(function (char) {
        return String.fromCharCode(char - 127397).toLowerCase();
      })
      .join("");

    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const { cityName, emoji, date, id } = city;
  // console.log(city);

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}> {flagEmojiToPNG(emoji)} </span>
        <h3 className={styles.name}>{cityName} </h3>
        <time className={styles.date}> ({formatDate(date)}) </time>
        <button className={styles.deleteBtn}>&times; </button>
      </Link>
    </li>
  );
}
