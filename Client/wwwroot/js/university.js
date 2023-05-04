const getUniversities = async () => {
    try {
        const result = await DataSource.getUniversities();
        renderResult(result);
    } catch (message) {
        fallbackResult(message);
    }
};

const renderResult = (results) => {
    $("#university-table").dataTable({
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
    const universityListElement = document.querySelector("#university-list");
    universityListElement.innerHTML = `
        <tr>
            <td colspan="3">${message}</td>
        </tr>
    `;
};

const main = () => {
    getUniversities();
};

main();
