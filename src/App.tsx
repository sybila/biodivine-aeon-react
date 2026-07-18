import { RouterProvider } from '@tanstack/react-router';
import { AliveScope } from 'react-activation';
import LoadingIndicatorReact from './components/react-components/lit-wrappers/LoadingIndicatorReact';
import LoadingWrapperReact from './components/react-components/lit-wrappers/LoadingWrapperReact';
import MessageWrapperReact from './components/react-components/lit-wrappers/MessageWrapperReact';
import router from './router';

function App() {
  return (
    <AliveScope>
      <div className="h-screen w-screen max-h-screen min-w-screen bg-(--color-bg-base) fixed inset-0">
        <MessageWrapperReact
          messageColor="var(--color-notification-message)"
          infoColor="var(--color-notification-message-base-text)"
          successColor="var(--color-positive)"
          errorColor="var(--color-negative)"
        >
          <LoadingWrapperReact>
            <LoadingIndicatorReact
              slot="loading-component"
              loadBoxColor="var(--color-loading-indicator)"
              tagTextColor="var(--color-loading-indicator-text)"
            />
            <RouterProvider router={router} />
          </LoadingWrapperReact>
        </MessageWrapperReact>
      </div>
    </AliveScope>
  );
}

export default App;
