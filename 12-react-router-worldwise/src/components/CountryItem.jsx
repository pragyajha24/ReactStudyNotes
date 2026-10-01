import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
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

  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
