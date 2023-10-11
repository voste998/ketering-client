import { useNavigate } from "react-router-dom";
import { RoleType } from "../../misc/role.type";
import "./CheckRole.css";
import api from "../../api/api";
import { useContext, useEffect } from "react";
import { RoleContext } from "../app/App";

export interface CheckRoleProps{
    role:"administrator"|"workman";
}
export function CheckRole(props:CheckRoleProps){
    const setRole=useContext(RoleContext);
    const navigation=useNavigate();
    useEffect(()=>{
        api("auth/"+props.role+"/tokenCheck","get",props.role,undefined).then(res=>{
            
            if(res.status==="ok"){
                if(res.data.status==="ok" && res.data.statusCode===1000){
                    setRole(props.role);
                    return;
                }
                navigation("/login");
                return;
            }
            navigation("/login");
            return;
        });
    },[]);


    return(<>
    <div></div>
    </>);
}