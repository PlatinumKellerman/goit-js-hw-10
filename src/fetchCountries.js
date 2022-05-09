export  function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags.svg,languages`)
        .then((response) => response.json()).then((county) => console.log(county));
}