import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import Main from './components/layout/Main';
import Login from './components/login';
const demo = () => {
  return <div>test</div>;
};
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} /> */}
        <Route path="/login" exact component={Login} />
        <Main>
          <Route exact path="/schools" component={demo} />
          <Route exact path="/classes" component={demo} />
          <Route exact path="/teachers" component={demo} />
          <Route exact path="/subjects" component={demo} />
          <Route exact path="/labs" component={demo} />
          <Route exact path="/admins" component={demo} />
          {/* <Route exact path="/profile" component={demo} /> */}
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
