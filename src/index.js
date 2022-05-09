import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries.js'


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countyInfoThumb = document.querySelector('.country-info');

inputEl.addEventListener('input', onInput)

function onInput() {
    const name = inputEl.value;
    fetchCountries(name).then(country => createMarkup(country))
}



//need make markup
function createMarkup(countries) {
    countries.map(country => {
        console.log(country);
        console.log(Object.values(country.flags)[1]);           //flag link
        console.log(country.name.official);                    //повна назва країни
        console.log(country.capital[0]);                       //столиця
        console.log(country.population);                      //населення
        console.log(Object.values(country.languages));        //масив мов
    })
}   