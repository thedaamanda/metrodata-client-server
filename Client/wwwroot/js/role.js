const roleListElement = document.querySelector("#role-list");

const getRoles = async () => {
    try {
        const result = await DataSource.getRoles();
        renderResult(result);
    } catch (message) {
        fallbackResult(message)
    }
}

const renderResult = results => {
    let data = '';
    let no = 1;
    results.forEach(result => {
        data += `
        <tr>
            <td>${no++}</td>
            <td>${result.name}</td>
            <td>
                <a href="#" class="btn btn-outline-warning">Edit</a>
                <a href="#" class="btn btn-outline-danger">Hapus</a>
            </td>
        </tr>
        `;
    });
    roleListElement.innerHTML = data;
};

const fallbackResult = message => {
    roleListElement.innerHTML = `
        <tr>
            <td colspan="3">${message}</td>
        </tr>
    `;
};

getRoles();
