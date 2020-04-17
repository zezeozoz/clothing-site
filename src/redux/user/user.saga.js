import { takeLatest, put, call, all } from 'redux-saga/effects'

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils'

import UserActionTypes from './user.types'
import { googleSignInStart } from './user.actions'

export function* signInWithGoogle() {
   try {
      const userRef = yield auth.signInWithPopup(googleProvider)
   }  catch(error) {

   }
}

export function* onGoogleSignInStart() {
   yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, )
}

export function* userSagas() {
   yield all([call(onGoogleSignInStart)])
}