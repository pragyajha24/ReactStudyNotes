import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  //deriving country array from cities array
  //   const countries = [];
  const countries = cities.reduce(function (arr, city) {
    if (
      !arr.some(function (el) {
        return el.country.includes(city.country);
      })
    )
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(function (country) {
        return <CountryItem country={country} />;
      })}
    </ul>
  );
}
