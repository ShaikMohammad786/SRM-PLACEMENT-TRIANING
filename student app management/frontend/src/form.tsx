import { useState } from "react";
import axios from "axios";

export  function Form(){

    const [name ,setName] = useState<string>("");
    const [roll_no ,setId] = useState<string>("");
    const [dept ,setDept] = useState<string>("");
    const [age ,setAge] = useState<number>(0);
    const [image ,setImage] = useState<string>("");

   async function handleSubmit(e :any){
    e.preventDefault();


    const res  = await axios.post("http://localhost:5000/students", {
                            name,roll_no,dept,age,image
                    });

    console.log(res);

      
    }

    return (

        <div>
            
            <form>
                    <input id ="name" type = "text" placeholder="Name"  onChange= {(e) => setName(e.target.value)}/> 
                    <input id ="id" type = "text" placeholder="ID" onChange= {(e) => setId(e.target.value)}/> 
                    <input id ="dept" type = "text" placeholder="Department" onChange= {(e) => setDept(e.target.value)}/> 
                    <input id ="age" type = "number" placeholder="Age" onChange= {(e) => setAge(Number(e.target.value))}/> 
                    <input id ="image" type = "text" placeholder="Image URL" onChange= {(e) => setImage(e.target.value)}/>
                    <button type="submit" onClick = {handleSubmit}>Submit</button>
            </form>


        </div>


        
    )

}

export default Form;