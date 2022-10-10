<template>
  <div class="q-pa-md">
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
          <q-item clickable @click="setFilterData(filter.marginalData)">
            <q-item-section>
              <q-item-label>Маржа({{ filter.marginalData.length }})</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-btn-group>
    <q-separator class="q-mt-md q-mb-md"/>
    <div style="width: 200px">
      <q-badge color="primary"> По цене</q-badge>
      <q-range
        @change="onChangePrice"
        v-model="standard"
        :min="Math.min(...filter.dataCount.map(item=>item.cost))"
        :max="Math.max(...filter.dataCount.map(item=>item.cost))"
      />
      <b>min {{  isNaN(standard.min) ? '' : standard.min }} - max {{ standard.max }}</b>
    </div>
    <q-separator class="q-mt-md q-mb-md"/>
    <div style="width: 200px">
      <q-badge color="primary"> По площади</q-badge>
      <q-range
        @change="onChangeSquare"
        v-model="square"
        :min="Math.min(...filter.dataCount.map(item=>item.square))"
        :max="Math.max(...filter.dataCount.map(item=>item.square))"
      />
      <b>min {{ isNaN(square.min) ? '' : square.min }} - max {{ square.max }}</b>
    </div>
    <q-separator class="q-mt-md q-mb-md"/>

    <q-btn-dropdown auto-close rounded color="primary" label="Тип недвижимости" split>
      <q-list padding style="width: 250px">
        <q-item
          :key="item"
          v-for="item of ['1K','2K','3K','3E','2E','C','4E']"
          clickable
          @click="filterPlan(item)">
          <q-item-section>
            <q-item-label>{{ item }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-separator class="q-mt-md q-mb-md"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue'
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
        marginalData: FlatType[],
        setFilterData: (d: FlatType[]) => void,
      }>,
      required: true,
    },
  },
  setup(props) {
    const {setFilterData} = useFilterStore()
    const standard = ref<{ min?: number; max?: number }>({})
    const square = ref<{ min?: number; max?: number }>({})
    const planTypeList = computed(() => props.filter.dataCount.filter(item => item.plan_type))
    const filterPlan = (type: string) => {
      const newFilterData = computed(() => props.filter.dataCount.filter(item => item.plan_type === type));
      if (newFilterData.value) {
        setFilterData(newFilterData.value);
      }
    }
    const onChangeItem = (key: keyof FlatType | null) => (value: { min: number; max: number }) => {
      const arr = (!isNaN(value.min) && !isNaN(value.max)) && props.filter.dataCount.filter(item => item[key] && item[key] >= value.min && item[key] <= value.max)
      if (arr) {
        setFilterData(arr);
      }
    }
    const onChangePrice = onChangeItem('cost');
    const onChangeSquare = onChangeItem('square');

    return {setFilterData, onChangePrice, standard, onChangeSquare, square, planTypeList, filterPlan}
  }
})
</script>
