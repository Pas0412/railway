<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <!-- 在此添加设置页面内容 -->
    <input v-model="searchTerm" type="text" placeholder="搜索设备" />
    <TableComponent
      :data="tableData"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :tableHeaders="tableHeaders"
    />
    <Pagination
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalItems="totalItems"
      :maxPage="maxPage"
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { getWarnings } from "@/services/warnings";
export default {
  // 在此添加组件逻辑
  components: {
    TableComponent,
    Pagination,
  },
  setup() {
    const tableData = ref([]);

    const tableHeaders = ref([
      "序号",
      "预警名称",
      "预警项",
      "预警阈值",
      "预警等级",
      "是否解除",
      "创建时间",
      "操作",
      "备注"
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const deviceId = ref("");
    const endTime = ref("");
    const configName = ref("");
    const startTime = ref("");
    const totalItems = ref(0);
    const maxPage = ref(1);

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const fetchWarnings = async () => {
      const response = await getWarnings(
        configName.value,
        deviceId.value,
        endTime.value,
        currentPage.value,
        itemsPerPage.value,
        startTime.value
      );
      const wData = [];
      totalItems.value = response.total;
      maxPage.value = response.pages;
      response.records.forEach((item) => {
        wData.push({
          WarmId: item.WarmId,
          configName: item.configName,
          configType: item.configType,
          configTerm: item.configTerm,
          warmLevel: item.warmLevel,
          warmState: item.warmState,
          warm_time: item.warm_time,
          operation: "通知/解除",
          note: ' ',
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (wData.length < itemsPerPage.value) {
        wData.push({
          WarmId: ' ',
          configName: ' ',
          configType: ' ',
          configTerm: ' ',
          warmLevel: ' ',
          warmState: ' ',
          warm_time: ' ',
          operation: ' ',
          note: ' ',
        });
      }

      tableData.value = wData;
    };

    onMounted(() => {
      fetchWarnings();
    });

    return {
      tableData,
      totalItems,
      maxPage,
      itemsPerPage,
      currentPage,
      deviceId,
      endTime,
      configName,
      startTime,
      tableHeaders,
      previousPage,
      nextPage,
    };
  },
};
</script>

<style>
.settings {
  margin: 10px;
  width: 100%;
  color: black;
  background-color: white;
}
</style>
