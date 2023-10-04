<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-container">
    <div class="login">
      <h2>用户登录</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { userLogin } from "@/services/user";

export default {
  data() {
    return {
      username: "",
      password: "",
      code: 0,
    };
  },
  methods: {
    login() {
      // 在这里执行登录逻辑
      // 使用 this.username 和 this.password 来获取用户输入
      // 发送登录请求到后端，处理登录成功和失败的情况
      // 如果登录成功，调用 store.dispatch('login', user) 来设置用户状态
      console.log("log in clicked");
      userLogin(this.username, this.password)
        .then((data) => {
          // 请求成功，处理返回的数据
          console.log(data.data.menuList[0].children);
          if (data.code == 200) {
            this.$store.dispatch("user/login", data.data);
            router.push('/');
          }
        })
        .catch((error) => {
          // 请求失败，处理错误信息
          console.error("服务器错误", error);
        });
    },
  },
};
</script>

<style>
.login-container {
  width: 100%;
  margin: 0 auto;
  background-color: rgb(207, 232, 240);
  text-align: center;
  height: 100vh;
  position: absolute;
}

.login {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: lightblue;
  text-align: center;
  height: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-200px, -200px);
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
input[type="password"] {
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
</style>
