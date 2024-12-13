<script setup>
import { ref, onMounted } from 'vue'
import AxisController from '@/components/AxisController.vue'

const axisData = ref({
  name: 'X轴',
  speed: 50,
  maxSpeed: 100,
  unit: 'mm',
  enabled: true,
  currentPosition: 0,
  id: 1
})

// 如果数据是从API获取的
onMounted(async () => {
  // 可以在这里加载数据
  // const response = await fetchAxisData()
  // axisData.value = response.data
})
</script>

<template>
  <div>
    <axis-controller
      v-if="axisData"
      :axis="axisData"
    />
  </div>
</template>
