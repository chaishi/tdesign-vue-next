<template>
  <div class="demo-container">
    <button @click="toggleHeight('low')">lower height</button>
    <button @click="toggleHeight('high')">higher height</button>
    <div class="item">
      <t-table
        row-key="id"
        :columns="columns"
        :data="data"
        :height="dynamicHeight"
        :bordered="true"
        :resizable="true"
        :stripe="true"
        :hover="true"
        :is-fixed-row-height="true"
        :scroll="{ type: 'virtual', rowHeight: 30, bufferSize: 10 }"
      >
      </t-table>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, nextTick } from 'vue';

const columns = [
  {
    colKey: 'id',
    title: 'id',
  },
  {
    colKey: 'instance',
    title: '集群名称',
  },
  {
    colKey: 'survivalTime',
    title: '存活时间(s)',
  },
  { colKey: 'owner', title: '管理员' },
];

// 本地数据排序，表示组件内部会对参数 data 进行数据排序。如果 data 数据为 10 条，就仅对这 10 条数据进行排序。
const initData = [
  {
    id: 1,
    instance: '当前行高度1',
    status: 0,
    owner: 'jenny;peter',
    survivalTime: 1000,
  },
  {
    id: 2,
    instance: '当前行高度1',
    status: 1,
    owner: 'jenny',
    survivalTime: 1000,
  },
  {
    id: 3,
    instance: 'JQTest',
    status: 2,
    owner: 'jenny',
    survivalTime: 500,
  },
  {
    id: 4,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 5,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 6,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },

  {
    id: 7,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 8,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 9,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
  {
    id: 10,
    instance: 'JQTest',
    status: 1,
    owner: 'peter',
    survivalTime: 1500,
  },
];
// 为了使得表格滚动更加平稳，建议指定row-height参数值为接近表格的平均行高
const times = Array.from(new Array(1000), () => ''); // 测试共计1k条数据
const testData = [];
times.forEach((item, i) => {
  const k = i % 10;
  testData[i] = { ...initData[k], id: i + 1 };
});

const toggleHeight = (t) => {
  nextTick(() => {
    dynamicHeight.value = t === 'low' ? `calc(100vh - 500px)` : `calc(100vh - 100px)`;
  });
};

const data = ref([...testData]);
const sort = ref({});
const dynamicHeight = ref(`calc(100vh - 500px)`);
</script>
