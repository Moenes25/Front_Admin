
import React, { Fragment } from 'react';

import Login from './Component/Login/Login';




import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/app"
              render={() => (
                <Fragment>
                 
                  <div>
                   
                       
                        }}
                 
                  </div>
                </Fragment>
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}


export default App;