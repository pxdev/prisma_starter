<script setup>
import {setRTLTextPlugin, Marker} from 'mapbox-gl';

const props = defineProps({
  location_lang: {
    type: Number,
    default: -104,
  },
  location_lat: {
    type: Number,
    default: 39,
  },
  location_zoom: {
    type: Number,
    default: 5,
  }
});


// Map options and marker position
const mapOptions = ref({
  container: 'MapboxPopupRef',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [props.location_lang, props.location_lat],
  zoom: props.location_zoom,
});

const markerPosition = ref([props.location_lang, props.location_lat]);


const onMapLoad = () => {
  setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js', null, true);
  mapOptions.value = {
    ...mapOptions.value,
    zoom: props.location_zoom,
    center: [props.location_lang, props.location_lat],
  };
  markerPosition.value = [props.location_lang, props.location_lat];

};

</script>

<template>

  <div class="relative w-full overflow-hidden rounded bg-gray-100 map-container h-[400px]">
    <mapbox-map :options="mapOptions"
                map-id="MapViewerRef"
                @load="onMapLoad">
      <MapboxDefaultMarker :lnglat="markerPosition" marker-id="MapViewerRef"/>
      <mapbox-geolocate-control position="top-left"/>
      <mapbox-navigation-control position="top-left"/>
    </mapbox-map>
  </div>
</template>

<style scoped>

</style>
