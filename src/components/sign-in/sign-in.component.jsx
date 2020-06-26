import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
 
    handleSubmit = async event => {
        event.preventDefault();
        
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })

        }catch(error){
            console.error(error);
        }

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            // console.log(this.state);
        });
    }



    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email"
                        name="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label="Email"
                        required />

                    <FormInput type="password"
                        name="password"
                        handleChange={this.handleChange}
                        value={this.state.password}
                        label="Passowrd"
                        required />
                    <div className="buttons">
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;