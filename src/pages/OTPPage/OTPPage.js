import React, { useEffect, useState } from "react";
import "./OTPPage.scss";
import enterBtn from "../../assets/enter.svg";
import { useInput } from "../../hooks/input.hook.js";
import { useHistory } from "react-router-dom";

export default function OTPPage() {
  const [OTP, setOTP] = useState("");
  const code = useInput("", { isEmpty: true, minLength: 4 });
  const history = useHistory();

  const generateCode = () => {
    let code = "";
    let num = "1234567890";

    for (let i = 0; i < 4; i++) {
      code += num[Math.floor(Math.random() * 10)];
    }

    setOTP(code);
    alert(`Your code: ${code}`);
  };

  useEffect(() => {
    generateCode();
  }, []);

  function OTPHandler() {
    if (code.value === OTP) {
      history.push("/main");
    }
  }

  return (
    <div className="wrapper">
      <div className="otp-form">
        <div className="code">
          <label>Code from sms</label>
          <input
            value={code.value}
            name="text"
            onChange={e => code.onChange(e)}
            onBlur={e => code.onBlur(e)}
            type="text"
          />
          {code.isDirty && code.isEmpty && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Поле не может быть пустым
            </div>
          )}
        </div>

        <div className="enter-btn">
          <button onClick={OTPHandler} disabled={!code.inputValid}>
            <img src={enterBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
