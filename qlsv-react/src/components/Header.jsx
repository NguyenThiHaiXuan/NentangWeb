// src/components/Header.jsx
import React from "react";
import logo from "../assets/tlu-logo.png"; // Bạn đặt file logo vào src/assets

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="TLU Logo" width="40" height="40" className="me-2" />
          Trường Đại học Thủy Lợi
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Giới thiệu</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Liên hệ</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
