<template>
  <div>
    <t-button theme="primary" @click="showDialog"> plugin打开多个dialog </t-button>
  </div>
</template>

<script setup>
import { DialogPlugin } from 'tdesign-vue-next';

import { ref } from 'vue';

const count = ref(0);
const showDialog = () => {
  count.value += 1;
  const confirmDia = DialogPlugin.confirm({
    header: 'use ESC to close each dialog',
    body: `current dialog count: ${count.value}`,
    confirmBtn: 'more dialog',
    cancelBtn: 'cancel',
    onConfirm: ({ e }) => {
      console.log(e);
      showDialog();
    },
    onClose: ({ e, trigger }) => {
      console.log('e: ', e);
      console.log('trigger: ', trigger);
      count.value -= 1;
      confirmDia.hide();
    },
  });
};
</script>
