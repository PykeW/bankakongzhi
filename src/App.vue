<template>
  <div class="app">
    <header>
      <h1>Modbus Monitor</h1>
      <StatusIndicator />
    </header>
    
    <main>
      <AxisControl />
      <ConfigDialog />
    </main>
    
    <!-- 删除 AxisControlView 组件 -->
  </div>
</template>

<script>
import StatusIndicator from './components/StatusIndicator.vue'
import AxisControl from './components/AxisControl.vue'
import ConfigDialog from './components/ConfigDialog.vue'

export default {
  name: 'App',
  components: {
    StatusIndicator,
    AxisControl,
    ConfigDialog
  }
}
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

/* 使用 Element Plus 的断点系统改进响应式布局 */
@media (max-width: 768px) {
  main {
    grid-template-columns: 1fr;
  }
}
</style>