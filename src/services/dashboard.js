import axiosInstance from './index.js';

// 获取四方格数据
export function fetchDashBoardSquare() {
  return new Promise((resolve, reject) => {
    axiosInstance.post('/center/dataStatistics')
      .then(response => {
        // 请求成功，解析数据并传递给 resolve
        resolve(response.data);
      })
      .catch(error => {
        // 请求失败，传递错误信息给 reject
        reject(error);
      });
  });
}