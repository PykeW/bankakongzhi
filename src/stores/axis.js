import { defineStore } from 'pinia'

export const useAxisStore = defineStore('axis', {
  state: () => ({
    axes: [
      {
        id: 1,
        name: 'X轴',
        enabled: true,
        error: false,
        currentPosition: 0,
        speed: 0,
        maxSpeed: 1000,
        acceleration: 100,
        softLimitPos: 1000,
        softLimitNeg: -1000,
        positiveLimit: false,
        negativeLimit: false,
        unit: 'mm'
      },
      {
        id: 2,
        name: 'Y轴',
        enabled: true,
        error: false,
        currentPosition: 0,
        speed: 0,
        maxSpeed: 800,
        acceleration: 80,
        softLimitPos: 800,
        softLimitNeg: -800,
        positiveLimit: false,
        negativeLimit: false,
        unit: 'mm'
      },
      {
        id: 3,
        name: 'Z轴',
        enabled: true,
        error: false,
        currentPosition: 0,
        speed: 0,
        maxSpeed: 500,
        acceleration: 50,
        softLimitPos: 500,
        softLimitNeg: -500,
        positiveLimit: false,
        negativeLimit: false,
        unit: 'mm'
      }
    ],
    simIntervals: {} // 存储模拟运动的定时器
  }),

  actions: {
    moveAxis({ axisId, direction, speed }) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis || !axis.enabled) return

      // 清除之前的模拟定时器
      if (this.simIntervals[axisId]) {
        clearInterval(this.simIntervals[axisId])
      }

      // 设置速度
      axis.speed = direction === 'positive' ? speed : -speed

      // 模拟运动：每100ms更新一次位置
      this.simIntervals[axisId] = setInterval(() => {
        // 计算位置变化
        const positionDelta = (axis.speed / 10) // 速度转换为每100ms的位移
        const newPosition = axis.currentPosition + positionDelta

        // 检查软限位
        if (newPosition > axis.softLimitPos) {
          axis.currentPosition = axis.softLimitPos
          axis.positiveLimit = true
          this.stopAxis(axisId)
          return
        }
        if (newPosition < axis.softLimitNeg) {
          axis.currentPosition = axis.softLimitNeg
          axis.negativeLimit = true
          this.stopAxis(axisId)
          return
        }

        // 更新位置
        axis.currentPosition = newPosition
        axis.positiveLimit = false
        axis.negativeLimit = false

        // 随机生成错误（小概率）
        if (Math.random() < 0.001) {
          axis.error = true
          this.stopAxis(axisId)
        }
      }, 100)
    },

    stopAxis(axisId) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      // 清除模拟定时器
      if (this.simIntervals[axisId]) {
        clearInterval(this.simIntervals[axisId])
        delete this.simIntervals[axisId]
      }

      // 停止运动
      axis.speed = 0
    },

    updateAxisConfig({ axisId, config }) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      // 更新配置
      Object.assign(axis, {
        maxSpeed: config.maxSpeed,
        acceleration: config.acceleration,
        softLimitPos: config.softLimitPos,
        softLimitNeg: config.softLimitNeg
      })
    },

    // 新增：重置轴错误
    resetError(axisId) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      axis.error = false
      axis.enabled = true
    },

    // 新增：使能/失能轴
    toggleAxis(axisId) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      axis.enabled = !axis.enabled
      if (!axis.enabled) {
        this.stopAxis(axisId)
      }
    },

    // 新增：返回原点（模拟）
    homeAxis(axisId) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis || !axis.enabled) return

      // 模拟返回原点过程
      axis.speed = -axis.maxSpeed * 0.5
      
      const homeInterval = setInterval(() => {
        if (Math.abs(axis.currentPosition) < 1) {
          clearInterval(homeInterval)
          axis.currentPosition = 0
          axis.speed = 0
        } else {
          axis.currentPosition += axis.currentPosition > 0 ? -1 : 1
        }
      }, 50)
    }
  }
})