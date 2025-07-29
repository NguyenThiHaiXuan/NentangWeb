document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.getElementById('add-employee-form');
    const tableBody = document.getElementById('employee-table-body');
    const paginationList = document.getElementById('pagination-list');
    const paginationInfo = document.getElementById('pagination-info');

    
    let currentPage = 1;
    const itemsPerPage = 5; 

    function init() {
        paginationList.removeEventListener('click', handlePaginationClick);

        updateDisplay();

        paginationList.addEventListener('click', handlePaginationClick);
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
        tableBody.innerHTML = ''; 
        page--; 

        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = employees.slice(startIndex, endIndex);

        paginatedItems.forEach(emp => {
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
            tableBody.innerHTML += row;
        });
    }

    
    function setupPagination() {
        paginationList.innerHTML = ''; 
        const pageCount = Math.ceil(employees.length / itemsPerPage);

    
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" data-page="prev">Previous</a>`;
        paginationList.appendChild(prevLi);

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
            paginationList.appendChild(li);
        }

        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" data-page="next">Next</a>`;
        paginationList.appendChild(nextLi);
    }

    
    function updatePaginationInfo() {
        const totalEntries = employees.length;
        const startEntry = (currentPage - 1) * itemsPerPage + 1;
        const endEntry = Math.min(startEntry + itemsPerPage - 1, totalEntries);
        
        paginationInfo.textContent = `Showing ${startEntry} to ${endEntry} of ${totalEntries} entries`;
    }

    
    function handlePaginationClick(event) {
        event.preventDefault(); 
        
        const target = event.target;
        if (target.tagName !== 'A') return; 

        const pageValue = target.dataset.page;
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


    
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

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
            
            const modalElement = document.getElementById('addEmployeeModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            addForm.reset();

            
            currentPage = Math.ceil(employees.length / itemsPerPage); 
            init();

        } else {
            alert(errorMessage);
        }
    });

    
    init();
});