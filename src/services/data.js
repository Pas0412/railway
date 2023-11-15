import axiosInstance from './index.js';

// 数据监控子页面
// 监测数据
export function monitoringData(
    deviceId,
    endTime,
    methodID,
    pageNum,
    pageSize,
    sensorId,
    sensorTypeId,
    startTime) {
    const formData = new FormData();
    formData.append('methodID', methodID);
    formData.append('deviceId', deviceId);
    formData.append('endTime', endTime);
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    formData.append('sensorId', sensorId);
    formData.append('sensorTypeId', sensorTypeId);
    formData.append('startTime', startTime);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/sensorData/list', formData, {
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

// 获取预测方法下拉选项
export function getMethods(sensorTypeID) {
    const formData = new FormData();
    formData.append('sensorTypeID', sensorTypeID);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/forecastMethod/forecastMethodListSelect', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            // 请求成功，解析数据并传递给 resolve
            resolve(response.data);
        })
            .catch(error => {
                // 请求失败，传递错误信息给 reject
                reject(error);
            });
    });
}

// 获取图表数据
export function getChartData(deviceId, methodId, sensorId, sensorTypeId) {
    const formData = new FormData();
    formData.append('deviceId', deviceId);
    formData.append('methodId', methodId);
    formData.append('sensorId', sensorId);
    formData.append('sensorTypeId', sensorTypeId);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/sensorData/realTimeCurveList', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            // 请求成功，解析数据并传递给 resolve
            resolve(response.data);
        })
            .catch(error => {
                // 请求失败，传递错误信息给 reject
                reject(error);
            });
    });
}