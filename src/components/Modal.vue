<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h2>待处理事项</h2>
          <!-- 内容和关闭按钮等 -->
          <button @click="closeModal">x</button>
        </div>
        <div class="modal-button">
            <button>处理</button>
            <button>忽略</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const displayedData = computed(() => {
      return props.data;
    });
    const closeModal = () => {
      emit("update:showModal", false); // 向父组件发出关闭弹窗事件
    };

    return {
      closeModal,
      displayedData,
    };
  },
};
</script>

<style scoped>
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
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
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
  align-items: flex-start;
  padding: 10px 0;
  margin: 10px;
  flex-direction: column;
  width: 300px;
}

.modal-header h2 {
  margin: 0;
}

.modal-title button {
  background: none !important;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.modal-button button:first-of-type {
  background-color: green;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-button button:last-child {
  background-color: red;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
