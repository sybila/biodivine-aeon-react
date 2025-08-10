import { createComponent } from "@lit/react";
import { TextButton } from "../../lit-components/text-button";
import React from "react";

const TextButtonReact = createComponent({
  tagName: "text-button",
  elementClass: TextButton,
  react: React,
});

export default TextButtonReact;
