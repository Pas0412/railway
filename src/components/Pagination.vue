<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pagination">
    <span>共 {{ totalItems }} 条</span>
    <input
      type="number"
      v-model="localItemsPerPage"
      @input="updateItemsPerPage"
    />
    <button class="button" @click="$emit('previousPage')" :disabled="currentPage === 1">
      &lt;
    </button>
    <template v-for="page in visiblePages" :key="page">
      <button
        @click="goToPage(page)"
        :class="{ active: currentPage === page, button: currentPage !== page }"
      >
        {{ page }}
      </button>
    </template>
    <span v-if="showEllipsis">...</span>
    <button class="button" @click="goToPage(maxPage)">{{ maxPage }}</button>
    <button
      class="button"
      @click="$emit('nextPage')"
      :disabled="currentPage === maxPage"
    >
      &gt;
    </button>
    <input type="number" v-model="goToPageInput" @input="updateGoToPageInput" />
    <button
      class="button"
      @click="goToPage(goToPageInput)"
      :disabled="goToPageInput < 1 || goToPageInput > maxPage"
    >
      跳转
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalItems: Number,
    itemsPerPage: Number,
    maxPage: Number,
  },
  data() {
    return {
      visiblePages: [],
      showEllipsis: false,
      goToPageInput: "",
      localItemsPerPage: this.itemsPerPage,
    };
  },
  watch: {
    currentPage: "updateVisiblePages",
    maxPage: "updateVisiblePages",
  },
  methods: {
    updateItemsPerPage() {
      // Handle itemsPerPage change here
    },
    goToPage(page) {
      this.$emit("goToPage", page);
    },
    updateGoToPageInput() {
      // Handle input validation and update here
    },
    updateVisiblePages() {
      // Calculate visiblePages and showEllipsis based on currentPage and maxPage
      // You can implement this logic here
      const maxVisiblePages = 3; // 控制显示的最大页码按钮数量
      const visiblePages = [];
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(this.maxPage, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let page = startPage; page <= endPage; page++) {
        visiblePages.push(page);
      }

      this.visiblePages = visiblePages;
      if (this.currentPage < this.maxPage - 1) {
        this.showEllipsis = true;
      }
    },
  },
};
</script>
<style scoped>
.active {
  background-color: lightgray;
}

.button{
  background-color: #f2f2f2;
}

.button,
.active {
  width: 25px;
  height: 25px;
  color: black;
  text-align: center;
  margin: 5px;
  padding: 0;
  font-size: 10px;
}
</style>
