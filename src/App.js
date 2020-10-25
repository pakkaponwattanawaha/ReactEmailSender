import React from 'react';
import './style.css';
import Btnemail from './Btnemail';
import Btnrank from './Btnrank';
//import Datacontroller from './Datacontroller';
import Postmethod from './Postmethod';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mailclicked: false,
      rankclicked:false,
    }
  }
  onClickmail(name){
    this.setState({
        mailclicked:true
    })
  }
  onClickrank(){
    this.setState({       
        rankclicked:true
    })
  }
  render(){
  return (this.state.mailclicked&&this.state.rankclicked ? //both button clicked?
    <div className="App">
      <header className="App-header">
          <h1>Mailer</h1>
        </header>
          <Btnemail Clickmail={this.onClickmail.bind(this)}/>
          <Btnrank Clickrank={this.onClickrank.bind(this)}/>
          
           <table className="table-header">
             <tr>
                <th className='email'>อีเมล</th>
                <th className='content'>ข้อความ</th>
                <th className='status'>สถานะ</th>
             </tr>
             </table>
          {/* <table className="table-content"> */}
          <Postmethod />
          {/* </table> */}
    </div> 
    :
    <div className="App">
      <header className="App-header">
          <h1>Mailer</h1>
        </header>
          <Btnemail  Clickmail={this.onClickmail.bind(this)}/>
          <Btnrank Clickrank={this.onClickrank.bind(this)}/>
      </div>

  );}
}
export default App;

