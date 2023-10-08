import axiosInstance from './index.js';

// 获取用户信息
export function getWarnings(
    configName,
    deviceId,
    endTime,
    currentPage,
    itemsPerPage,
    startTime) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/warmEvent/list', {
            configName: configName,
            deviceId: deviceId,
            endTime: endTime,
            pageNum: currentPage,
            pageSize: itemsPerPage,
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