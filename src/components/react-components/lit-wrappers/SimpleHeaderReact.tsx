import { createComponent } from "@lit/react";
import { SimpleHeader } from "../../lit-components/simple-header";
import React from "react";

const SimpleHeaderReact = createComponent({
  tagName: "simple-header",
  elementClass: SimpleHeader,
  react: React,
});

export default SimpleHeaderReact;
