<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h2>设备详情</h2>
          <!-- 内容和关闭按钮等 -->
          <button @click="closeModal">x</button>
        </div>
        <div class="modal-content">
        <!-- 第一块数据 -->
        <div class="section">
          <h3>设备状态</h3>
          <div class="section-content">
            <div class="row">
              <div class="column">
                设备名称: {{ displayedData.deviceName }}
              </div>
              <div class="column">
                设备编号: {{ displayedData.deviceCode }}
              </div>
              <div class="column">
                创建时间: {{ displayedData.sysAddTime }}
              </div>
            </div>
            <!-- 添加更多行和列根据实际需要 -->
          </div>
        </div>

        <!-- 第二块数据 -->
        <div class="section">
          <h3>设备信息</h3>
          <div class="section-content">
            <div class="row">
              <div class="column">
                设备信号: {{ displayedData.deviceSignal }}
              </div>
              <div class="column">
                振弦通道数量: {{ displayedData.channelNum }}
              </div>
              <div class="column">
                周期: {{ displayedData.collectCycle }}
              </div>
            </div>
            <div class="row">
              <div class="column">
                协议: {{ displayedData.channelProtocol }}
              </div>
              <div class="column">
                在线时长: {{ displayedData.onlineTime }}
              </div>
              <div class="column">
                电池电量: {{ displayedData.batteryLevel }}
              </div>
            </div>
            <div class="row">
              <div class="column">
                电池电压: {{ displayedData.batteryVoltage }}
              </div>
              <div class="column">
                直流电压: {{ displayedData.dcVoltage }}
              </div>
              <div class="column">
                传感器供电电压: {{ displayedData.supplyVoltage }}
              </div>
            </div>
            <div class="row">
              <div class="column">
                系统电压: {{ displayedData.systemVoltage }}
              </div>
              <div class="column">
                设备自动定位: {{ displayedData.locationOff }}
              </div>
              <div class="column">
                iccid: {{ displayedData.iccid }}
              </div>
            </div>
            <div class="row">
              <div class="column">
                imei: {{ displayedData.imei }}
              </div>
              <div class="column">
                调试模式: {{ displayedData.debugOff }}
              </div>
              <div class="column">
                备注: {{ displayedData.sysRemarks }}
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <h3>板载振弦传感器</h3>
          <div class="section-content">
            <div class="row">
              <div class="column">
                异常数量: 0
              </div>
              <div class="column">
                周期: 1
              </div>
            </div>
            <!-- 添加更多行和列根据实际需要 -->
          </div>
        </div>
        <div class="section">
          <h3>485传感器</h3>
          <div class="section-content">
            <div class="row">
              <div class="column">
                异常数量: 0
              </div>
              <div class="column">
                周期: 1
              </div>
            </div>
            <!-- 添加更多行和列根据实际需要 -->
          </div>
        </div>
        <!-- 添加更多块数据根据实际需要 -->
        <div class="device-map">
          <AmapMap :center="[displayedData.deviceLon, displayedData.deviceLat]" :zoom=10 />
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import AmapMap from '@/components/AmapMap.vue';
export default {
  components: {
    AmapMap
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const displayedData = computed(() => {
      return props.data;
    });
    const closeModal = () => {
      emit('update:showModal', false); // 向父组件发出关闭弹窗事件
    };
    return {
      closeModal,
      displayedData
    };
  },
};
</script>

<style>
/* 样式用于显示和控制动画，你可以自定义 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s;
  z-index: 1000;
}

.modal-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.modal-title button {
  color: black;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.3s;
  display: flex;
  flex-direction: column;
}

@keyframes slide-up {
  from {
    transform: translate(0, 20px);
  }
  to {
    transform: translate(0, 0);
  }
}

/* .device-details-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;
  max-width: 600px;
  width: 100%;
  max-height: 80%;
  overflow-y: auto;
} */

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
  flex-direction: column;
}

.modal-header h2 {
  margin: 0;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.section {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 600px;
}

.section h3 {
  font-size: 16px;
  margin: 0 0 10px;
}

.section-content {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
  font-size: 12px;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  justify-content: space-between;
}

.column {
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
}

.device-map {
  height: 300px;
  width: 100%;
}
</style>
