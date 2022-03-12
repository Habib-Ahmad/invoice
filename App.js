import React from 'react';
import AppWrapper from './context/context';
import AppView from './AppView';

const App = () => {
  return (
    <AppWrapper>
      <AppView />
    </AppWrapper>
  );
};

export default App;
