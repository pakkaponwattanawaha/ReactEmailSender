import React from 'react'
import Papa from 'papaparse'

//CSV parser
const Datacontroller = props =>{ 
    const [rows, setRows] = React.useState([]);
    const [rank, setRank] = React.useState([]);
    React.useEffect(() => {
        async function getData() {
                const response = await fetch('/data/emails.csv')
                const reader = response.body.getReader()
                const result = await reader.read() // raw array
                const decoder = new TextDecoder('utf-8')
                const csv = decoder.decode(result.value) // the csv text
                const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
                const rows = results.data // array of objects เอาเฉพาะdata
                setRows(rows);       
        }
        async function getRank() {
                const response2 = await fetch('/data/ranks.csv')
                const reader2 = response2.body.getReader()
                const result2 = await reader2.read() // raw array
                const decoder2 = new TextDecoder('utf-8')
                const csv2 = decoder2.decode(result2.value) // the csv text
                const results2 = Papa.parse(csv2, { header: true }) // object with { data, errors, meta }
                const rank = results2.data// array of objects เอาเฉพาะdata
                setRank(rank);
        }     
      getRank(); 
      getData();    
    }, []); // [] means just do this once, after initial render

      const rankIdMap=new Map();//create Map to get co-reponding title from id
      rank.forEach(id=>{
          rankIdMap.set(id.id,id.name)
      });
      rows.forEach(person=>{
            if(person.email !== ''){
                person.next_rank=rankIdMap.get(person.user_next_rank_id)
                person.stateStatus='รอส่ง' 
                person.fail=false
            }
        })
      React.useEffect(() => {//send data to parent
            props.dataSetter(rows);
        }, [rows]);//do this once, after initial render and watch for change in rows to update the props

    return (<p></p>)
}

export default Datacontroller