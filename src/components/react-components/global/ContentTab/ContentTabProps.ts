import type { ReactNode } from "react";

export interface ContentTabProps {
  children?: ReactNode;
  headerText?: string;
  showTab?: boolean;
  onClose: () => void;
}
