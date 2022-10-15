<template>
  <q-page class="column-lg justify-center">
    <container-component />
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ContainerComponent from 'components/ContainerComponent.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {ContainerComponent},
});
</script>

<style scoped lang="scss">
.page {
  height: 100%;
}
</style>
