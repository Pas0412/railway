import axiosInstance from './index.js';

// 获取传感器列表
export function getSensors(sensorName, pageNum, pageSize) {
    const formData = new FormData();
    formData.append('sensorName', sensorName);
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/sensor/list', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            // 请求成功，解析数据并传递给 resolve
            console.log(pageNum);
            console.log(response.data);
            resolve(response.data);
        })
        .catch(error => {
            // 请求失败，传递错误信息给 reject
            reject(error);
        });
    });
}

// 添加传感器
export function addSensor(formData) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/sensor/addDevice', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                // 请求成功，解析数据并传递给 resolve
                resolve(response);
            })
            .catch(error => {
                // 请求失败，传递错误信息给 reject
                reject(error);
            });
    });
}