<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pagination">
    <span class="total-items">共 {{ totalItems }} 条</span>
    <input
      type="number"
      class="items-per-page"
      v-model="localItemsPerPage"
      @input="updateItemsPerPage"
    />条&frasl;页
    <button
      class="button previous-page"
      @click="$emit('previousPage')"
      :disabled="currentPage === 1"
    >
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
    <button class="button" @click="goToPage(maxPage)" v-if="currentPage != maxPage">{{ maxPage }}</button>
    <button
      class="button next-page"
      @click="$emit('nextPage')"
      :disabled="currentPage === maxPage"
    >
      &gt;
    </button>前往
    <input class="go-to-page" type="number" v-model="goToPageInput" @input="updateGoToPageInput" />页
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
      goToPageInput: this.currentPage,
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
      this.$emit("itemsPerPage", this.localItemsPerPage);
    },
    goToPage(page) {
      this.$emit("goToPage", page);
    },
    updateGoToPageInput() {
      // Handle input validation and update here
      this.$emit("goToPageInput", this.goToPageInput);
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
      }else {
        this.showEllipsis = false;
      }
    },
  },
};
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  margin: 10px;
  text-align: center;
  align-items: center;
}

.total-items {
  margin-right: 20px;
}

.items-per-page {
  width: 20px;
  margin-right: 5px;
}

.active {
  background-color: lightgray;
}

.button {
  background-color: #f2f2f2;
}

.previous-page {
  margin-left: 20px !important;
}

.next-page {
  margin-right: 40px !important;
}

.go-to-page {
  width: 50px;
  margin: 0 5px;
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
