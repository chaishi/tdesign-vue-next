<template>
  <div :id="`${path}#multiple`" class="anchor-demo">
    <t-anchor :bounds="100" :target-offset="200">
      <t-anchor-item :href="`#${path}#default`" title="定义" />
      <t-anchor-item :href="`#${path}#multiple`" title="服务功能" />
      <t-anchor-item :href="`#${path}#small`" title="使用指南">
        <t-anchor-item :href="`#${path}#large`" title="创建签名" />
        <t-anchor-item :href="`#${path}#container`" title="创建内容" />
      </t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-6`" title="保密协议" />
      <t-anchor-item :href="`#${path}#anchor-target-7`" title="其他" />
    </t-anchor>
  </div>
</template>
<script setup>
import { computed, getCurrentInstance } from 'vue';
import get from 'lodash/get';

const { ctx } = getCurrentInstance();
const path = computed(() => get(ctx, '$route.path', ''));
</script>
