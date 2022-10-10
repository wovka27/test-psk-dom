import {ref} from 'vue';

export const useShowDialog = () => {
  const open = ref<boolean>(false);
  const id = ref<string>('');
  const getId = (index: string) => {
    open.value = true;
    id.value = index;
  };

  return {open, id, getId};
};
