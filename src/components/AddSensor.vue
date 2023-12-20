<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>添加传感器</h2>
        <button @click="closeModal">x</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="device">设备:</label>
          <select v-model="formData.deviceId" class="custom-select">
            <option value="">请选择设备</option>
            <option v-for="item in devices" :key="item" :value="item.deviceId">
              {{ item.deviceName }}
            </option>
          </select>
        </div>
        <div class="form-field">
          <label for="channel">通道:</label>
          <select v-model="formData.channel" class="custom-select">
            <option value="">请选择通道</option>
            <option value=1>通道1
            </option>
          </select>
        </div>
        <div class="form-field">
          <label for="name">名称:</label>
          <input type="text" id="name" v-model="formData.name" required placeholder="请输入传感器名称"/>
        </div>
        <div class="form-field">
          <label for="calibration">标定系数:</label>
          <input
            type="text"
            id="calibration"
            v-model="formData.calibration"
            required
            placeholder="请输入标定系数"
          />
        </div>
        <div class="form-field">
          <label for="frequency">频率常量:</label>
          <input
            type="text"
            id="frequency"
            v-model="formData.frequency"
            required
            placeholder="请输入频率常量"
          />
        </div>
        <div class="form-field">
          <label for="range">量程:</label>
          <div class="range-inputs">
            <input
              type="number"
              id="range-min"
              v-model="formData.rangeMinValue"
              required
              placeholder="请输入量程"
            />
            <input
              type="number"
              id="range-max"
              v-model="formData.rangeMaxValue"
              required
              placeholder="请输入量程"
            />
          </div>
        </div>
        <div class="form-field">
          <label for="temperature">设置温度:</label>
          <input
            type="number"
            id="temperature"
            v-model="formData.setTemperature"
            required
            placeholder="请设置温度"
          />
        </div>
        <div class="form-field">
          <label for="formula">公式:</label>
          <input id="formula" v-model="formData.formula" required placeholder="请输入原理公式"/>
        </div>
        <div class="form-field">
          <label for="location">具体位置:</label>
          <select v-model="formData.location" class="custom-select">
            <option value="">请上传传感器位置示意图</option>
            <option value=1>位置1
            </option>
          </select>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getDevices } from "@/services/data";
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        deviceId: "",
        channel: "",
        name: "",
        calibration: "",
        frequency: "",
        rangeMaxValue: 0.0,
        rangeMinValue: 0.0,
        temperature: "",
        formula: "",
        location: "",
        devices: []
      },
    };
  },
  mounted() {
    this.fetchDevices();
  },
  methods: {
    async fetchDevices(){
      const response = await getDevices(
      );
      this.devices = response;
    },
    closeModal() {
      this.$emit("update:showModal", false);
    },
    submitForm() {
      // 处理表单提交逻辑
      console.log("Form Data:", this.formData);

      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* 样式用于显示和控制动画，您可以根据需要自定义 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s;
  overflow: hidden;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.3s;
  width: 600px;
  height: 1000px;
}

@keyframes slide-up {
  from {
    transform: translate(0, 20px);
  }
  to {
    transform: translate(0, 0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: black;
}

.modal-header h2 {
  margin: 0;
}

.modal-header button {
  /* background: none;
  border: none; */
  font-size: 20px;
  color: black;
  cursor: pointer;
}

.form-field {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-field label {
  display: block;
  font-weight: bold;
  width: 100px;
}

.form-field input,
.form-field textarea {
  /* width: 400px; */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}

.range-inputs {
  width: 100%;
}

.range-inputs input {
  /* width: 400px; */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  width: 39%;
}

button[type="submit"] {
  background: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.custom-select {
  /* 自定义样式 */
  /* width: 180px; */
  flex: 1;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: grey;
  margin-left: 10px;
}
</style>
