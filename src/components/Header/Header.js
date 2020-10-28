import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";

export default function Header(props) {
  const history = useHistory();

  const back = () => {
    history.push("/main");
  };

  const logout = () => {
    history.push("/");
  };

  return (
    <header>
      {props.back && (
        <div onClick={back} className="back">
          Back
        </div>
      )}
      <div onClick={logout} className="logout">
        Logout
      </div>
    </header>
  );
}
