<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>表单</h2>
        <button @click="closeModal">x</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="device">设备:</label>
          <input type="text" id="device" v-model="formData.deviceId" required />
        </div>
        <div class="form-field">
          <label for="channel">通道:</label>
          <input type="text" id="channel" v-model="formData.channel" required />
        </div>
        <div class="form-field">
          <label for="name">名称:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-field">
          <label for="calibration">标定系数:</label>
          <input
            type="text"
            id="calibration"
            v-model="formData.calibration"
            required
          />
        </div>
        <div class="form-field">
          <label for="frequency">频率常量:</label>
          <input
            type="text"
            id="frequency"
            v-model="formData.frequency"
            required
          />
        </div>
        <div class="form-field">
          <label for="range">量程:</label>
          <div class="range-inputs">
            <input
              type="number"
              id="range-min"
              v-model="formData.range.min"
              required
            />
            <input
              type="number"
              id="range-max"
              v-model="formData.range.max"
              required
            />
          </div>
        </div>
        <div class="form-field">
          <label for="temperature">设置温度:</label>
          <input
            type="number"
            id="temperature"
            v-model="formData.temperature"
            required
          />
        </div>
        <div class="form-field">
          <label for="formula">公式:</label>
          <textarea id="formula" v-model="formData.formula" required></textarea>
        </div>
        <div class="form-field">
          <label for="location">具体位置:</label>
          <input
            type="text"
            id="location"
            v-model="formData.location"
            required
          />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
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
      },
    };
  },
  methods: {
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
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.3s;
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
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
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

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  font-weight: bold;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
