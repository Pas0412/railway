import axios from 'axios';

const backendUrl = 'http://121.43.118.193:9473/RailwayMonitoring';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以进行一些配置，例如添加请求头等
    return config;
  },
  (error) => {
    // 对请求错误进行处理
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 在请求成功后可以进行一些处理
    return response.data; // 返回响应数据
  },
  (error) => {
    // 对响应错误进行处理
    if (error.response) {
      // 如果响应存在，则表示后端返回了响应
      const status = error.response.status;
      const data = error.response.data;

      // 在这里可以根据状态码进行不同的处理
      if (status === 401) {
        // 处理未授权的情况
      } else if (status === 404) {
        // 处理资源未找到的情况
      } else {
        // 处理其他错误
      }

      // 返回一个带有错误信息的 Promise
      return Promise.reject(data);
    } else {
      // 如果响应不存在，表示请求未发送成功，例如网络错误
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
