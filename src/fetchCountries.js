export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags.svg,languages,flags`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
}

