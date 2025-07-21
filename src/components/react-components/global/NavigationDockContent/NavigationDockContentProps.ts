import type { ReactNode } from "react";

export type NavigationDockContentProps = {
    children?: ReactNode;
    handleResultsClick?: () => void;
    handleComputeEngineClick?: () => void;
}