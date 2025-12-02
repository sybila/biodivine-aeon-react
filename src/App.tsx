import { RouterProvider } from '@tanstack/react-router';
import LoadingIndicatorReact from './components/react-components/lit-wrappers/LoadingIndicatorReact';
import LoadingWrapperReact from './components/react-components/lit-wrappers/LoadingWrapperReact';
import MessageWrapperReact from './components/react-components/lit-wrappers/MessageWrapperReact';
import router from './router';
import { AliveScope } from 'react-activation';

function App() {
  return (
    <AliveScope>
      <div className="h-screen w-screen max-h-screen min-w-screen bg-[var(--color-bg-base)] fixed inset-0">
        <MessageWrapperReact>
          <LoadingWrapperReact>
            <LoadingIndicatorReact slot="loading-component" />
            <RouterProvider router={router} />
          </LoadingWrapperReact>
        </MessageWrapperReact>
      </div>
    </AliveScope>
  );
}

export default App;
