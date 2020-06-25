import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from "../providers/AuthProvider";

class FetchUser extends React.Component {
  state = { loaded: false, };

  componentDidMount() {
    const { auth: { authenticated, setUser, }, } = this.props;

    if (authenticated) {
      this.loaded();
    } else {
      if (this.checkLocalToken()) {
        axios.get('/api/auth/validate_token')
          .then( res => {
            setUser(res.data.data);
            this.loaded();
          })
          .catch( res => {
            this.loaded();
          })
      } else {
        this.loaded();
      }
    }
  }

  checkLocalToken = () => {
    const token = localStorage.getItem('access-token');
    return token;
  }

  loaded = () => this.setState({ loaded: true, });

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

const ConnectedFetchUser = (props) => (
  <AuthConsumer>
    { auth => 
      <FetchUser { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedFetchUser;


// the breakdown of what is going on in here

// Our whole application might depend on the current user's data so we first need to make sure the user has been validated and fetched before any other component can be rendered. To do this we create a loaded boolean in state. Once the user is good to go we then tell the component to render the children. 
// Once the component renders to the DOM we check two cases:
// authenticated
// set loaded to true and render all of the other components. 
// not authenticated
// first check to see if there is a token in localStorage. If there is then send the token to the server so we can check to see if it is a valid token. If it is valid, we update the user state and set loaded to true and render all the other components. 
// if there isn't a token in localStorage then the user isn't logged in so we go ahead and set loaded to true and render the routes as a user that is not signed in.
// The checkLocalToken function will check to see if we have a token saved in localStorage and retrieve it if it finds one. 