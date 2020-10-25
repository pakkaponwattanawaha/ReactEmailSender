import React,{Component} from'react';
import Datacontroller from './Datacontroller';
import './style.css';
class Postmethod extends Component{
    constructor(){
        super()
        this.state ={
            dataJSON:[],
            btnSendStatus:'ส่งเมล',
            update:0 ,
            isloaded:false ,
            promise:[]       
        }
    }
    setData = (d) => { 
        if(!this.state.isloaded&&d.length!==0) {
            this.setState({dataJSON:d,
                           isloaded:true})}
    }
    exitapp(){
        window.open("about:blank", "_self");
        window.close();
    }
    
    postDataloop(){ //loop throught dataJSON
            this.setState({promise:[]})
            this.state.dataJSON.forEach(d=>{if(d.stateStatus!=='ส่งสำเร็จ'&& d.email!==''){
                this.state.promise.push(this.postData(d))         
                    } else if (d.email!==''){console.log('already sent:'+d.user_name)}})
            Promise.all(this.state.promise)// wait until all POST has been sent
            .then(() => {
                let check=true;
                this.state.dataJSON.forEach(d=>{
                    if(d.stateStatus==='ส่งล้มเหลว'&&d.email!==''){
                        this.setState({btnSendStatus:'ลองส่งเมลล์ที่ส่งล้มเหลวอีกครั้ง'})
                        check=false 
                    }
                })
                if(check){
                    this.setState({btnSendStatus:'ปิด'})
                }           
            })
        }
    async postData(d){
                 this.setState({update:1})//updater
                 try {
                   d.stateStatus='กำลังส่ง';
                   const result = await fetch('https://us-central1-frontend-assignment-d6597.cloudfunctions.net/sendMail',{
                    method : 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        email: d.email,
                        subject: 'สวัสดี คุณ'+ d.user_name,
                        body:'อีก'+d.reviews_left_to_uprank+'รีวิว คุณจะได้เป็น' +d.next_rank+'ร่วมแบ่งปันรีวิวกับเพื่อนสมาชิกกันนะคะ'
                    })
                   });
                     if(result.status===204){
                        d.stateStatus='ส่งสำเร็จ';//เปลี่ยนค่าตัวแปรที่เก็บcss tag เพื่อเปลี่ยนสีด้วย
                     }
                     if(result.status===500){
                        d.stateStatus='ส่งล้มเหลว';  
                        d.fail=true;
                     }
                     
                     console.log(result.status);
                     this.setState({update:1})
                    
                 } catch(e){
                     console.log(e);
                 }
    }
    componentDidUpdate() {
        //console.log("Component updated");       
      }
    componentDidMount(){
        //console.log('Mounted')
    }
    render(){
        //console.log("render!")
       let personList=[];
       this.state.dataJSON.forEach((person,i)=>{
         if(person.email !== ''){
             personList.push( <tr key={i}><td className='demail'>{person.email}</td>   <td className='dcontent'>สวัสดี คุณ {person.user_name} <br/><br/> อีก{person.reviews_left_to_uprank}รีวิว คุณจะได้เป็น {person.next_rank}
                  ร่วมแบ่งปันรีวิวกับเพื่อนสมาชิกกันนะคะ</td><td className={person.stateStatus}>{person.stateStatus}</td></tr>);
         }
       }); 
        return ( !this.state.isloaded?<div><Datacontroller  dataSetter={this.setData}/><p>Loading...</p> </div>  :  //checks status for sendButton
            <table className="table-content">
               
                <div className='personList'>
                    {personList}
                </div>
                <div>
                    {this.state.btnSendStatus!=='ปิด' ?  //checks status for sendButton
                    <button className="sendBtn"onClick={()=> this.postDataloop()}>{this.state.btnSendStatus}</button>
                    :<button className="sendBtn"onClick={()=>this.exitapp()}>{this.state.btnSendStatus}</button>}
                 </div>
            </table>
        )
    }
}
 export default Postmethod;