import React from "react";
import enterBtn from "../../assets/enter.svg";
import "./LoginPage.scss";
import { useInput } from "../../hooks/input.hook.js";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 5 });
  const loginHandler = () => {
    // if (email.value === "kode@kode.ru" && password.value === "Enk0deng")
    console.log("auth..");
    history.push("/otp");
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <div className="email">
          <label>email</label>
          <input
            value={email.value}
            name="email"
            onChange={e => email.onChange(e)}
            onBlur={e => email.onBlur(e)}
            type="text"
          />
          {email.isDirty && email.isEmpty && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Поле не может быть пустым
            </div>
          )}
          {email.isDirty && email.emailError && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Неккоректный емейл
            </div>
          )}
          {email.isDirty && email.minLengthError && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Неккоректная длина
            </div>
          )}
        </div>

        <div className="password">
          <label>Password</label>
          <input
            value={password.value}
            onChange={e => password.onChange(e)}
            onBlur={e => password.onBlur(e)}
            type="password"
            name="password"
          />
          {password.isDirty && password.isEmpty && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Поле не может быть пустым
            </div>
          )}
          {password.isDirty && password.minLengthError && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Неккоректная длина
            </div>
          )}
        </div>
        <div className="enter-btn">
          <button
            onClick={loginHandler}
            disabled={!email.inputValid || !password.inputValid}
          >
            <img src={enterBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
