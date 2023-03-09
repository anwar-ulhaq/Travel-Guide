import {StatusBar} from 'expo-status-bar';

import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import Notification from './components/Notification';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <Notification />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
