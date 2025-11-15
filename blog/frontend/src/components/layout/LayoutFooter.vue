<script setup>
import { onBeforeMount, ref } from 'vue';
import LayoutContainer from './LayoutContainer.vue'

const year = new Date().toLocaleDateString('ru', { year: 'numeric' })

const city = ref('')
const temp = ref(0)
const precStrenght = ref(0)


const fetchWeatherData = (lat, long, headers) => {

  fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${long}`, { headers })
      .then(response => response.json())
      .then(json => {
        city.value = json.geo_object.locality.name;
        temp.value = json.fact.temp;
        precStrenght.value = json.fact.prec_strength

      });
}

onBeforeMount(() => {
  const accessKey = import.meta.env.VITE_APP_YANDEX_WEATHER_KEY;

  const headers = {
      'X-Yandex-Weather-Key': accessKey
  };

  navigator.geolocation.getCurrentPosition((position) => {
    fetchWeatherData(position.coords.latitude, position.coords.longitude, headers)
  }, () => {
    fetchWeatherData(55.03, 82.94, headers)
  });



})

</script>

<template>
  <LayoutContainer>
    <div class="flex items-center justify-between py-8">
      <div>
        <p>Веб-разработчики</p>
        <p>
          <a href="mailto:web@developer.ru">web@developer.ru</a>
        </p>
      </div>
      <div class="text-right">
        <p>
          {{ city }}
          <time :datetime="year">{{ year }}</time>
        </p>
        <p>Погода: сила осадков {{ precStrenght }}, {{ temp }} C</p>
      </div>
    </div>
  </LayoutContainer>
</template>
