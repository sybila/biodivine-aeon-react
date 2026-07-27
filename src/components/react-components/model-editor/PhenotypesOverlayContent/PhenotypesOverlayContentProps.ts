import type { LiveModelInt } from '../../../../services/global/LiveModel/LiveModelInt';
import type { PhenotypeEditorInt } from '../../../../services/model-editor/ControlEditor/PhenotypeEditor/PhenotypeEditorInt';
import type { HelpHoverState } from '../../../../stores/HelpHover/HelpHoverState';
import type { ControlStatus } from '../../../../stores/LiveModel/ControlStore/ControlStatus';
import type { ZustandStore } from '../../../../stores/ZustandStoreType';
import type { Phenotype } from '../../../../types';

export type PhenotypesOverlayContentProps = {
  filterElementsFunction: (
    elements: Array<Phenotype>,
    text: string
  ) => Array<Phenotype>;

  liveModelServ: LiveModelInt;
  phenotypeEditorServ: PhenotypeEditorInt;

  controlStore: ZustandStore<ControlStatus>;
  helpHoverStore: ZustandStore<HelpHoverState>;
};
