<template>
  <FiltersComponent :></FiltersComponent>
  <div id="map" style="width: 100%; height: 500px; z-index: 1"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import L from "leaflet";
import { Marker } from "src/types";
import "leaflet/dist/leaflet.css";
import { api } from "src/boot/axios";
import FiltersComponent from "src/components/FiltersComponent.vue";
import { useStore } from "stores/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const initializeMapAndLocator = async () => {
  const map = L.map("map").setView([53.9, 27.56], 15);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  setMapPoints(map);
  await store.uploadAllObjects();
  await addMarkers(map);

  map.on("moveend", () => {
    setMapPoints(map);
    store.uploadAllObjects();
    addMarkers(map);
  });
};

const setMapPoints = (map: L.Map) => {
  store.leftTopPoint = {
    lat: map.getBounds().getNorthEast().lat,
    lng: map.getBounds().getSouthWest().lng,
  };
  store.centerPoint = {
    lat: map.getCenter().lat,
    lng: map.getCenter().lng,
  };
};

const addMarkers = async (map: L.Map) => {
  store.allObjects.forEach((e: Marker) => {
    addMarker(map, e);
  });
};

const addMarker = (map: L.Map, object: Marker) => {
  const icon = L.icon({
    iconUrl: "src/assets/icon.svg",
    iconSize: [30, 30],
  });

  L.marker([object.lat, object.lng], {
    title: object.suppliers[0].name,
    icon: icon,
  })
    .addTo(map)
    .on("click", () => {
      router.push("/" + object.suppliers[0].id);
    });
};

onMounted(() => {
  initializeMapAndLocator();
  store.loadMapFilters();
});
</script>
