import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import studentsData from "./data";

export default function App() {
  const [students, setStudents] = useState(studentsData);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAddForm = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (editData) {
      // cập nhật
      setStudents(students.map(sv => sv.id === data.id ? data : sv));
    } else {
      // thêm mới, kiểm tra trùng id
      if (students.some(sv => sv.id === data.id)) {
        alert("Mã sinh viên đã tồn tại!");
        return;
      }
      setStudents([...students, data]);
    }
  };

  const handleEdit = (sv) => {
    setEditData(sv);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(sv => sv.id !== id));
  };

  const total = students.length;
  const maleCount = students.filter(sv => sv.gender === "Nam").length;
  const femaleCount = students.filter(sv => sv.gender === "Nữ").length;

  

  return (
    <>
      <Header />
      <div className="container mt-3 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-primary" onClick={openAddForm}>Thêm sinh viên</button>
          <div>
            <span className="me-3">Tổng số: <strong>{total}</strong></span>
            <span className="me-3 text-primary">Nam: <strong>{maleCount}</strong></span>
            <span className="text-danger">Nữ: <strong>{femaleCount}</strong></span>
          </div>
        </div>

        <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />

        <StudentForm
          show={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          editData={editData}
        />
      </div>
      <Footer />
    </>
  );
}
