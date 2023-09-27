<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :style="squareStyle" class="square">
    <div class="name">{{ name }}</div>
    <div class="number">{{ displayNumber }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String, // 名称
    number: Number, // 数字
    backgroundColor: String, // 背景颜色
  },
  computed: {
    squareStyle() {
      return {
        width: "100%", // 宽度自适应
        //   paddingTop: '100%', // 高度自适应（1:1 比例）
        backgroundColor: this.backgroundColor,
        borderRadius: "5px", // 弧度
        textAlign: "center",
        position: "relative",
        color: "#fff", // 文字颜色，可以根据需要修改
      };
    },
    displayNumber() {
      // 根据 number 的值显示不同内容
      if (typeof this.number === "undefined") {
        return "请求中"; // 如果 number 为 undefined，显示 "请求中"
      } else {
        return this.number; // 否则显示 number 的值
      }
    },
  },
};
</script>

<style scoped>
.square {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.number {
  font-size: 20px;
  font-weight: bold;
}
</style>
