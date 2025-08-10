import { createComponent } from "@lit/react";
import { PopUpBar } from "../../lit-components/pop-up-bar";
import React from "react";

const PopUpBarReact = createComponent({
  tagName: "pop-up-bar",
  elementClass: PopUpBar,
  react: React,

  events: {
    onactivate: "activate",
    onchange: "change",
  },
});

export default PopUpBarReact;
