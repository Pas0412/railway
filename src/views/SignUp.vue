<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-container">
    <div class="login">
      <h2>用户注册</h2>
      <form @submit.prevent="signup" class="form">
        <div>
          <label for="department">部门 *</label>
          <input type="text" id="department" v-model="department" required />
        </div>
        <div>
          <label for="email">邮箱</label>
          <input type="text" id="email" v-model="email" />
        </div>
        <div>
          <label for="job">职业</label>
          <input type="text" id="job" v-model="job" />
        </div>
        <div>
          <label for="loginAccount">登录账号 *</label>
          <input
            type="text"
            id="loginAccount"
            v-model="loginAccount"
            required
          />
        </div>
        <div>
          <label for="loginPassword">登录密码 *</label>
          <input
            type="password"
            id="loginPassword"
            v-model="loginPassword"
            required
          />
        </div>
        <div>
          <label for="phone">电话</label>
          <input type="text" id="phone" v-model="phone" />
        </div>
        <div>
          <label for="remarks">备注</label>
          <input type="text" id="remarks" v-model="remarks" />
        </div>
        <div>
          <label for="sysRemarks">备注说明</label>
          <input type="text" id="sysRemarks" v-model="sysRemarks" />
        </div>
        <div>
          <label for="userName">用户姓名 *</label>
          <input type="text" id="userName" v-model="userName" required />
        </div>
        <div>
          <label for="userSex">用户性别</label>
          <input type="text" id="userSex" v-model="userSex" />
        </div>
        <div class="role">
          <label for="role">角色 *</label>
          <input type="number" id="role" v-model="role" required />
        </div>
        <button type="submit">注册</button>
      </form>
      已有账户？
      <a href="/login">去登录</a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userSignUp } from "@/services/user";

export default {
  setup() {
    const router = useRouter();

    // 响应式数据
    const department = ref("");
    const email = ref("");
    const job = ref("");
    const loginAccount = ref("");
    const loginPassword = ref("");
    const phone = ref("");
    const remarks = ref("");
    const role = ref("");
    const sysRemarks = ref("");
    const userName = ref("");
    const userSex = ref("");

    // 提交表单
    const signup = () => {
      // 检查必填字段
      if (
        !department.value ||
        !loginAccount.value ||
        !loginPassword.value ||
        !role.value ||
        !userName.value
      ) {
        alert("请填写必填字段");
        return;
      }

      // 构建注册请求的数据
      const formData = {
        department: department.value,
        email: email.value,
        job: job.value,
        loginAccount: loginAccount.value,
        loginPassword: loginPassword.value,
        phone: phone.value,
        remarks: remarks.value,
        role: role.value,
        sysRemarks: sysRemarks.value,
        userName: userName.value,
        userSex: userSex.value,
      };

      try {
        // 发送注册请求，假设注册成功后会返回用户信息
        // eslint-disable-next-line no-unused-vars
        const response = userSignUp(formData);
        console.log(response);

        router.push("/");
      } catch (error) {
        console.error("注册失败", error);
        alert("注册失败，请重试");
      }
    };

    return {
      department,
      email,
      job,
      loginAccount,
      loginPassword,
      phone,
      remarks,
      role,
      sysRemarks,
      userName,
      userSex,
      signup
    };
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  margin: 0 auto;
  background-color: rgb(207, 232, 240);
  text-align: center;
  height: 200vh;
  position: absolute;
}

.login {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: lightblue;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-300px, -800px);
}

.form-group {
  margin-bottom: 10px;
  text-align: left;
}

label {
  font-weight: bold;
  margin-left: 6px;
}

input[type="text"],
input[type="password"],
input[type="number"] {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.form {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 两列 */
  grid-gap: 16px; /* 网格间隙 */
}

.role {
  margin-bottom: 40px;
}
</style>
