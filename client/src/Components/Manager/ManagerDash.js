import React from "react";
import Testimonal from "../testimonal/Testimonal";
import Cards from "./Cards";

function ManagerDash() {
  return (
    <>
      <div id="heading">
        <h3>Hello, Mr. {sessionStorage.getItem("username")}</h3>
      </div>
      <Cards />
      <hr />
      <Testimonal />
    </>
  );
}

export default ManagerDash;
