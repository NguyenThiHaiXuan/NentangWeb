let selectedRow = null;

document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');

    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const maSV = document.getElementById('masv').value;
        const hoTen = document.getElementById('hoten').value;
        const email = document.getElementById('email').value;
        const gioiTinh = document.querySelector('input[name="gioitinh"]:checked').value;

        if (!validateInput(maSV, hoTen, email)) {
            return;
        }

        if (selectedRow === null) {
            const allRows = studentList.getElementsByTagName('tr');
            for (let i = 0; i < allRows.length; i++) {
                const existingMaSV = allRows[i].cells[1].innerText;
                if (existingMaSV === maSV) {
                    showNotification('Mã sinh viên này đã tồn tại. Vui lòng nhập mã khác.', 'danger');
                    return; 
                }
            }

            const newRow = studentList.insertRow();
            newRow.innerHTML = `
                <td>${studentList.rows.length}</td>
                <td>${maSV}</td>
                <td>${hoTen}</td>
                <td>${email}</td>
                <td>${gioiTinh}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="editStudent(this)">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(this)">Xoá</button>
                </td>
            `;
            showNotification('Thêm sinh viên thành công!', 'success');
        } else {
            selectedRow.cells[1].innerText = maSV;
            selectedRow.cells[2].innerText = hoTen;
            selectedRow.cells[3].innerText = email;
            selectedRow.cells[4].innerText = gioiTinh;
            showNotification('Cập nhật thông tin thành công!', 'info');
            resetFormState();
        }

        updateRowNumbers();
        studentForm.reset();
    });
});

function validateInput(maSV, hoTen, email) {
    if (maSV.trim() === '' || hoTen.trim() === '' || email.trim() === '') {
        showNotification('Vui lòng điền đầy đủ Mã SV, Họ tên và Email.', 'warning');
        return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        showNotification('Định dạng Email không hợp lệ.', 'warning');
        return false;
    }
    return true;
}

function editStudent(btn) {
    selectedRow = btn.parentElement.parentElement;
    document.getElementById('masv').value = selectedRow.cells[1].innerText;
    document.getElementById('hoten').value = selectedRow.cells[2].innerText;
    document.getElementById('email').value = selectedRow.cells[3].innerText;
    const gioiTinhValue = selectedRow.cells[4].innerText;
    if (gioiTinhValue === 'Nam') {
        document.getElementById('nam').checked = true;
    } else {
        document.getElementById('nu').checked = true;
    }
    document.getElementById('masv').readOnly = true;
    document.getElementById('submitBtn').innerText = 'Cập nhật';
    document.getElementById('submitBtn').classList.remove('btn-primary');
    document.getElementById('submitBtn').classList.add('btn-info');
    document.getElementById('form-title').innerText = 'Cập nhật Sinh viên';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteStudent(btn) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        const row = btn.parentElement.parentElement;
        if (selectedRow === row) {
            resetFormState();
            document.getElementById('studentForm').reset();
        }
        row.remove();
        updateRowNumbers();
        showNotification('Đã xóa sinh viên thành công!', 'danger');
    }
}

function updateRowNumbers() {
    const rows = document.getElementById('studentList').getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].innerText = i + 1;
    }
}

function resetFormState() {
    selectedRow = null;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Thêm sinh viên';
    submitBtn.classList.remove('btn-info');
    submitBtn.classList.add('btn-primary');
    document.getElementById('form-title').innerText = 'Thêm Sinh viên';
    document.getElementById('masv').readOnly = false;
}

function showNotification(message, type) {
    const notificationArea = document.getElementById('notification-area');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    notificationArea.appendChild(alert);

    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
           if(alert.parentElement) {
               notificationArea.removeChild(alert);
           }
        }, 150);
    }, 3000);
}