import type { WarningState } from "../../../../stores/Warning/WarningState"
import type { ZustandStore } from "../../../../stores/ZustandStoreType"

export type WarningOverlayProps = {
    zIndex: string

    warningStore: ZustandStore<WarningState>;
}