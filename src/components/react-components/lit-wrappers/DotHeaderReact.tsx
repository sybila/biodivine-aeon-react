import { createComponent } from "@lit/react";
import { DotHeader } from "../../lit-components/dot-header";
import React from "react";

const DotHeaderReact = createComponent({
  tagName: "dot-header",
  elementClass: DotHeader,
  react: React,
});

export default DotHeaderReact;
