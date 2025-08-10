import { createComponent } from "@lit/react";
import { OverlayWindow } from "../../lit-components/overlay-window";
import React from "react";

const OverlayWindowReact = createComponent({
  tagName: "overlay-window",
  elementClass: OverlayWindow,
  react: React,
});

export default OverlayWindowReact;
