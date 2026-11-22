import type { MenuTabTypeCPTNotNull } from '../../../types/pages/controlPerturbationTable';
import type { MenuTabButton } from '../../../types/types';

export type ControlPerturbationsTableStatusState = {
  /** Reference to the menu tab buttons. */
  menuTabButtonsRef: Partial<Record<MenuTabTypeCPTNotNull, MenuTabButton>>;

  /** Sets the reference to a menu tab button.
   *  @param tab - The menu tab type.
   *  @param el - The HTML button element, or null to clear the reference.
   */
  setMenuTabButtonRef: (
    tab: MenuTabTypeCPTNotNull,
    el: MenuTabButton | null
  ) => void;
};
