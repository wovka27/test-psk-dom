<template>
  <router-view />
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {useDataStore} from 'stores/data-store';

export default defineComponent({
  name: 'App',
  setup() {
    const {getData} = useDataStore();

    onMounted(async () => {
      await getData()
    })
  }
});
</script>
