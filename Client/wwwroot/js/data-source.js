const BASE_URL = 'https://localhost:7169/';

class DataSource {
    static getUniversities() {
        return fetch(`${BASE_URL}api/universities`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static getRoles() {
        return fetch(`${BASE_URL}api/roles`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static getEmployees() {
        return fetch(`${BASE_URL}api/employees`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static getEmployeeById(id) {
        return fetch(`${BASE_URL}api/employees/${id}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static insertEmployee(employee) {
        return fetch(`${BASE_URL}api/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }
}
