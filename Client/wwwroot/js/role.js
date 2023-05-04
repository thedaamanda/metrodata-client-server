const getRoles = async () => {
    try {
        const result = await DataSource.getRoles();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertRole = async () => {
    let role = {
        name: $("#name").val(),
    };

    try {
        await DataSource.insertRole(role);

        swal({
            title: "Success!",
            text: "Role has been added",
            icon: "success",
            buttons: false,
            timer: 1500,
        });

        $("#roleModal").modal("hide");
        reloadData();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const updateRole = async () => {
    let role = {
        id: $('#id').val(),
        name: $('#name').val(),
    };

    try {
        const result = await DataSource.updateRole(role);

        swal({
            title: 'Success!',
            text: result.message,
            icon: 'success',
            buttons: false,
            timer: 1500,
        });

        $('#roleModal').modal('hide');
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
    $('#roleModal .modal-title').text('Add Role');
    $('#name').val('');
    $('#id').remove();
    $('#submit-btn').attr('value', 'add');
    $('#submit-btn').html('Save changes');
}

const edit = async (id) => {
    try {
        const result = await DataSource.getRoleById(id);

        $('#roleModal .modal-title').text('Edit Role');
        $('#roleModal .modal-footer').append(
            `<input type="hidden" id="id" name="id" value="${result.id}">`
        );
        $('#name').val(result.name);
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

const remove = async (id) => {
    try {
        await swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this data!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await DataSource.deleteRole(id);

                swal({
                    title: 'Success!',
                    text: 'Role has been deleted',
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
        const result = await DataSource.getRoles();

        $("#role-table").DataTable().clear();
        $("#role-table").DataTable().rows.add(result).draw();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const renderResult = (results) => {
    $("#role-table").dataTable({
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
            { data: "name" },
            {
                data: "",
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-icon icon-left btn-warning dt-edit" onclick="edit(${row['id']})" data-toggle="modal" data-target="#roleModal">
                            <a data-toggle="tooltip" data-placement="top" title="Edit">
                                <i class="far fa-edit"></i> Edit
                            </a>
                        </button>

                        <button class="btn btn-danger dt-delete" onclick="remove(${row['id']})">
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
    const roleListElement = document.querySelector("#role-list");
    roleListElement.innerHTML = `
        <tr>
            <td colspan="3">${message}</td>
        </tr>
    `;
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
                        await insertRole();
                    } else {
                        await updateRole();
                    }
                }

                form.classList.add('was-validated');
            },
            false
        );
    });
};

const main = () => {
    events();
    getRoles();
};

main();
