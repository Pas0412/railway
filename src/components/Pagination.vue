<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage">下一页</button>
    </div>
  </template>
  
  <script>
    
  export default {
    props: {
      currentPage: Number,
    //   totalPages: Number,
    },
    setup(props, { emit }) {
      const previousPage = () => {
        if (props.currentPage > 1) {
          emit('previousPage');
        }
      };
      //<button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      const nextPage = () => {
        // if (props.currentPage < props.totalPages) {
          emit('nextPage');
        // }
      };
  
      return {
        previousPage,
        nextPage,
      };
    },
  };
  </script>
  