import React, { useState } from "react";

function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  function toggleSidebar() {
    const sidebar = document.querySelector<HTMLDivElement>("#sidebar")!;
    setIsSidebarVisible(!isSidebarVisible);
    if (!isSidebarVisible) {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  }

  return (
    <>
      <img
        id="sidebarButton"
        className={isSidebarVisible ? "rotate" : "notRotate"}
        src="/images/icons8-боковое-меню-48.png"
        onClick={toggleSidebar}
        alt="Toggle Sidebar"
      />
      <img id="logo" src="/images/NotX_logo.png" alt="Logo" />
      <button>Выйти</button>
    </>
  );
}

export default Header;
