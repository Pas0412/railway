<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="settings">
    <h1>Auth</h1>
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
import { userList } from "@/services/user";
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
      "名称",
      "性别",
      "职务",
      "单位部门",
      "电话",
      "邮箱",
      "账号",
      "权限",
      "备注"
    ]);

    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const department = ref("");
    const job = ref("");
    const role = ref("");
    const userName = ref("");

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      currentPage.value++;
    };

    const fetchUserList = async () => {
      const response = await userList(
        department.value,
        job.value,
        currentPage.value,
        itemsPerPage.value,
        role.value,
        userName.value
      );
      const uData = [];
      response.records.forEach((item) => {
        uData.push({
          userId: item.userId,
          userName: item.userName,
          userSex: item.userSex,
          job: item.job,
          department: item.department,
          phone: item.phone,
          email: item.email,
          loginAccount: item.loginAccount,
          role: item.role,
          remarks: item.remarks
        });
      });

      // 填充数据以确保至少有 itemsPerPage.value 行
      while (uData.length < itemsPerPage.value) {
        uData.push({
          userId: ' ',
          userName: ' ',
          userSex: ' ',
          job: ' ',
          department: ' ',
          phone: ' ',
          email: ' ',
          loginAccount: ' ',
          role: ' ',
          remarks: ' '
        });
      }

      tableData.value = uData;
    };

    onMounted(() => {
      fetchUserList();
    });

    return {
      tableData,
      itemsPerPage,
      currentPage,
      department,
      job,
      role,
      userName,
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
