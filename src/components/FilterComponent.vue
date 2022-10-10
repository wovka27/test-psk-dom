<template>
  <div class="q-pa-md">
    <q-btn-group rounded>
      <q-btn @click="setFilterData(filter.dataCount)" rounded color="secondary" :label="`Найдено(${filter.dataCount.length})`"/>

      <q-btn @click="setFilterData(filter.bookingDataCount)" rounded color="warning" :label="`Бронь(${filter.bookingDataCount.length})`"/>
      <q-btn @click="setFilterData(filter.freeDataCount)" rounded color="positive" :label="`Свободно(${filter.freeDataCount.length})`"/>

      <q-btn-dropdown auto-close rounded color="primary" label="Еще" split>
        <q-list padding style="width: 250px">
          <q-item clickable>
            <q-item-section>
              <q-item-label>Рассрочка</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Субсидия</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Ремонт</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
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
  setup(){
    const {setFilterData} = useFilterStore()
    return {setFilterData}
  }
})
</script>
