class Auth {
    getJwtToken() {
        return sessionStorage.getItem('jwtToken');
    }

    getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    parseJwt(token) {
        let base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    setInformation() {
        const token = this.getJwtToken();

        const decoded = this.parseJwt(token);

        const payloadUser = {
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded.exp,
        };

        sessionStorage.setItem('user', JSON.stringify(payloadUser));
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

            this.setInformation();

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
            sessionStorage.removeItem('user');

            window.location.href = '/account/login';
        } catch (message) {
            swal({
                title: 'Oops...',
                text: `${message}`,
                icon: 'error',
            });
        }
    }

    async refreshToken() {
        try {
            const result = await DataSource.refreshToken();

            sessionStorage.setItem('jwtToken', result.token);
            sessionStorage.setItem('refreshToken', result.refreshToken);

            this.setInformation();
        } catch (message) {
            swal({
                title: 'Oops...',
                text: `${message}`,
                icon: 'error',
            });
        }
    }
}
