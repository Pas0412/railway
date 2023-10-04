<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <h1>Devices</h1>
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
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { getDevices } from "@/services/devices";
export default {
  // 在此添加组件逻辑
  components: {
    TableComponent,
    Pagination,
  },
  setup() {
    const tableData = ref([]);

    const tableHeaders = ref([
      "ID",
      "SN编码",
      "名称",
      "设备类型",
      "电池电量",
      "设备信号",
      "传感器状态",
      "状态",
      "创建时间",
      "操作",
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const searchTerm = ref("");

    // const filteredData = computed(() => {
    //   return tableData.value.filter((device) =>
    //     device.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    //   );
    // });

    // const totalPages = computed(() =>
    //   Math.ceil(tableData.value.length / itemsPerPage.value)
    // );

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      // if (currentPage.value < totalPages.value) {
        currentPage.value++;
      // }
    };

    const fetchDeviceData = async () => {
      const response = await getDevices(searchTerm.value, currentPage.value, itemsPerPage.value);
      tableData.value = response.records;
      console.log(response.records);
    }

    onMounted(() => {
      fetchDeviceData();
    });

    return {
      tableData,
      itemsPerPage,
      currentPage,
      // totalPages,
      searchTerm,
      // filteredData,
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
