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

                    await auth.login(email, password);
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = async () => {
    events();
};

main();
