$(document).ready(function() {
    const tableBody = $('#employee-table-body');
    const addForm = $('#addEmployeeForm');
    const addModal = $('#addEmployeeModal');

    function renderTable() {
        tableBody.empty();
        employees.forEach((employee, index) => {
            const row = `
                <tr>
                    <td><input class="form-check-input" type="checkbox"></td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-primary btn-sm"><i class="fa-solid fa-pencil"></i></button>
                            <button type="button" class="btn btn-warning btn-sm"><i class="fa-solid fa-eye"></i></button>
                            <button type="button" class="btn btn-danger btn-sm"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </td>
                    <td>${index + 1}</td>
                    <td>${employee.ten}</td>
                    <td>${employee.hoDem}</td>
                    <td>${employee.diaChi}</td>
                    <td>
                        ${employee.hoatDong
                            ? '<span class="text-success fw-bold">✔</span>'
                            : '<span class="text-danger fw-bold">✖</span>'}
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });

        const totalRecords = employees.length;
        $('#record-count').text(`Kết quả 1 đến ${totalRecords}`);
    }


    addForm.on('submit', function(event) {
        event.preventDefault();
        const ten = $('#ten').val().trim();
        const hoDem = $('#hoDem').val().trim();
        const diaChi = $('#diaChi').val().trim();
        
        $('.form-control').removeClass('is-invalid');
        let isValid = true;

        if (ten === '') {
            $('#ten').addClass('is-invalid').next('.invalid-feedback').text('Tên không được để trống.');
            isValid = false;
        } else if (ten.length > 15) {
            $('#ten').addClass('is-invalid').next('.invalid-feedback').text('Tên không được quá 15 ký tự.');
            isValid = false;
        }

        if (hoDem === '') {
            $('#hoDem').addClass('is-invalid').next('.invalid-feedback').text('Họ đệm không được để trống.');
            isValid = false;
        } else if (hoDem.length > 20) {
            $('#hoDem').addClass('is-invalid').next('.invalid-feedback').text('Họ đệm không được quá 20 ký tự.');
            isValid = false;
        }

        if (diaChi === '') {
            $('#diaChi').addClass('is-invalid').next('.invalid-feedback').text('Địa chỉ không được để trống.');
            isValid = false;
        } else if (diaChi.length > 50) {
            $('#diaChi').addClass('is-invalid').next('.invalid-feedback').text('Địa chỉ không được quá 50 ký tự.');
            isValid = false;
        }

        if (isValid) {
            const newEmployee = {
                id: employees.length + 1, 
                ten: ten,
                hoDem: hoDem,
                diaChi: diaChi,
                hoatDong: true 
            };
            employees.push(newEmployee);
            renderTable();
            addModal.modal('hide');
        }
    });

    addModal.on('hidden.bs.modal', function () {
        addForm[0].reset(); 
        $('.form-control').removeClass('is-invalid'); 
    });
    renderTable();

});