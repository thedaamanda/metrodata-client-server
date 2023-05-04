const BASE_URL = 'https://localhost:7169/';

class DataSource {
    // University
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

    static insertUniversity(university) {
        return fetch(`${BASE_URL}api/universities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(university),
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

    // Role
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

    static insertRole(role) {
        return fetch(`${BASE_URL}api/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
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

    // Education
    static getEducation() {
        return fetch(`${BASE_URL}api/educations`)
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

    // Employee
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
