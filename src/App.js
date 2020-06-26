import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SigninSignupPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribefromauth = null;

  componentDidMount() {
    this.unsubscribefromauth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);

        userDocRef.onSnapshot(snapshot => {
          this.setState({
            currentUser : {
              id : snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);
            
          })
          
        })
      }else {
        this.setState({
          currentUser: userAuth
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribefromauth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SigninSignupPage} />
        </Switch>
      </div>
    )
  }

}

export default App;
