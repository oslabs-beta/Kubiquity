import React from 'react';

import Errors from './components/errors/Errors';
import Pods from './components/pods/Pods';

import './styles/app.css';

// TODO: after MVP, convert React Class Components to Hooks.
// TODO: after MVP, try out Typescript.

const App = () => (
  <div>
    <h1>Kubiquity</h1>
    <Errors />
    <Pods />
  </div>
);

export default App;
