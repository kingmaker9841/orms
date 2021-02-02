import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { server } from './config/server';
import './App.scss';
import { ToastContainer } from 'react-toastify';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const BaseLayout = React.lazy(() => import('./containers/BaseLayout'));

// Pages
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  state = {
    hasError: false,
  }

  getPermissions() {
    server.get('/permissions')
      .then(json => {
        this.setState({ permissions: json.data })
      })
      .catch(_ => {
        localStorage.clear();
      });
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(err, errInfo) {

  }

  componentDidMount() {
    this.getPermissions();
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="w-100 h-100 text-center mt-5">Oops! Something went wrong</h1>
    } else {
      return this.state.permissions ?
        <HashRouter>
          <ToastContainer />
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} /> */}
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} /> */}
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route path="/" name="Home" render={props => <BaseLayout {...props} permissions={this.state.permissions} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
        :
        null
    }
  }
}

export default App;
