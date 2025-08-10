import { createComponent } from "@lit/react";
import { DoubleTextButton } from "../../lit-components/double-text-button";
import React from "react";

const DoubleTextButtonReact = createComponent({
  tagName: "double-text-button",
  elementClass: DoubleTextButton,
  react: React,
});

export default DoubleTextButtonReact;
