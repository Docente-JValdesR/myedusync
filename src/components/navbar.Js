"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function navbar({ user }) {
  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <p className="navbar-brand text-primary">Welcome {user?.name}</p>
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
        <div
          className="offcanvas offcanvas-end"
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
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href={`/dashboard/profile`}
                >
                  Mi perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/clases">
                  Horario de Clases
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/curso">
                  Mi Cursos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/cursos">
                  Cursos
                </Link>
              </li>
              <li>
                <button onClick={() => signOut()}>signOut</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
