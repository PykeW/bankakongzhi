<template>
    <div class="status-indicator" :class="status">
      {{ label }}
    </div>
  </template>
  
  <script setup>
  defineProps({
    status: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  })
  </script>