import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SigninSignupPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {

  unsubscribefromauth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribefromauth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth);

        userDocRef.onSnapshot(snapshot => {
           setCurrentUser({
              id : snapshot.id,
              ...snapshot.data()
            }); 
        });
      }else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribefromauth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SigninSignupPage} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
