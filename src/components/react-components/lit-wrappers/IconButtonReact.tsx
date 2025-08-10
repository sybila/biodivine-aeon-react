import { createComponent } from "@lit/react";
import { IconButton } from "../../lit-components/icon-button";
import React from "react";

const IconButtonReact = createComponent({
  tagName: "icon-button",
  elementClass: IconButton,
  react: React,

  events: {
    onactivate: "activate",
    onchange: "change",
  },
});

export default IconButtonReact;
