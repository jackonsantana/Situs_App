import React from "react";
import ReactDOM from "react-dom/client";
import Comando from "./Comando"; // nome correto do arquivo

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Comando />
  </React.StrictMode>
);
