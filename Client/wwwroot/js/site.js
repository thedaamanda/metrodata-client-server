// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const auth = new Auth();

const isAunthenticated = () => {
    const token = auth.getJwtToken();

    if (!token) {
        window.location.href = '/account/login';
    }
}

const isTokenExpired = () => {
    const exp = auth.getUser().exp;
    const now = new Date();

    const dateNow = Math.round(now.getTime() / 1000);

    if (exp < dateNow) {
        if (auth.getRefreshToken()) {
            auth.refreshToken();
        } else {
            swal({
                title: 'Oops...',
                text: 'Your session has expired',
                icon: 'error',
            })

            setTimeout(async () => {
                await auth.revokeToken();
                window.location.href = '/account/login';
            }, 5000);
        }
    }
}

const setProfile = () => {
    // const email = document.querySelector('#email');
    // email.innerHTML = auth.getUser.email;

    // const role = document.querySelector('#role');
    // role.innerHTML = auth.getUser.role;

    const nameIdentifier = document.querySelector('#nameIdentifier');
    nameIdentifier.innerHTML = `Hi, ${auth.getUser().name}`;;
};

window.addEventListener('load', async () => {
    isAunthenticated();
    isTokenExpired();
    setProfile();
});

const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', async (event) => {
        event.preventDefault();

        await auth.revokeToken();
    });
}
