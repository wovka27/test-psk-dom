<template>
  <div class="q-pa-md row justify-between">
    <q-btn-group rounded>
      <q-btn
        @click="setFilterData(filter.dataCount)"
        rounded
        color="secondary"
        :label="`Найдено(${filter.dataCount.length})`"/>

      <q-btn
        @click="setFilterData(filter.bookingDataCount)"
        rounded
        color="warning"
        :label="`Бронь(${filter.bookingDataCount.length})`"/>

      <q-btn
        @click="setFilterData(filter.freeDataCount)"
        rounded
        color="positive"
        :label="`Свободно(${filter.freeDataCount.length})`"/>

      <q-btn-dropdown auto-close rounded color="primary" label="Еще" split>
        <q-list padding style="width: 250px">
          <q-item clickable @click="setFilterData(filter.installmentCount)">
            <q-item-section>
              <q-item-label>Рассрочка({{ filter.installmentCount.length }})</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setFilterData(filter.subsidyCount)">
            <q-item-section>
              <q-item-label>Субсидия({{ filter.subsidyCount.length }})</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setFilterData(filter.renovationCount)">
            <q-item-section>
              <q-item-label>Ремонт({{ filter.renovationCount.length }})</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-btn-group>
    <div style="width: 200px">
      <q-badge color="primary" > По цене </q-badge>
      <q-range
        @change="onChange"
        v-model="standard"
        :min="500000"
        :max="100E6"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue'
import {FlatType} from 'src/types';
import {useFilterStore} from 'stores/filter-store';

export default defineComponent({
  name: 'FilterComponent',
  props: {
    filter: {
      type: Object as PropType<{
        dataCount: FlatType[],
        bookingDataCount: FlatType[],
        issuedDataCount: FlatType[],
        subsidyCount: FlatType[],
        installmentCount: FlatType[],
        renovationCount: FlatType[],
        freeDataCount: FlatType[],
        setFilterData: (d: FlatType[]) => void,
      }>,
      required: true,
    },
  },
  setup(props) {
    const {setFilterData} = useFilterStore()
    const standard = ref<{min?: number; max?: number}>({})
    const onChange = (value: {min: number; max: number}) => {
      const arr = (!isNaN(value.min) && !isNaN(value.max)) && props.filter.dataCount.filter(item => item.cost >= value.min && item.cost <= value.max)
      if (arr) {
        setFilterData(arr)
      }
    }
    return {setFilterData, onChange, standard}
  }
})
</script>
