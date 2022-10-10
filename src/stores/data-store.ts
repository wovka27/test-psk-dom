import { defineStore } from 'pinia';
import { DataType } from 'src/types';
import { useData } from 'src/use';

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      data: {} as DataType,
    };
  },
  getters: {},
  actions: {
    async getData() {
      const { responseData } = await useData();
      Object.assign(this.data, responseData);
    },
  },
});
