<template>
  <div class="tdesign-demo-block-row">
    <t-cascader v-model="value1" :options="options" multiple value-mode="onlyLeaf" />
    <t-cascader v-model="value2" :options="options" multiple value-mode="parentFirst" />
    <t-cascader v-model="value3" :options="options" multiple value-mode="all" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '子选项三',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];

const value1 = ref([]);
const value2 = ref([]);
const value3 = ref([]);
</script>
