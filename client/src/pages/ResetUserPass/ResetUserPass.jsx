import React from "react";
import { Typography } from "@material-ui/core";
import ResetPassForm from "../../components/ResetPassForm/ResetPassForm";

function ResetUserPass() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ marginTop: 40 }}>
          Reset Password
        </Typography>

        <ResetPassForm />
      </div>
    </>
  );
}

export default ResetUserPass;
