<template>
    <el-dialog
      v-model="dialogVisible"
      :title="`配置${axis?.name || '轴'}`"
      width="500px"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="最大速度">
          <el-input-number v-model="form.maxSpeed" :min="0" :max="2000" />
          <span class="unit">mm/s</span>
        </el-form-item>
        <el-form-item label="加速度">
          <el-input-number v-model="form.acceleration" :min="0" :max="1000" />
          <span class="unit">mm/s²</span>
        </el-form-item>
        <el-form-item label="正向软限位">
          <el-input-number v-model="form.softLimitPos" :min="0" :max="2000" />
          <span class="unit">mm</span>
        </el-form-item>
        <el-form-item label="负向软限位">
          <el-input-number v-model="form.softLimitNeg" :min="-2000" :max="0" />
          <span class="unit">mm</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  import { useAxisStore } from '../stores/axis'
  
  const props = defineProps({
    modelValue: Boolean,
    axisId: Number
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const axisStore = useAxisStore()
  const dialogVisible = ref(false)
  
  // 初始化表单数据
  const form = ref({
    maxSpeed: 0,
    acceleration: 0,
    softLimitPos: 0,
    softLimitNeg: 0
  })
  
  // 计算当前轴
  const axis = computed(() => {
    return axisStore.axes.find(a => a.id === props.axisId)
  })
  
  // 监听对话框显示状态
  watch(() => props.modelValue, (newVal) => {
    dialogVisible.value = newVal
    if (newVal && axis.value) {
      // 当对话框打开时，初始化表单数据
      form.value = {
        maxSpeed: axis.value.maxSpeed,
        acceleration: axis.value.acceleration,
        softLimitPos: axis.value.softLimitPos,
        softLimitNeg: axis.value.softLimitNeg
      }
    }
  })
  
  // 监听对话框内部状态
  watch(() => dialogVisible.value, (newVal) => {
    emit('update:modelValue', newVal)
  })
  
  // 确认按钮处理
  const handleConfirm = () => {
    if (!axis.value) return
  
    axisStore.updateAxisConfig({
      axisId: props.axisId,
      config: { ...form.value }
    })
    
    dialogVisible.value = false
  }
  </script>
  
  <style scoped>
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .unit {
    margin-left: 8px;
    color: #666;
  }
  </style>