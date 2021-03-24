import React, { useEffect } from "react";
import LogInForm from "../../components/LogInForm/LogInForm";

function Login() {
  useEffect(() => {
    document.title = "Log in";
  }, []);

  return (
    <div
      style={{
        widht: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center"
      }}
    >
      <LogInForm />
    </div>
  );
}

export default Login;
