import { Supplier } from '../types';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    supplier: {} as Supplier,
  }),
  getters: {},
  actions: {
    async loadData(id: number) {
      const query = `
      {
        supplier(id:${id}) {
          id
          name
          info
          phone
          url
          address
        }
      }
    `;
      await api
        .post('/', { query })
        .then(({ data }) => (this.$state.supplier = data.data.supplier));
    },
  },
});
