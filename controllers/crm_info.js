import axios from "axios"

function crm_info(){
    console.log('DASDSADAS')
    axios.get('http://localhost:3000/crm').then((response) => {
        console.log(response)
    })
} 
crm_info()