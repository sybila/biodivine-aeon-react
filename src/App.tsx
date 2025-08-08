import LoadingIndicatorReact from './components/react-components/lit-wrappers/LoadingIndicatorReact';
import LoadingWrapperReact from './components/react-components/lit-wrappers/LoadingWrapperReact';
import MessageWrapperReact from './components/react-components/lit-wrappers/MessageWrapperReact';
import ModelEditor from './pages/model-editor/ModelEditor';

function App() {
  return (
    <div className="h-screen w-screen max-h-screen min-w-screen bg-[var(--color-bg-base)]">
      <MessageWrapperReact>
        <LoadingWrapperReact>
          <LoadingIndicatorReact slot="loading-component" />
          <ModelEditor />
        </LoadingWrapperReact>
      </MessageWrapperReact>
    </div>
  );
}

export default App;
