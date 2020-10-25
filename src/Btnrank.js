import React from 'react'
import './style.css';
class Btnrank extends React.Component{
    constructor(){
        super()
        this.state ={
            rankclicked:true
        }
    }
    
    clickhandler(){
        console.log("rank clicked")
        this.props.Clickrank(this.state.rankclicked)
    }

    render(){
    return (
    <div>
        <button className='btnrank' onClick={this.clickhandler.bind(this)}>เลือกไฟล์ ranks.csv</button>
    </div>
    )}
}
export default Btnrank;
