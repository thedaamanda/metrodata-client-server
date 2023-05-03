const getEmployees = async () => {
    try {
        const result = await DataSource.getEmployees();

        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (results) => {
    $("#employee-table").dataTable({
        dom: "Bfrtip",
        buttons: [
            { extend: 'copy', text: 'Copy', titleAttr: 'Copy', className: 'btn btn-outline-primary' },
            { extend: 'csv', text: 'CSV', titleAttr: 'CSV', className: 'btn btn-outline-success' },
            { extend: 'excel', text: 'Excel', titleAttr: 'Excel', className: 'btn btn-outline-success' },
            { extend: 'pdf', text: 'PDF', titleAttr: 'PDF', className: 'btn btn-outline-danger' },
            { extend: 'print', text: 'Print', titleAttr: 'Print', className: 'btn btn-outline-info' }
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
					<button class="btn btn-icon icon-left btn-warning dt-edit" onclick="edit(
					)" data-bs-toggle="modal" data-bs-target="#modalEdit">
						<a data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                            <i class="far fa-edit"></i> Edit
						</a>
					</button>

					<button class="btn btn-danger dt-delete" id="hapus" onclick="remove(${row['nik']}
					)" data-bs-toggle="modal" data-bs-target="#modalDelete">
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

const main = () => {
    getEmployees();
};

main();
