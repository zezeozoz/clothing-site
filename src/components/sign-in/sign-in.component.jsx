import React from 'react';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
   constructor(props){
      super(props)

      this.state= {
         email: '',
         password: ''
      }
   }

   handleSubmit = async event => {
      event.preventDefauilt()

      const {email, password} = this.state

      try {
         await auth.signInWithEmailAndPassword(email, password);
         this.setState({email: '', password: ''})
      }  catch(err) {
         console.error(err)
      }
   }

   handleChange = event => {
      const {value, name} = event.target

      this.setState({[name]: value})
   }


   render() {
      return (
         <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={this.handleSubmit}>
               <FormInput 
                  name='email' 
                  type='email' 
                  value={this.state.email}
                  onChange={this.handleChange}
                  label='Email'
                  required
               />
               <FormInput 
                  name='password' 
                  type='password' 
                  value={this.state.password}
                  onChange={this.handleChange}
                  label='Password'
                  required
               />
               <div className='buttons'>
                  <CustomButton type='submit'>SIGN IN</CustomButton>
                  <CustomButton isGoogleSignIn onClick={signInWithGoogle}>{' '}Sign In With Google{' '}</CustomButton>
               </div>
            </form>
         </div>
      )
   }
}

export default SignIn;