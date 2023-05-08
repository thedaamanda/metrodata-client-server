const getJwtToken = () => {
    return sessionStorage.getItem("jwtToken");
}

const setJwtToken = (token) => {
    sessionStorage.setItem("jwtToken", token);
}

const removeJwtToken = () => {
    sessionStorage.removeItem("jwtToken");
}

const getRefreshToken = () => {
    return sessionStorage.getItem("refreshToken");
}

const setRefreshToken = (token) => {
    sessionStorage.setItem("refreshToken", token);
}

const login = async (email, password) => {
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

        setJwtToken(result.token);
        setRefreshToken(result.refreshToken);

        window.location.href = '/';
    } catch (message) {
        const error = document.querySelector('#error');
        error.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
};

const events = () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
            'submit',
            async function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    const email = document.querySelector('#email').value;
                    const password = document.querySelector('#password').value;

                    await login(email, password);
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();
};

main();
