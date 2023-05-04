const getEmployees = async () => {
    try {
        const result = await DataSource.getEmployees();

        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertEmployee = async () => {
    let object = {
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
        await DataSource.insertEmployee(object);

        swal({
            title: "Success!",
            text: "Employee has been added",
            icon: "success",
            buttons: false,
            timer: 1500,
        });

        $("#addModal").modal("hide");
        $("#employee-table").DataTable().ajax.reload();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const detailEmployee = async (id) => {
    try {
        const result = await DataSource.getEmployeeById(id);

        renderResultDetail(result);
    } catch (message) {
        fallbackResultDetail(message);
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

                        <button class="btn btn-icon icon-left btn-warning dt-edit" onclick="edit()" data-bs-toggle="modal" data-bs-target="#modalEdit">
                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                <i class="far fa-edit"></i> Edit
                            </a>
                        </button>

                        <button class="btn btn-danger dt-delete" id="hapus" onclick="remove(${row['nik']})" data-bs-toggle="modal" data-bs-target="#modalDelete">
                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
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
    $("#submit-btn").click(function () {
        insertEmployee();
    });

    $("#employee-list").on("click", ".dt-detail", function () {
        let id = $(this).data("nik");
        detailEmployee(id);
    });
};

const main = () => {
    events();
    getEmployees();
};

main();
