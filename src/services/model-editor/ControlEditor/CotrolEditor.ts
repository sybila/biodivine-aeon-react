class ControlEditorClass {
    /** Function which enforces reload of the ControlEditorTabContent.tsx component */
    private reloadEditorTab: (() => void) | null = null;
}

const ControlEditor: ControlEditorClass = new ControlEditorClass();

export default ControlEditor;