<template>
  <div class="axis-control">
    <el-row :gutter="20">
      <el-col v-for="axis in axisStore.axes" :key="axis.id" :lg="8" :md="12" :sm="24">
        <el-card class="axis-card" :class="{ disabled: !axis.enabled }">
          <div class="axis-header">
            <h3>{{ axis.name }}</h3>
            <div class="axis-controls">
              <el-button
                type="primary"
                size="small"
                :icon="axis.enabled ? 'PowerOff' : 'Open'"
                @click="axisStore.toggleAxis(axis.id)"
              >
                {{ axis.enabled ? '失能' : '使能' }}
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="Setting"
                @click="openConfig(axis.id)"
              />
            </div>
          </div>

          <div class="position-display">
            <span class="position-value">{{ axis.currentPosition.toFixed(3) }}</span>
            <span class="position-unit">{{ axis.unit }}</span>
          </div>

          <el-progress
            :percentage="getAxisPercentage(axis)"
            :status="getAxisStatus(axis)"
            :stroke-width="15"
            :show-text="false"
          />

          <div class="speed-control">
            <span class="speed-label">速度: {{ Math.abs(axis.speed) }} {{ axis.unit }}/min</span>
            <el-slider
              v-model="speedValue[axis.id]"
              :min="0"
              :max="100"
              :disabled="!axis.enabled"
              @input="updateSpeed(axis.id)"
            />
          </div>

          <div class="movement-buttons">
            <el-button-group>
              <el-button
                type="primary"
                :icon="DArrowLeft"
                :disabled="!axis.enabled || axis.negativeLimit"
                @mousedown="startMove(axis.id, 'negative')"
                @mouseup="stopMove(axis.id)"
                @mouseleave="stopMove(axis.id)"
              />
              <el-button
                type="warning"
                :disabled="!axis.enabled"
                @click="stopMove(axis.id)"
              >
                停止
              </el-button>
              <el-button
                type="primary"
                :icon="DArrowRight"
                :disabled="!axis.enabled || axis.positiveLimit"
                @mousedown="startMove(axis.id, 'positive')"
                @mouseup="stopMove(axis.id)"
                @mouseleave="stopMove(axis.id)"
              />
            </el-button-group>
          </div>

          <div class="limit-indicators">
            <el-tag
              size="small"
              :type="axis.negativeLimit ? 'danger' : 'info'"
              effect="dark"
            >
              负限位
            </el-tag>
            <el-tag
              size="small"
              :type="axis.error ? 'danger' : 'success'"
              effect="dark"
            >
              {{ axis.error ? '错误' : '正常' }}
            </el-tag>
            <el-tag
              size="small"
              :type="axis.positiveLimit ? 'danger' : 'info'"
              effect="dark"
            >
              正限位
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <config-dialog
      v-model="configVisible"
      :axis-id="selectedAxisId"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useAxisStore } from '../stores/axis'
import ConfigDialog from './ConfigDialog.vue'

const axisStore = useAxisStore()
const configVisible = ref(false)
const selectedAxisId = ref(null)
const speedValue = ref({})

axisStore.axes.forEach(axis => {
  speedValue.value[axis.id] = 0
})

const getAxisPercentage = (axis) => {
  const range = axis.softLimitPos - axis.softLimitNeg
  return ((axis.currentPosition - axis.softLimitNeg) / range) * 100
}

const getAxisStatus = (axis) => {
  if (axis.error) return 'exception'
  if (!axis.enabled) return 'info'
  if (axis.positiveLimit || axis.negativeLimit) return 'warning'
  return 'success'
}

const updateSpeed = (axisId) => {
  const axis = axisStore.axes.find(a => a.id === axisId)
  if (!axis) return
  axis.maxSpeed = (speedValue.value[axisId] / 100) * axis.maxSpeed
}

const startMove = (axisId, direction) => {
  const axis = axisStore.axes.find(a => a.id === axisId)
  if (!axis || !axis.enabled) return

  axisStore.moveAxis({
    axisId,
    direction,
    speed: axis.maxSpeed * (speedValue.value[axisId] / 100)
  })
}

const stopMove = (axisId) => {
  axisStore.stopAxis(axisId)
}

const openConfig = (axisId) => {
  selectedAxisId.value = axisId
  configVisible.value = true
}
</script>

<style scoped>
.axis-control {
  padding: 20px;
}

.axis-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.axis-card.disabled {
  opacity: 0.7;
}

.axis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.axis-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.axis-controls {
  display: flex;
  gap: 8px;
}

.position-display {
  text-align: center;
  margin-bottom: 15px;
}

.position-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.position-unit {
  margin-left: 5px;
  font-size: 14px;
  color: #909399;
}

.speed-control {
  margin: 20px 0;
}

.speed-label {
  display: block;
  margin-bottom: 10px;
  color: #606266;
}

.movement-buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.limit-indicators {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

:deep(.el-slider__runway) {
  margin: 16px 0;
}

:deep(.el-progress-bar__outer) {
  border-radius: 4px;
}

:deep(.el-card__body) {
  padding: 20px;
}
</style>