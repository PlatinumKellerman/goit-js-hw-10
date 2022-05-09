import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries.js'


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countyInfoThumb = document.querySelector('.country-info');

inputEl.addEventListener('input', onInput)

function onInput() {
    const name = inputEl.value;
    fetchCountries(name)
}


