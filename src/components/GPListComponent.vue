<template>

  <div class="q-pl-md q-pt-md q-pr-md">
    <table>
      <tbody
        v-for="(entrance, index) of data.entrances"
        :key="entrance.id"
        @mouseleave="clearHover"
        @mouseenter="hoverTable(entrance.id)">

      <tr
        v-for="floor in entrance.floors"
        :key="floor.floor"
        :class="{'bg-gray': floor.floor === hovered.row}"
        @mouseenter="hoverRow(floor.floor)">
        <td v-if="index === 0 || index === 1">{{ floor.floor }}</td>

        <td
          v-for="(flat, idx) of floor.flats"
          :key="flat.id"
          :class="{'bg-gray': flat.number === hovered.col && hovered.table === entrance.id}"
          @click="getItem(flat.id)"
          @mouseenter="hoverCol(idx + 1)">

          <CellComponent
            :status="data.flats[flat.id].status"
            :subsidy="data.flats[flat.id].subsidy"
            :renovation="data.flats[flat.id].renovation"
            :msg="data.flats[flat.id].plan_type"
            :item-data="data.flats[flat.id]"
            :filter-item="filterData[flat.id]"/>
        </td>
      </tr>

      <p style="font-size: 12px;">{{ entrance.title }}</p>
      </tbody>
    </table>
  </div>
  <q-dialog v-model="open">
    <q-card >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ data.flats[id].type }} № {{ data.flats[id].number }} {{ data.flats[id].renovation ? 'с ремонтом' : '' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>{{ data.flats[id].square }} м&#178; | {{ data.flats[id].floor }} этаж</p>
      </q-card-section>

      <q-card-section>
        <q-img src="https://kontakt-keramika.ru/800/600/https/pbs.twimg.com/media/EUS1BreX0Ag2uI1.jpg" width="500px" height="300px" />
      </q-card-section>

      <q-card-section>
        <p class="text-h4" v-if="data.flats[id].subsidy">Субсидия</p>
        <p class="text-h4" v-if="data.flats[id].renovation">Ремонт</p>
        <p class="text-h4" v-if="data.flats[id].installment">Рассрочка</p>
      </q-card-section>

      <q-card-section class="row justify-between">
        <h3>Цена</h3>
        <h3>{{ data.flats[id].cost }} руб</h3>
      </q-card-section>
      <q-card-section class="row justify-between">
        <p class="text-subtitle1">Статус</p>
        <p class="text-subtitle1">{{ data.flats[id].status }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import CellComponent from 'components/CellComponent.vue';
import {useHoverTable, useShowDialog} from 'src/use';
import {DataType, FlatType} from 'src/types';
import {useFilterStore} from 'stores/filter-store';

export default defineComponent({
  name: 'GPListComponent',
  components: {CellComponent},
  props: {
    data: {
      type: Object as PropType<DataType>
    },
    filter: {
      type: Array as PropType<FlatType[]>,
    }
  },
  setup(props) {
    const {hovered, hoverTable, hoverCol, hoverRow, clearHover} = useHoverTable()
    const {id, open, getId} = useShowDialog()
    const {filterData} = useFilterStore();
    const getItem = (id: string) => {
      if (filterData.length !== 0 && props.data && filterData.includes(props.data.flats[id])) {
        getId(id);
      } else if (filterData.length === 0) {
        getId(id)
      }
    }
    return {hovered, hoverTable, hoverCol, hoverRow, clearHover, open, getId, id, filterData, getItem};
  }
})
</script>

<style lang="scss" scoped>
table {
  tbody {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  display: flex;
  align-items: flex-end;
  overflow-x: auto;

  td {
    text-align: center;
    padding: 3px;
  }

  .bg-gray {
    background-color: rgba(208, 39, 255, 0.88);
  }
}
</style>
