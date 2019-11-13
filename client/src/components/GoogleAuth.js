import React from "react"


class GoogleAuth extends React.Component{
    state={isSignedIn:null}
    componentDidMount(){
        window.gapi.load("client:auth2",()=>{
            window.gapi.client.init({
                clientId:"53339597271-m1v9g98aemms0d9925hle8v4ui79g6qr.apps.googleusercontent.com",
                scope:"email"
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance()
                this.setState({isSignedIn:this.auth.isSignedIn.get()})
            })
        })
    }
    renderAuthButton(){
        if(this.state.isSignedIn===null){
            return <div>i dnt knw if m signed in</div>
        }
        else if(this.state.isSignedIn){
            return <div>m signed in</div>
        }
        else{
            return <div>m not signed in</div>
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

export default GoogleAuth