import React, { useState, useEffect } from "react";

export default function StudentForm({ show, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "Nam",
    email: "",
    note: ""
  });

  const [errors, setErrors] = useState({});

  // Reset form khi mở modal hoặc khi editData thay đổi
  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setErrors({});
    } else if (show) {
      setFormData({ id: "", name: "", gender: "Nam", email: "", note: "" });
      setErrors({});
    }
  }, [editData, show]);

  const validate = () => {
    const errs = {};
    if (!formData.id.trim()) errs.id = "Mã sinh viên bắt buộc";
    if (!formData.name.trim()) errs.name = "Họ tên bắt buộc";
    if (!formData.email.trim()) {
      errs.email = "Email bắt buộc";
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(formData.email)) {
      errs.email = "Email không hợp lệ";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit} noValidate>
          <div className="modal-header">
            <h5 className="modal-title">{editData ? "Sửa sinh viên" : "Thêm sinh viên"}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Mã sinh viên *</label>
              <input
                type="text"
                className={"form-control " + (errors.id ? "is-invalid" : "")}
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled={!!editData} // không cho sửa mã khi edit
              />
              {errors.id && <div className="invalid-feedback">{errors.id}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Họ và tên *</label>
              <input
                type="text"
                className={"form-control " + (errors.name ? "is-invalid" : "")}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Giới tính</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className={"form-control " + (errors.email ? "is-invalid" : "")}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Ghi chú</label>
              <textarea
                className="form-control"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn-primary">{editData ? "Cập nhật" : "Thêm"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
