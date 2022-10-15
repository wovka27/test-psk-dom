<template>
  <div>
    <filter-component :data="data" :filter="filter"/>
    <g-p-list-component :data="data"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FilterComponent from 'components/FilterComponent.vue';
import GPListComponent from 'components/GPListComponent.vue';
import {useFilter} from 'src/use/filter';
import {useDataStore} from 'stores/data-store';

export default defineComponent({
  name: 'ContainerComponent',
  components: {GPListComponent, FilterComponent},
  setup() {
    const {data} = useDataStore();
    const filter = useFilter(data);
    return {data, filter};
  },
});
</script>
