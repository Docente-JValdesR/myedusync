"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

const List = () => {
  return (
    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
      <li className="nav-item">
        <Link className="nav-link active" href="/dashboard">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href={`/dashboard/profile`}>
          Mi perfil
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/dashboard/users">
          Usuarios
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/dashboard/schedules">
          Horario de Clases
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/dashboard/courses">
          Mis Cursos
        </Link>
      </li>
      <li>
        <button
          className="btn btn-primary border text-light"
          onClick={() => signOut()}
        >
          signOut
        </button>
      </li>
    </ul>
  );
};

export default function Navbar({ session }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <p className="navbar-brand text-primary">
          Bienvenido {session?.user.name}
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar d-none d-lg-block">
          <List />
        </div>
        <div
          className="offcanvas offcanvas-end d-lg-none"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-primary"
              id="offcanvasNavbarLabel"
            >
              MyEduSync
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <List />
          </div>
        </div>
      </div>
    </nav>
  );
}
