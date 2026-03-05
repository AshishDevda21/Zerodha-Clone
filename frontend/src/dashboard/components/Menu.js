import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";

const getUserIdFromStorageOrToken = () => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    return storedUserId;
  }

  const token = localStorage.getItem("token");
  if (!token || token.split(".").length < 2) {
    return "USERID";
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const payload = JSON.parse(window.atob(padded));
    return payload.username || payload.email || payload.id || "USERID";
  } catch {
    return "USERID";
  }
};

const Menu = () => {
  const userId = useMemo(() => getUserIdFromStorageOrToken(), []);
  const avatarText = useMemo(() => userId.slice(0, 2).toUpperCase(), [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <NavLink to="/dashboard" end style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Dashboard
                </p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/orders" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Orders
                </p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/holdings" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Holdings
                </p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/positions" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Positions
                </p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/funds" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Funds
                </p>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/apps" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <p className={isActive ? activeMenuClass : menuClass}>
                  Apps
                </p>
              )}
            </NavLink>
          </li>

          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <p className={menuClass}>Logout</p>
          </li>
        </ul>

        <hr />

        <div className="profile">
          <div className="avatar">{avatarText}</div>
          <p className="username">{userId}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
