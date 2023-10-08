import axiosInstance from './index.js';

// 获取用户信息
export function getDevices(deviceName, pageNum, pageSize) {
    const formData = new FormData();
    formData.append('deviceName', deviceName);
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/device/deviceList', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
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