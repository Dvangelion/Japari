import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GetUsername } from '../actions'
import './WelcomePage.css'

class WelcomePage extends React.Component {
    
    componentDidMount() {
        const { dispatch, userName } = this.props
        dispatch(GetUsername(userName))
    }
    render() {
        console.log(this.props)
        return (
            <section id="welcomepage">
            <div className="text">WELCOME TO</div><br />
            <div className="text">JAPARI PARK,</div><br />
            <div className="text">{this.props.userName}!</div><br />
            <div className="text">END OF PROJECT</div>
            
            </section>
        )
    }
}

WelcomePage.propTypes = {
    Username: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
    
    const { userName } = state
    return { userName }
}

export default connect(mapStateToProps)(WelcomePage)