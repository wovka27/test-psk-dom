<template>
  <div class="q-pa-md">
    <q-btn-group rounded>
      <q-btn rounded color="secondary" :label="`Найдено(${dataCount})`" />

      <q-btn rounded color="warning" :label="`Бронь(${bookingDataCount})`" />
      <q-btn rounded color="positive" :label="`Свободно(${freeDataCount})`" />

      <q-btn-dropdown auto-close rounded color="negative" :label="`Занято(${issuedDataCount})`" split>
        <q-list padding style="width: 250px">
          <q-item clickable>
            <q-item-section>
              <q-item-label>Рассрочка</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-btn-group>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {DataType} from 'src/types';
import {useFilter} from 'src/use/filter';
export default defineComponent({
  name: 'FilterComponent',
  props: {
    data: {
      type: Object as PropType<DataType>,
      required: true,
    }
  },
  setup(props) {
    const {dataCount, bookingDataCount, issuedDataCount, subsidyCount, installmentCount, renovationCount, freeDataCount} = useFilter(props.data)
    return {dataCount, bookingDataCount, issuedDataCount, subsidyCount, installmentCount, renovationCount, freeDataCount};
  }
})
</script>
