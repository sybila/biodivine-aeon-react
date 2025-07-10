import { createComponent } from '@lit/react';
import { MessageWrapper } from '../../lit-components/message-wrapper';
import React from 'react';

const MessageWrapperReact = createComponent({
  tagName: 'message-wrapper',
  elementClass: MessageWrapper,
  react: React,
});

export default MessageWrapperReact;
