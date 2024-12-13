<template>
    <div class="axis-control-view">
      <h1>轴控制页面</h1>
      <div class="axis-container">
        <axis-controller
          v-for="axis in axes"
          :key="axis.id"
          :axis="axis"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useAxisStore } from '@/store/axis'
  import AxisController from '@/components/AxisController.vue'
  
  const store = useAxisStore()
  const axes = computed(() => store.axes)
  </script>
  
  <style lang="scss" scoped>
  .axis-control-view {
    padding: 20px;
  
    h1 {
      margin-bottom: 20px;
    }
  
    .axis-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
  </style>