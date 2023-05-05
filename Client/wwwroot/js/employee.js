const getEmployees = async () => {
    try {
        const result = await DataSource.getEmployees();

        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertEmployee = async () => {
    let employee = {
        nik: $("#nik").val(),
        firstName: $("#first_name").val(),
        lastName: $("#last_name").val(),
        birthDate: $("#birth_date").val(),
        gender: parseInt($("#gender").val()),
        hiringDate: $("#hiring_date").val(),
        email: $("#email").val(),
        phoneNumber: $("#phone_number").val(),
    };

    try {
        await DataSource.insertEmployee(employee);

        swal({
            title: "Success!",
            text: "Employee has been added",
            icon: "success",
            buttons: false,
            timer: 1500,
        });

        $("#employeeModal").modal("hide");
        reloadData();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const detailEmployee = async (nik) => {
    try {
        const result = await DataSource.getEmployeeByNik(nik);

        renderResultDetail(result);
    } catch (message) {
        fallbackResultDetail(message);
    }
};

const updateEmployee = async () => {
    let employee = {
        nik: $("#nik").val(),
        firstName: $("#first_name").val(),
        lastName: $("#last_name").val(),
        birthDate: $("#birth_date").val(),
        gender: parseInt($("#gender").val()),
        hiringDate: $("#hiring_date").val(),
        email: $("#email").val(),
        phoneNumber: $("#phone_number").val(),
    };

    try {
        const result = await DataSource.updateEmployee(employee);

        swal({
            title: 'Success!',
            text: result.message,
            icon: 'success',
            buttons: false,
            timer: 1500,
        });

        $('#employeeModal').modal('hide');
        reloadData();
    } catch (message) {
        swal({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const add = () => {
    $('#employeeModal .modal-title').text('Add Employee');
    $('#nik').val('');
    $('#first_name').val('');
    $('#last_name').val('');
    $('#birth_date').val('');
    $('#gender').val('');
    $('#hiring_date').val('');
    $('#email').val('');
    $('#phone_number').val('');
    $('#submit-btn').attr('value', 'add');
    $('#submit-btn').html('Save changes');
}

const edit = async (nik) => {
    try {
        const result = await DataSource.getEmployeeByNik(nik);

        $('#employeeModal .modal-title').text('Edit Employee');
        $('#nik').val(result.nik);
        $('#first_name').val(result.firstName);
        $('#last_name').val(result.lastName);
        $('#birth_date').val(result.birthDate);
        $('#gender').val(result.gender);
        $('#hiring_date').val(result.hiringDate);
        $('#email').val(result.email);
        $('#phone_number').val(result.phoneNumber);
        $('#submit-btn').attr('value', 'edit');
        $('#submit-btn').html('Update');
    } catch (message) {
        swal({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const remove = async (nik) => {
    try {
        await swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this data!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await DataSource.deleteEmployee(nik);

                swal({
                    title: 'Success!',
                    text: 'Employee has been deleted',
                    icon: 'success',
                    buttons: false,
                    timer: 1500,
                });

                reloadData();
            }
        });
    } catch (message) {
        swal({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const reloadData = async () => {
    try {
        const result = await DataSource.getEmployees();

        $("#employee-table").DataTable().clear();
        $("#employee-table").DataTable().rows.add(result).draw();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const renderResult = (results) => {
    $("#employee-table").dataTable({
        dom: "Bfrtip",
        buttons: [
            { extend: 'copy', text: 'Copy', titleAttr: 'Copy' },
            { extend: 'csv', text: 'CSV', titleAttr: 'CSV' },
            { extend: 'excel', text: 'Excel', titleAttr: 'Excel' },
            { extend: 'pdf', text: 'PDF', titleAttr: 'PDF' },
            { extend: 'print', text: 'Print', titleAttr: 'Print' }
        ],
        data: results,
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "nik" },
            {
                data: null,
                render: function (data, type, row) {
                    return data.firstName + ' ' + data.lastName;
                }
            },
            {
                data: "",
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-info dt-detail" data-nik="${row['nik']}">
                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Detail">
                                <i class="fas fa-info-circle"></i> Detail
                            </a>
                        </button>

                        <button class="btn btn-icon icon-left btn-warning dt-edit" onclick="edit(${row['nik']})" data-toggle="modal" data-target="#employeeModal">
                            <a data-toggle="tooltip" data-placement="top" title="Edit">
                                <i class="far fa-edit"></i> Edit
                            </a>
                        </button>

                        <button class="btn btn-danger dt-delete" onclick="remove(${row['nik']})">
                            <a data-toggle="tooltip" data-placement="top" title="Delete">
                                <i class="far fa-trash-alt"></i> Delete
                            </a>
                        </button>
					`;
                }
            },
        ],
    });
};

const fallbackResult = (message) => {
    const employeeListElement = document.querySelector("#employee-list");
    employeeListElement.innerHTML = `
        <tr>
            <td colspan="4" class="text-center">${message}</td>
        </tr>
    `;
};

const renderResultDetail = (result) => {
    $("#detailModal").modal("show");

    let genderName = result.gender === 0 ? "Laki-Laki" : "Perempuan";

    $("#detailModal .modal-body").html("");
    $("#detailModal .modal-body").append(`
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">NIK</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.nik}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">First Name</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.firstName}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Last Name</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.lastName}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Birthdate</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.birthDate}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Gender</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${genderName}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Hiring</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.hiringDate}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Email</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.email}</div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-form-label col-12 col-md-3 col-lg-3">Phone</label>
            <div class="col-sm-12 col-md-7">
                <div class="col-form-label">${result.phoneNumber}</div>
            </div>
        </div>
    `);
};

const fallbackResultDetail = (message) => {
    $("#detailModal").modal("show");

    $("#detailModal .modal-body").html("");
    $("#detailModal .modal-body").append(`
        <div class="row">
            <div class="col-sm-12">
                <div class="col-form-label alert alert-danger">${message}</div>
            </div>
        </div>
    `);
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
                    const submitBtn = document.querySelector('#submit-btn');
                    if (submitBtn.value === 'add') {
                        await insertEmployee();
                    } else {
                        await updateEmployee();
                    }
                }

                form.classList.add('was-validated');
            },
            false
        );
    });

    $("#employee-list").on("click", ".dt-detail", function () {
        let nik = $(this).data("nik");
        detailEmployee(nik);
    });
};

const main = () => {
    events();
    getEmployees();
};

main();
