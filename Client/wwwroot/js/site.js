// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const auth = new Auth();

const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', async (event) => {
        event.preventDefault();

        await auth.revokeToken();
    });
}
