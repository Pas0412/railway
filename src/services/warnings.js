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
        const formData = new FormData();
        formData.append('configName', configName);
        formData.append('deviceId', deviceId);
        formData.append('endTime', endTime);
        formData.append('pageNum', currentPage);
        formData.append('pageSize', itemsPerPage);
        formData.append('startTime', startTime);
        axiosInstance.post('/warmEvent/list', formData, {
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