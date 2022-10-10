<template>
  <div>
    <FilterComponent :data="responseData" :filter="filter" />
    <GPListComponent :data="responseData" :filter-data="filter.filterData.value"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useData} from 'src/use';
import FilterComponent from 'components/FilterComponent.vue';
import GPListComponent from 'components/GPListComponent.vue';
import {useFilter} from 'src/use/filter';
export default defineComponent({
  name: 'ContainerComponent',
  components: {GPListComponent, FilterComponent},
  async setup(){
    const {responseData} = await useData();
    const filter = useFilter(responseData);
    return {responseData, filter}
  },
})
</script>
