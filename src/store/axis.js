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
    ]
  }),

  actions: {
    // eslint-disable-next-line no-unused-vars
    moveAxis({ axisId, direction, speed }) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis || !axis.enabled) return

      axis.speed = direction === 'positive' ? speed : -speed
      console.log(`Moving axis ${axisId} ${direction} at speed ${speed}`)
    },

    // eslint-disable-next-line no-unused-vars
    stopAxis(axisId) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      axis.speed = 0
      console.log(`Stopping axis ${axisId}`)
    },

    // eslint-disable-next-line no-unused-vars
    updateAxisConfig({ axisId, config }) {
      const axis = this.axes.find(a => a.id === axisId)
      if (!axis) return

      Object.assign(axis, {
        maxSpeed: config.maxSpeed,
        acceleration: config.acceleration,
        softLimitPos: config.softLimitPos,
        softLimitNeg: config.softLimitNeg
      })
      
      console.log(`Updated config for axis ${axisId}:`, config)
    }
  }
})