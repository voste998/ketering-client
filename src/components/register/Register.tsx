import { Col, Row ,Form } from "react-bootstrap";
import photo from "../login/kuvar.png"
import "./Register.css";
import { useState } from "react";


export default function Register(){

    const [registerData,setRegisterData]=useState<RegisterData>({
        name:"",
        lastname:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    return(
        <Row>
            <Col lg={{span:4, offset:4}} className="register-holder p-3">
                <img src={photo} />
                <Form.Control type="text" placeholder="name" onChange={(e)=>changeRegisterData(e as any)}/>
                <Form.Control type="text" placeholder="lastname" onChange={(e)=>changeRegisterData(e as any)}/>
                <Form.Control type="email" placeholder="email" onChange={(e)=>changeRegisterData(e as any)}/>
                <Form.Control type="password" placeholder="password" onChange={(e)=>changeRegisterData(e as any)}/>
                <Form.Control type="password" placeholder="confirmPassword" onChange={(e)=>changeRegisterData(e as any)}/>
                <button className="btn form-control" onClick={()=>console.log(JSON.stringify(registerData))}>Do register</button>
            </Col>
        </Row>
    )
    function changeRegisterData(e:React.ChangeEvent<HTMLInputElement>){
        setRegisterData(prev=>{
            return {
                ...prev,[e.target.placeholder]:e.target.value
            };
        });
    }

}
interface RegisterData{
    name:string;
    lastname:string;
    email:string;
    password:string;
    confirmPassword:string;
}