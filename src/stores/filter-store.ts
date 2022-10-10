import { defineStore } from 'pinia';
import {FlatType} from 'src/types';

export const useFilterStore = defineStore('filterData', {
  state: () => {
    return {filterData: [] as FlatType[]}
  } ,
  getters: {
  },
  actions: {
   setFilterData(data: FlatType[]){
     this.filterData.splice(0, this.filterData.length)
     this.filterData.push(...data)
   }
  },
});
