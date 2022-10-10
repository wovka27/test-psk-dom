<template>
  <div class="q-pa-md">
    <q-btn-group rounded>
      <q-btn
        v-for="(item, index) of btnItemsList"
        :key="item.text"
        @click="filter.setFilterData(item.arr)"
        rounded
        :color="item.color"
        :label="`${item.text}(${index === 0 ? item.length : item.arr.length})`"/>

      <q-btn-dropdown auto-close rounded color="primary" label="Еще" split>
        <q-list padding style="width: 250px">
          <q-item v-for="item in dropdownItemList" :key="item.text" clickable @click="filter.setFilterData(item.arr)">
            <q-item-section>
              <q-item-label>{{ item.text }}({{ item.arr.length }})</q-item-label>
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
        v-model="rangeState.price"
        :min="rangeState.price.min"
        :max="rangeState.price.max"
      />
      <b>min {{ isNaN(rangeState.price.min) ? '0' : rangeState.price.min }} - max {{ rangeState.price.max }}</b>
    </div>
    <q-separator class="q-mt-md q-mb-md"/>
    <div style="width: 200px">
      <q-badge color="primary"> По площади</q-badge>
      <q-range
        @change="onChangeSquare"
        v-model="rangeState.square"
        :min="rangeState.square.min"
        :max="rangeState.square.max"
      />
      <b>min {{ isNaN(rangeState.square.min) ? '0' : rangeState.square.min }} - max {{ rangeState.square.max }}</b>
    </div>
    <q-separator class="q-mt-md q-mb-md"/>

    <q-btn-dropdown auto-close rounded color="primary" label="Тип недвижимости" split>
      <q-list padding style="width: 250px">
        <q-item
          :key="item"
          v-for="item of planTypeItems"
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
import {computed, defineComponent, onMounted, PropType, ref} from 'vue'
import {FilterType, ItemType, MinMaxType} from 'src/types';

const planTypeItems = ['1K', '2K', '3K', '3E', '2E', 'C', '4E']

export default defineComponent({
  name: 'FilterComponent',
  props: {
    filter: {
      type: Object as PropType<FilterType>,
      required: true,
    },
  },
  setup(props) {
    const {
      installment,
      subsidy,
      renovation,
      marginal,
      refData,
      bookingData,
      freeData,
      onChangeItem,
      setFilterData
    } = ref(props.filter).value;

    const rangeState = ref<{ price: MinMaxType; square: MinMaxType }>({
      price: {min: 0, max: 0},
      square: {min: 0, max: 0}
    }).value

    const dropdownItemList = ref<ItemType[]>([
      {text: 'Рассрочка', arr: installment},
      {text: 'Субсидия', arr: subsidy},
      {text: 'Ремонт', arr: renovation},
      {text: 'Маржа', arr: marginal},
    ]);

    const btnItemsList = ref<Array<ItemType & { color: string; length?: number }>>([
      {text: 'Найдено', arr: [], color: 'secondary', length: refData.length},
      {text: 'Бронь', arr: bookingData, color: 'warning'},
      {text: 'Свободно', arr: freeData, color: 'positive'},
    ])

    const getRangeValue = () => {
      rangeState.price.max = Math.max(...refData.map(item => item.cost));
      rangeState.price.min = Math.min(...refData.map(item => item.cost));
      rangeState.square.max = Math.max(...refData.map(item => item.square));
      rangeState.square.min = Math.min(...refData.map(item => item.square));

    }
    const onChangePrice = onChangeItem('cost');
    const onChangeSquare = onChangeItem('square');

    const filterPlan = (type: string) => {
      const newFilterData = computed(() => refData.filter(item => item.plan_type === type));
      if (newFilterData.value) {
        setFilterData(newFilterData.value);
      }
    }

    onMounted(() => {
      getRangeValue();
    });

    return {onChangePrice, onChangeSquare, rangeState, planTypeItems, dropdownItemList, btnItemsList, filterPlan}
  }
})
</script>
