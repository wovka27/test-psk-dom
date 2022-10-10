import { ref } from 'vue';

type HoveredType = { col: number; row: number; table: string };

export const useHoverTable = () => {
  const hovered = ref<HoveredType>({ table: '', col: -1, row: -1 });

  const hoverCol = (index: number) => {
    hovered.value.col = index;
  };
  const hoverRow = (index: number) => {
    hovered.value.row = index;
  };
  const hoverTable = (index: string) => {
    hovered.value.table = index;
  };
  const clearHover = () => {
    hovered.value.table = '';
    hovered.value.col = -1;
    hovered.value.row = -1;
  };

  return { hovered, hoverCol, hoverRow, hoverTable, clearHover };
};
