class Auth {
    getJwtToken() {
        return sessionStorage.getItem('jwtToken');
    }

    getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }

    isTokenExpired(token) {
        const decodedToken = jwt_decode(token);

        return decodedToken.exp < Date.now() / 1000;
    }

    async refreshToken() {
        try {
            const result = await DataSource.refreshToken();

            setJwtToken(result.token);
            setRefreshToken(result.refreshToken);
        } catch (message) {
            swal({
                title: 'Oops...',
                text: `${message}`,
                icon: 'error',
            });
        }
    }

    async login(email, password) {
        try {
            let user = {
                email: email,
                password: password,
            };

            const result = await DataSource.login(user);

            swal({
                title: 'Success!',
                text: 'Login successfully',
                icon: 'success',
                buttons: false,
                timer: 1500,
            });

            sessionStorage.setItem('jwtToken', result.token);
            sessionStorage.setItem('refreshToken', result.refreshToken);

            // setJwtToken(result.token);
            // setRefreshToken(result.refreshToken);

            window.location.href = '/';
        } catch (message) {
            const error = document.querySelector('#error');
            error.innerHTML = `<div class="alert alert-danger">${message}</div>`;
        }
    };

    async revokeToken() {
        try {
            await DataSource.revokeToken();

            sessionStorage.removeItem('jwtToken');
            sessionStorage.removeItem('refreshToken');

            window.location.href = '/account/login';
        } catch (message) {
            swal({
                title: 'Oops...',
                text: `${message}`,
                icon: 'error',
            });
        }
    }
}
