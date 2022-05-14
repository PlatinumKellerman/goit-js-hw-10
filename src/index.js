import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countyInfoThumb = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
  const name = inputEl.value;
  if (name) {
    const fetchCountriesResult = fetchCountries(name);
    fetchCountriesResult.then((country) => {
      if (country.length <= 10 & country.length > 1) {
        const newCountryListMarkup = createCountryListMarkup(country);
        countyInfoThumb.innerHTML = "";
        countryList.innerHTML = newCountryListMarkup;
      } else if (country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.", {
          width: '400px',
          position: 'center-top',
          timeout: 1500,
          borderRadius: '20px',
          fontSize: '20px',
          cssAnimationStyle: 'zoom',
        })
      } else if (country.length === 1) {
        countryList.innerHTML = "";
        createCountryInfoMarkup(country);
        const countryInfoMarkup = createCountryInfoMarkup(country);
        countyInfoThumb.innerHTML = countryInfoMarkup;
      }
    }).catch(() => {
      Notify.failure("Oops, there is no country with that name", {
        width: '400px',
        position: 'center-top',
        timeout: 1500,
        borderRadius: '20px',
        fontSize: '20px',
        cssAnimationStyle: 'zoom',
      })
    })
  } else {
    countyInfoThumb.innerHTML = "";
    countryList.innerHTML = "";
  }
}

function createCountryInfoMarkup(countries) {
  return countries.map(country => {
    const language = Object.values(country.languages).map(lang => {
      return lang.name;
    }).join(', ');
    return `
            <div class="info-wrapper">
            <img 
            class="flag__image"
            width="60"
            heigh="60"
            src="${Object.values(country.flags)[0]}" 
            alt="Country Flag"
            />
            <p class="country-info__name">${country.name}</p>
            </div>
        <p class="country-info">Capital: <span class="country-info__value__special">${country.capital}</span></p>
        <p class="country-info">Population: <span class="country-info__value">${country.population}</span></p>
        <p class="country-info">Languages: <span class="country-info__value">${language}</span></p>`
  }).join('');
}

function createCountryListMarkup(countries) {
  return countries.map(country => {
    return `<li class="country-list__item">
        <img 
            class="flag__image"
            src="${Object.values(country.flags)[0]}" 
            alt="Country Flag"
        />
        <p class="country-list__name">${country.name}</p>
    </li>`
  }).join('');
}