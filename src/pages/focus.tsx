import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import '../resources/styles/common.css';

const Focus = () => {


  return (
    <>
      <section className="w-screen h-screen bg-primary_bg">
        <div>

        </div>
      </section>
      <section className="w-screen h-screen bg-secondary_bg">

      </section>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Focus />
  </React.StrictMode>
);
