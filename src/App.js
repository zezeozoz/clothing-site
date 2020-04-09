import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Header from './components/header/header.component'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector} from 'reselect'


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import CheckoutPage from './pages/checkout/checkout.components'

import { auth, createUserProfileDocument, /*addCollectionAndDocuments*/ } from './firebase/firebase.utils';
import {selectCurrentUser} from './redux/user/user.selectors'

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef =  await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth)
      //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))); //code to upload data to firebase database
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} 
            render= {() => 
              this.props.currentUser ? (
                <Redirect to="/" />
               ) : (
                 <SignInAndSignUpPage />
                )}
                />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDisCpatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDisCpatchToProps)(App);
