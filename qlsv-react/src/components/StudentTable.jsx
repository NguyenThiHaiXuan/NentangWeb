import React from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-primary">
        <tr>
          <th>STT</th>
          <th>Mã sinh viên</th>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Email</th>
          <th>Ghi chú</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan={7} className="text-center">Chưa có sinh viên nào</td></tr>
        ) : (
          students.map((sv, idx) => (
            <tr key={sv.id}>
              <td>{idx + 1}</td>
              <td>{sv.id}</td>
              <td>{sv.name}</td>
              <td>{sv.gender}</td>
              <td>{sv.email}</td>
              <td>{sv.note}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(sv)}>Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => {
                  if(window.confirm(`Xóa sinh viên ${sv.name}?`)) onDelete(sv.id);
                }}>Xóa</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
