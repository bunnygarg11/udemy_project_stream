import React from "react"
import {connect} from "react-redux"

import {signIn,signOut} from "../actions"


class GoogleAuth extends React.Component{
    // state={isSignedIn:null}
    componentDidMount(){
        window.gapi.load("client:auth2",()=>{
            window.gapi.client.init({
                clientId:"181470615190-8jdat1rddd6413g8soq7smto52pjut86.apps.googleusercontent.com",
                scope:"email"
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance()
                // this.setState({isSignedIn:this.auth.isSignedIn.get()})
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    onAuthChange=(isSignedin)=>{
        // console.log("bunny")
        // this.setState({isSignedIn:this.auth.isSignedIn.get()})
        if(isSignedin){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }
    onSignInClick=()=>{
        this.auth.signIn()
    }

    onSignOutClick=()=>{
        this.auth.signOut()
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
        // return <div>{null}</div>
            return null
        }
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign out
                </button>
            )
        }
        else{
            return (
                <button onClick={this.onSignInClick} className="ui red google button" >
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }
    render(){
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{

return {
    isSignedIn:state.auth.isSignedIn
}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)