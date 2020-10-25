import React from 'react'
import './style.css';
class Btnemail extends React.Component{
    constructor(){
        super()
        this.state ={
            mailclicked:true
        }
    }
    
     clickhandler(){
        console.log("email clicked");
        this.props.Clickmail(this.state.mailclicked)
        
    }
    render(){
    return (
    <div>
        <button className='btnemail'onClick={this.clickhandler.bind(this)}>เลือกไฟล์ emails.csv</button>
        
    </div>
    )}
}

export default Btnemail;