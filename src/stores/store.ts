import { api } from "src/boot/axios";
import { Marker, Point, FilterLocalizedCollection } from "./../types";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    allObjects: [] as Marker[],
    leftTopPoint: null as Point | null,
    centerPoint: null as Point | null,
    map_filters: {} as FilterLocalizedCollection,
    appliedFilters: [],
  }),
  getters: {
    map_markers: (state) => {
      return `
      {map_markers (general:{
          language:"by",
          city:"minsk",
          country:"by",
          subscription:"platinum",
          activity:[],
          tag:[]
          },
          leftTopPoint: {
            lat: ${state.leftTopPoint?.lat},
            lng: ${state.leftTopPoint?.lng},
          },
          centerPoint:{
            lat: ${state.centerPoint?.lat},
            lng: ${state.centerPoint?.lng},
          },
        )
        {
          lat
          lng
          suppliers {
            id
            name
          }
        }
    }
    `;
    },
  },
  actions: {
    async loadMapFilters() {
      const query = `
      {
        map_filters(general: {language: "by", city: "minsk", subscription: "gold", country: "by"}) {
          activity {
            key
            value
          }
        }
      }
    `;

      await api
        .post("/", { query })
        .then(({ data }) => (this.$state.map_filters = data.data.map_filters));
    },
    async uploadAllObjects() {
      const query = `
      {map_markers (general:{
          language:"by",
          city:"minsk",
          country:"by",
          subscription:"platinum",
          activity:[${this.$state.appliedFilters}],
          tag:[]
          },
          leftTopPoint: {
            lat: ${this.$state.leftTopPoint?.lat},
            lng: ${this.$state.leftTopPoint?.lng},
          },
          centerPoint:{
            lat: ${this.$state.centerPoint?.lat},
            lng: ${this.$state.centerPoint?.lng},
          },
        )
        {
          lat
          lng
          suppliers {
            id
            name
          }
        }
    }
    `;
      console.log(query);
      await api
        .post("/", { query })
        .then(({ data }) => (this.$state.allObjects = data.data.map_markers));
    },
  },
});
