<template>
  <div class="cell"
       :class="{
          'success': itemData.status === 'Свободна',
          'empty': !Boolean(itemData.plan_type),
          'booking': itemData.status === 'Бронь',
          'issued': itemData.status === 'Выданы ключи',
          'installment': itemData.status === 'Рассрочка',
          'filter': !filterData.includes(itemData),
       }">
    <b>{{ itemData.plan_type }}</b>
    <i v-if="itemData.subsidy" :class="{'subsidy': itemData.subsidy}"></i>
    <i v-if="itemData.renovation" :class="{'renovation': itemData.renovation}"></i>
    <q-tooltip delay="500">
      <div class="row justify-between bi-align-center">
        <b class="text-subtitle2">{{ itemData.plan_type }} - {{ itemData.type }}</b>
        <b class="text-subtitle2 q-ml-lg">№{{ itemData.number }} {{ itemData.renovation ? 'с ремонтом' : '' }}</b>
      </div>
      <div v-if="itemData.status !== 'Выданы ключи' && itemData.status !== 'Договор'">
        <h4>{{ itemData.cost }} ₽</h4>
      </div>
      <div v-else class="q-mt-xl"></div>
      <div>
        <p v-if="itemData.subsidy">Субсидия</p>
        <p v-if="itemData.renovation">Ремонт</p>
        <p v-if="itemData.installment">Рассрочка</p>

      </div>
      <div class="row justify-between">
        <p class="text-subtitle1">{{ itemData.square }} m&#178;</p>
        <p class="text-subtitle1">{{ itemData.floor }} этаж</p>
      </div>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlatType} from 'src/types';
import {useFilterStore} from 'stores/filter-store';

export default defineComponent({
  name: 'CellComponent',
  props: {
    itemData: {
      type: Object as PropType<FlatType>,
    },
    filterItem: {
      type: Object as PropType<FlatType | undefined>
    },
  },
  setup() {
    const {filterData} = useFilterStore();
    return {filterData}
  }
});
</script>

<style lang="scss" scoped>
.cell {
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 0 5px;
  border-radius: 2px;
  background-color: rgba(68, 67, 67, 0.51);

  &.filter {
    background-color: white;
    & > b {
      font-size: 0;
    }
    & > i {
      display: none;
    }
    &.booking, &.success, &.issued, &.busy {
      opacity: 0;
    }
  }

  &.empty {
    width: 15px;
    height: 15px;
  }

  & > b {
    font-size: 12px;
    color: aliceblue;
  }

  & > i {
    position: absolute;
    display: block;
    bottom: -25%;
    right: -25%;
    width: 8px;
    transform: translate(-50%, -50%);
    height: 8px;
    border-radius: 50%;

    &:nth-child(1) {
      bottom: -5%;
    }

    &.subsidy {
      background-color: #3eb702;
    }

    &.renovation {
      background-color: #ffa700;
    }

    &.installment {
      background-color: #ff00c3;
    }
  }

  &.booking {
    background-color: #ffa700;
  }

  &.success {
    background-color: #3eb702;
  }

  &.issued {
    background-color: rgba(159, 159, 159, 0.99);
  }

  &.busy {
    background-color: #5d5d5d;
  }
}
</style>
