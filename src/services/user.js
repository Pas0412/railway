import axiosInstance from './index.js';

// 获取用户信息
export function userLogin(username, password) {
    const formData = new FormData();
    formData.append('loginAccount', username);
    formData.append('loginPassword', password);
    return new Promise((resolve, reject) => {
        axiosInstance.post('/auth/login', formData, {
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

export function userList(department, job, pageNum, pageSize, role, userName) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/user/UserList',
            {
                department: department,
                job: job,
                pageNum: pageNum,
                pageSize: pageSize,
                role: role,
                userName: userName
            }
        )
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
