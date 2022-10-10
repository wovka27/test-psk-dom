<template>
  <div>
    <FilterComponent :data="responseData" />
    <GPListComponent :data="responseData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useData} from 'src/use';
import FilterComponent from 'components/FilterComponent.vue';
import GPListComponent from 'components/GPListComponent.vue';
export default defineComponent({
  name: 'ContainerComponent',
  components: {GPListComponent, FilterComponent},
  async setup(){
    const {responseData} = await useData();
    return {responseData}
  },
})
</script>
