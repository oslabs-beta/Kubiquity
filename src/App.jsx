import React from 'react';

import Errors from './components/errors/Errors';
import Pods from './components/pods/Pods';

const App = () => (
  <div>
    <h1>Kubiquity</h1>
    <Errors />
    <Pods/>
  </div>
);

export default App;
