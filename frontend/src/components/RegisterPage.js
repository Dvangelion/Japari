import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'
import { Register } from '../actions'
import { connect } from 'react-redux'


class RegisterPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            Username: '',
            Password: '',
            show_username_alert: false,
            show_password_alert: false,
            show_backend_alert: false,
            show_usernamexist_alert: false
        }

        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleRegisterClick = this.handleRegisterClick.bind(this)
        
    }


    handleUsername(e) {
        let FormUsername = e.target.value;
        if (FormUsername.length < 6){
            this.setState({ show_username_alert: true,
                            Username: FormUsername })
        }  else {
            this.setState({ show_username_alert: false,
                            Username: FormUsername})
        }
    }

    handlePassword(e) {
        let FormPassword = e.target.value;
        var specialChar = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)

        if (!specialChar.test(FormPassword)){
            this.setState({ show_password_alert: true,
                            Password: FormPassword})
        }   else {
            this.setState({ show_password_alert: false,
                            Password: FormPassword})
        }
    }

    handleRegisterClick(e) {
        e.preventDefault()
    
        const { dispatch } = this.props
        

        const canRegister = !this.state.show_password_alert  && !this.state.show_username_alert && this.state.Username.length > 0 && this.state.Password.length > 0
        if (canRegister) {
            dispatch(Register(this.state.Username, this.state.Password))
            
        } else {
            alert('PLEASE CHECK THE REGISTER CONDITION')
            
        }
      }

    render() {
        return (
            <section id="loginpage">
            <div className="FRONTCARD">
            <div id="regpage">
                <div id="franklin">
                    <div class="avatar"></div>
                </div>
                <div id="createaccount"></div>
                <div id="registrationforms">
                    <form id="signup" autocomplete="off">
                        <input class="backforms" id="backloginform" placeholder=" enter a username" type="text" onChange={this.handleUsername}/><br />
                        <Fade bottom when={this.state.show_username_alert}>
                            <div className='invalid-feedback' style={{display:'block'}}>
                                Length has to be greater than 5
                            </div>
                        </Fade>
                        <input class="backforms" id="backpasswordform" placeholder=" password" type="password" onChange={this.handlePassword}/>
                        <Fade bottom when={this.state.show_password_alert}>
                            <div className='invalid-feedback' style={{display:'block'}}>
                                Must contain a special character
                            </div>
                        </Fade>
                        <button class="regbutton" name="registration"
                            onClick={this.handleRegisterClick}>r e g i s t e r</button>
                    </form>
                </div>
                <div class="fliptext" style={{bottom: '-90px'}}>Or <Link to="/">use existing account</Link></div>
            </div>
            </div>
            </section>
        )
    }
}

RegisterPage.propTypes = {
    UsernameExist: PropTypes.bool.isRequired,
    BackendFailure: PropTypes.bool.isRequired,
    RegisterSuccess: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Registration } = state
    const { UsernameExist, BackendFailure, RegisterSuccess } = Registration
    
    return { UsernameExist, BackendFailure, RegisterSuccess }
}


export default connect(mapStateToProps)(RegisterPage)