import { Col, Row ,Form, Button } from "react-bootstrap";
import "./Login.css";
import photo from "./kuvar.png";
import { useState, useContext } from "react";
import api, { setRefreshToken } from "../../api/api";
import { RoleContext } from "../app/App";
import { useNavigate } from "react-router-dom";



export function Login(){
    const [loginData,setLoginData]=useState<LoginData>({
        email:"",
        password:"",
        companyName:""
    });
    const [loginInfo,setLoginInfo]=useState<string|undefined>(undefined);
    const navigate=useNavigate();
    const setRole=useContext(RoleContext);

    return (
        <>
        <Row>
            <Col lg={{span:4, offset:4}} className="login-holder p-3">
                <img src={photo} />
                <Form.Control placeholder="email" type="email" onChange={(e)=>changeLoginData(e as any)}/>
                <Form.Control placeholder="companyName" type="text" onChange={(e)=>changeLoginData(e as any)}/>
                <Form.Control placeholder="password" type="password" onChange={(e)=>changeLoginData(e as any)}/>
                {
                    loginInfo && <div className="alert alert-warning login-info" role="alert">
                        {loginInfo}
                    </div>
                }
                <button  className="btn form-control" onClick={()=>doLogin()}>Log in</button>
            </Col>
        </Row>
        </>
    );
    function changeLoginData(e:React.ChangeEvent<HTMLInputElement>):void{
        setLoginData(prev=>{
            return {...prev,
                [e.target.placeholder]:e.target.value
            }
        })
    }
    function doLogin(){
        api("auth/workman/login","post",undefined,loginData).then(res=>{
            if(res.status==="ok"){
               if(res.data.statusCode){
                    switch(res.data.statusCode){
                        case -1002:
                            return setLoginInfo("Pogresan naziv kompanije!");
                        case -3002:
                            return setLoginInfo("Nevazeca lozinka!");
                        case -2002:
                            return setLoginInfo("Pogresna email adresa!");
                        case -3003:
                            return setLoginInfo("Nalog nije validiran za trenutnog korisnika!");
                    }
               }
               setRefreshToken(res.data.refreshToken,"workman");
               setRole("workman");
               navigate("/workman/login/direction");
                
            }
        })
    }
}

interface LoginData{
    email:string;
    companyName:string;
    password:string;
}
