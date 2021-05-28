import React from "react";
import Logo from "../../images/pssroarch-logo-no-icon.png";

import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <header>
      <img src={Logo} alt="Proarch" className="logo" />
    </header>
  );
};
