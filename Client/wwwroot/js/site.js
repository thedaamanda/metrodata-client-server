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

const setProfile = () => {
    // const email = document.querySelector('#email');
    // email.innerHTML = auth.getUser.email;

    // const role = document.querySelector('#role');
    // role.innerHTML = auth.getUser.role;

    const nameIdentifier = document.querySelector('#nameIdentifier');
    nameIdentifier.innerHTML = `Hi, ${auth.getUser.name}`;;
};

window.addEventListener('load', async () => {
    isAunthenticated();
    setProfile();
});

const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', async (event) => {
        event.preventDefault();

        await auth.revokeToken();
    });
}
