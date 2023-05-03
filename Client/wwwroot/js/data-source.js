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
}
