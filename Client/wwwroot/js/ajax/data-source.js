const API_KEY = '841f54a47b4e47fd807cac4455ca246e';
const BASE_URL = 'https://api.spoonacular.com/';

class DataSource {
    static searchRecipe(keyword) {
        return fetch(`${BASE_URL}recipes/search?apiKey=${API_KEY}&query=${keyword}&number=12`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`${keyword} is not found`)
                }
            })
            .catch(error => {
                return Promise.reject(error)
            }
        );
    }

    static informationRecipe(id) {
        return fetch(`${BASE_URL}recipes/${id}/information?apiKey=${API_KEY}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`${id} is not found`)
                }
            })
    }

    static categories() {
        return fetch("js/ajax/data-categories.json")
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if (responseJson.categories) {
                    return Promise.resolve(responseJson.categories);
                } else {
                    return Promise.reject(`Categories is not found`)
                }
            }
        );
    }
}
