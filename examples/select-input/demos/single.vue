<template>
  <div>
    <!-- :popup-props="{ trigger: 'hover' }" -->
    <t-select-input
      :value="selectValue"
      :popup-visible="popupVisible"
      style="width: 300px"
      placeholder="Please Select"
      clearable
      allow-input
      @popup-visible-change="onPopupVisibleChange"
      @clear="onClear"
      @input-change="onInputChange"
    >
      <template #panel>
        <ul class="tdesign-demo__select-input-ul-single">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            {{ item.label }}
          </li>
        </ul>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const options = [
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];

// const selectValue = ref('tdesign-vue');
const selectValue = ref({ label: 'tdesign-vue', value: 1 });
// const selectValue = ref([{ label: 'tdesign-vue', value: 1 }]);
const popupVisible = ref(false);
const onOptionClick = (item) => {
  selectValue.value = item;
  // 选中后立即关闭浮层
  popupVisible.value = false;
};
const onClear = () => {
  selectValue.value = undefined;
};
const onPopupVisibleChange = (val, context) => {
  console.log(context);
  popupVisible.value = val;
};
const onInputChange = (val, context) => {
  // 过滤功能
  console.log(val, context);
};
</script>
<style lang="less" scoped>
.tdesign-demo__select-input-ul-single {
  padding: 4px 0;
}
.tdesign-demo__select-input-ul-single > li {
  display: block;
  border-radius: 3px;
  height: 40px;
  line-height: 22px;
  cursor: pointer;
  padding: 9px 8px;
  color: var(--td-text-color-primary);
  transition: background-color 0.2s cubic-bezier(0.38, 0, 0.24, 1);
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdesign-demo__select-input-ul-single > li:hover {
  background-color: var(--td-bg-color-container-hover);
}
</style>
