import React, { useEffect } from "react";
import errorPage from "../../img/error-404.jpg";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div style={{ backgroundImage: `url${errorPage}` }}>
      <img src={errorPage} style={{ width: "100%" }} alt="" />
    </div>
  );
};

export default PageNotFound;
