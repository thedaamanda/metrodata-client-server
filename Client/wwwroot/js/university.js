const getUniversities = async () => {
    try {
        const result = await DataSource.getUniversities();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const insertUniversity = async () => {
    let university = {
        name: $('#name').val(),
    };

    try {
        await DataSource.insertUniversity(university);

        swal({
            title: 'Success!',
            text: 'University has been added',
            icon: 'success',
            buttons: false,
            timer: 1500,
        });

        $('#universityModal').modal('hide');
        reloadData();
    } catch (message) {
        swal({
            title: 'Oops...',
            text: `${message}`,
            icon: 'error',
        });
    }
};

const updateUniversity = async () => {
    let university = {
        id: $('#id').val(),
        name: $('#name').val(),
    };

    try {
        const result = await DataSource.updateUniversity(university);

        swal({
            title: 'Success!',
            text: result.message,
            icon: 'success',
            buttons: false,
            timer: 1500,
        });

        $('#universityModal').modal('hide');
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
    $('#universityModal .modal-title').text('Add University');
    $('#name').val('');
    $('#id').remove();
    $('#submit-btn').attr('value', 'add');
    $('#submit-btn').html('Save changes');
}

const edit = async (id) => {
    try {
        const result = await DataSource.getUniversityById(id);

        $('#universityModal .modal-title').text('Edit University');
        $('#universityModal .modal-footer').append(
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
                await DataSource.deleteUniversity(id);

                swal({
                    title: 'Success!',
                    text: 'University has been deleted',
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
        const result = await DataSource.getUniversities();

        $("#university-table").DataTable().clear();
        $("#university-table").DataTable().rows.add(result).draw();
    } catch (message) {
        swal({
            title: "Oops...",
            text: `${message}`,
            icon: "error",
        });
    }
};

const renderResult = (results) => {
    $('#university-table').dataTable({
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copy', text: '<i class="fas fa-copy"></i> Copy', titleAttr: 'Copy', className: 'btn btn-primary', exportOptions: { columns: [ 0, 1 ] } },
            { extend: 'csv', text: '<i class="fas fa-file-csv"></i> CSV', titleAttr: 'CSV', className: 'btn btn-warning', exportOptions: { columns: [ 0, 1 ] } },
            { extend: 'excel', text: '<i class="fas fa-file-excel"></i> Excel', titleAttr: 'Excel', className: 'btn btn-success', exportOptions: { columns: [ 0, 1 ] } },
            { extend: 'pdf', text: '<i class="fas fa-file-pdf"></i> PDF', titleAttr: 'PDF', className: 'btn btn-danger', exportOptions: { columns: [ 0, 1 ] } },
            { extend: 'print', text: '<i class="fas fa-print"></i> Print', titleAttr: 'Print', className: 'btn btn-info', exportOptions: { columns: [ 0, 1 ] } }
        ],
        data: results,
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            { data: 'name' },
            {
                data: '',
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-icon icon-left btn-warning dt-edit" onclick="edit(${row['id']})" data-toggle="modal" data-target="#universityModal">
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
                },
            },
        ],
    });
};

const fallbackResult = (message) => {
    const universityListElement = document.querySelector('#university-list');
    universityListElement.innerHTML = `
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
                        await insertUniversity();
                    } else {
                        await updateUniversity();
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
    getUniversities();
};

main();
