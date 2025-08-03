$(document).ready(function () {
    const addForm = $('#add-employee-form');
    const tableBody = $('#employee-table-body');
    const paginationList = $('#pagination-list');
    const paginationInfo = $('#pagination-info');

    let currentPage = 1;
    const itemsPerPage = 5;

    function init() {
        updateDisplay();
        paginationList.on('click', '.page-link', handlePaginationClick);
    }

    function updateDisplay() {
        displayEmployees(currentPage);
        setupPagination();
        updatePaginationInfo();
    }

    /**
     * Hàm hiển thị danh sách nhân viên cho một trang cụ thể
     * @param {number} page - Số trang cần hiển thị
     */
    function displayEmployees(page) {
        tableBody.empty();
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = employees.slice(startIndex, endIndex);

        $.each(paginatedItems, function(index, emp) {
            const row = `
                <tr>
                    <td><input class="form-check-input" type="checkbox"></td>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.address}</td>
                    <td>${emp.phone}</td>
                    <td>
                        <a href="#" class="edit"><i class="bi bi-pencil-fill text-warning"></i></a>
                        <a href="#" class="delete"><i class="bi bi-trash-fill text-danger"></i></a>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    function setupPagination() {
        paginationList.empty();
        const pageCount = Math.ceil(employees.length / itemsPerPage);

        const prevLi = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="prev">Previous</a></li>`;
        paginationList.append(prevLi);

        for (let i = 1; i <= pageCount; i++) {
            const li = `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            paginationList.append(li);
        }

        const nextLi = `<li class="page-item ${currentPage === pageCount ? 'disabled' : ''}"><a class="page-link" href="#" data-page="next">Next</a></li>`;
        paginationList.append(nextLi);
    }

    function updatePaginationInfo() {
        const totalEntries = employees.length;
        const startEntry = (currentPage - 1) * itemsPerPage + 1;
        const endEntry = Math.min(startEntry + itemsPerPage - 1, totalEntries);

        paginationInfo.text(`Showing ${startEntry} to ${endEntry} of ${totalEntries} entries`);
    }

    function handlePaginationClick(event) {
        event.preventDefault();

        const target = $(event.target);
        const pageValue = target.data('page');
        const pageCount = Math.ceil(employees.length / itemsPerPage);

        if (pageValue === 'prev') {
            if (currentPage > 1) {
                currentPage--;
            }
        } else if (pageValue === 'next') {
            if (currentPage < pageCount) {
                currentPage++;
            }
        } else {
            currentPage = parseInt(pageValue);
        }

        updateDisplay();
    }

    addForm.on('submit', function (event) {
        event.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const address = $('#address').val().trim();
        const phone = $('#phone').val().trim();

        let isValid = true;
        let errorMessage = '';

        if (!name || !email || !address || !phone) {
            isValid = false;
            errorMessage += 'Vui lòng điền đầy đủ tất cả các trường thông tin.\n';
        }

        const phoneRegex = /^0\d{9}$/;
        if (phone && !phoneRegex.test(phone)) {
            isValid = false;
            errorMessage += 'Số điện thoại không hợp lệ. Phải có 10 ký tự và bắt đầu bằng số 0.';
        }

        if (isValid) {
            const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
            const newEmployee = { id: newId, name, email, address, phone };
            employees.push(newEmployee);

            alert('Thêm nhân viên thành công!');

            $('#addEmployeeModal').modal('hide');
            addForm[0].reset();

            currentPage = Math.ceil(employees.length / itemsPerPage);
            updateDisplay(); 

        } else {
            alert(errorMessage);
        }
    });

    init();
});