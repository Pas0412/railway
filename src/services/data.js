import axiosInstance from './index.js';

// 获取用户信息
export function monitoringData(deviceId, endTime, methodID, pageNum, pageSize, sensorId, sensorTypeId, startTime) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/sensorData/list', {
            deviceId: deviceId,
            endTime: endTime,
            methodID: methodID,
            pageNum: pageNum,
            pageSize: pageSize,
            sensorId: sensorId,
            sensorTypeId: sensorTypeId,
            startTime: startTime
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