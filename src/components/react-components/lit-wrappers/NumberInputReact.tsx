import { createComponent } from "@lit/react";
import { NumberInput } from "../../lit-components/number-input";
import React from "react";

const NumberInputReact = createComponent({
  tagName: "number-input",
  elementClass: NumberInput,
  react: React,
});

export default NumberInputReact;
