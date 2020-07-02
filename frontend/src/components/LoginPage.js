import React from 'react'
import PropTypes from 'prop-types'
import './LoginPage.css'
import japari from './japari.png'
import { Link } from 'react-router-dom'
import { Login } from '../actions'
import { connect } from 'react-redux'
import history from '../utils/history'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show_enter: false,
            show_secondenter: false,
            username: '',
            password: ''
            
        };

        this.cubeRef = React.createRef();
        this.flipperRef = React.createRef();
        this.handleFlip = this.handleFlip.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.showPasswordform = this.showPasswordform.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    

    handleUsername(e) {
        let Username = e.target.value;
        if (Username.length > 1) {
            this.setState({ show_enter: true });
        } else {
            this.setState({ show_enter: false })}
        this.setState({username: Username});
    }

    handleFlip() {
        const flipper = this.flipperRef.current;
        flipper.classList.toggle('flippedcardinfo');

        // Sync flip animation delay
        setTimeout(() => {
            this.setState({ show_info: !this.state.show_info });
        }, 400);
    }

    showPasswordform() {
        const cube = this.cubeRef.current;
        cube.classList.toggle('flippedform');
        this.setState({show_secondenter: false})
    }


    handlePassword(e) {
        let Password = e.target.value;
        if (Password.length > 1) {
            this.setState({show_secondenter: true});
        }   else {
            this.setState({show_secondenter: false});
        }
        this.setState({password: Password})
    }

    handleLogin(e) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(Login(this.state.username, this.state.password))
    }

    handleDemo(){
        history.push('/welcome')
    }


    render() {
        return (
            <section id="loginpage">
            {/* Login forms */}
            {/* Flipper flip the whole thing, front card and back card */}
            <div class="flipper" ref={this.flipperRef}>
                <div class="FRONTCARD">
                <img src={japari} alt="japarilogo" style={{position: "relative", top:"50px", width:"250px", height:"185px"}} onClick={this.showPasswordform}></img> 
                <div id="logotext"></div>
                <div class="flipinfo" id="info" onClick={this.handleFlip}></div>
                <div id="secondenter" onClick={this.handleLogin} style={{display: this.state.show_secondenter ? 'block': 'none'}}/>
                <div id="wrapper">
                    <div class="cube" ref={this.cubeRef}>
                        <form action="user/login" id="auth" method="post" autocomplete="off">
                            <div class="side" id="side1">
                                <div id="backlogin"></div>
                                <div id="enter" data-testid="enter" style={{display: this.state.show_enter ? 'block': 'none'}} onClick={this.showPasswordform}></div>
                                <input class="frontforms" id="frontloginform" name="username" placeholder="enter your username" type="text" value={this.state.username} autocomplete="off" onChange={this.handleUsername}/>
                            </div>
                            <div class="side" id="side2">
                                <div id="backpassword"></div>
                                <input class="frontforms" id="frontpasswordform" name="password" placeholder="password" type="password" value={this.state.password} autocomplete="off" onChange={this.handlePassword}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="fliptext">Or <Link to='/register'>create new account</Link></div>
                {/* <div class="fliptext">Or <a href="#">create new account</a></div> */}
                </div> 

            {/* //Info  */}
            <div class="BACKCARD">
            <div id={this.state.show_info ? "infopage": ""}>
                <span class="frominfo" id="infosubtitle">Japari Park is the new simple way to deal with personal finances</span>
                <span class="frominfo" id="infotitle">This is how it works</span>
                <div class="infoflipback frominfo"></div>
                <div id="infoleft" class="infocolumn frominfo" onClick={this.handleFlip}>
                    <div id="leftcolumn">enter planned periodic <br />incomes and expenses<br />
                        <div class="columnimage"></div>
                        <span class="columnfooter">Plan or estimate your regular expenses. Divide them into <br />categories. Сomponents of your budget <br />will always be near to hand</span>
                    </div>
                </div>
                <div id="infocenter" class="infocolumn frominfo" onClick={this.handleFlip}>
                    <div id="centercolumn">check all your savings <br />at the moment<br />
                        <div class="columnimage"></div>
                        <span class="columnfooter">Regularly update the value of your savings. <br />Follow the progress.</span>
                    </div>
                </div>
                <div id="inforight" class="infocolumn frominfo" onClick={this.handleFlip}>
                    <div id="rightcolumn">analyze financial statistics <br />and forecasts<br />
                        <div class="columnimage"></div>
                        <span class="columnfooter">Based on this information, you’ll get statistics for your budget and forecast of savings <br />for the year ahead</span>
                    </div>
                </div>

                <div id="infoline"></div>
                <div id="infolinetext" class="frominfo">Try without registration</div>
                <button class="demobutton" onClick={this.handleDemo} >Demo account</button>
            </div>
            </div>
            </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    const { LoggingIn } = state
    const { UsernameExist, BackendFailure, LoginSuccess } = LoggingIn
    
    return { UsernameExist, BackendFailure, LoginSuccess }
}

LoginPage.propTypes = {
    UsernameExist: PropTypes.bool.isRequired,
    BackendFailure: PropTypes.bool.isRequired,
    LoginSuccess: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(LoginPage)