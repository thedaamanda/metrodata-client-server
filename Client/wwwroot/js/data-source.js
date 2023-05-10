const BASE_URL = 'https://localhost:7169/';

class DataSource {
    // Authentication
    static login(user) {
        return fetch(`${BASE_URL}api/accounts/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(responseJson.message)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static revokeToken() {
        return fetch(`${BASE_URL}api/accounts/revoketoken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                return response;
            }
        );
    }

    static refreshToken() {
        return fetch(`${BASE_URL}api/accounts/refreshtoken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken: token,
                refreshToken: auth.getRefreshToken(),
                tokenType: 'Bearer',
            }),
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.data) {
                    return Promise.resolve(responseJson.data);
                } else {
                    return Promise.reject(responseJson.message)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    // University
    static getUniversities() {
        return fetch(`${BASE_URL}api/universities`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static getUniversityById(id) {
        return fetch(`${BASE_URL}api/universities/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static insertUniversity(university) {
        return fetch(`${BASE_URL}api/universities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

    static updateUniversity(university) {
        return fetch(`${BASE_URL}api/universities/${university.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(university),
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static deleteUniversity(id) {
        return fetch(`${BASE_URL}api/universities/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
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
        return fetch(`${BASE_URL}api/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static getRoleById(id) {
        return fetch(`${BASE_URL}api/roles/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static insertRole(role) {
        return fetch(`${BASE_URL}api/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

    static updateRole(role) {
        return fetch(`${BASE_URL}api/roles/${role.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(role),
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static deleteRole(id) {
        return fetch(`${BASE_URL}api/roles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
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
        return fetch(`${BASE_URL}api/educations`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    // Employee
    static getEmployees() {
        return fetch(`${BASE_URL}api/employees`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static getEmployeeByNik(id) {
        return fetch(`${BASE_URL}api/employees/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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

    static insertEmployee(employee) {
        return fetch(`${BASE_URL}api/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

    static updateEmployee(employee) {
        return fetch(`${BASE_URL}api/employees/${employee.nik}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(employee)
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }

    static deleteEmployee(id) {
        return fetch(`${BASE_URL}api/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Something went wrong`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }
}
