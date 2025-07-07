import { createComponent } from "@lit/react";
import { ContentWindow } from "../../lit-components/content-window";
import React from "react";

const ContentWindowReact = createComponent({
  tagName: "content-window",
  elementClass: ContentWindow,
  react: React,
});

export default ContentWindowReact;
