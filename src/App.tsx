import MessageWrapperReact from './components/react-components/lit-wrappers/MessageWrapperReact';
import ModelEditor from './pages/model-editor/ModelEditor';

function App() {
  return (
    <div className="h-screen w-screen max-h-screen min-w-screen bg-[var(--color-bg-base)]">
      <MessageWrapperReact>
        <ModelEditor />
      </MessageWrapperReact>
    </div>
  );
}

export default App;
