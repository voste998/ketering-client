import { Link } from "react-router-dom";
import { RoleType } from "../../misc/role.type";
import "./Header.css";
import { NavLink } from "react-router-dom";
import photo from "./logo.png";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers ,faRightToBracket,faBars, faBurger, faRightFromBracket, faShoppingCart, faInfo } from "@fortawesome/free-solid-svg-icons";



export interface HeaderProps{
    role:RoleType
}
export function Header(props:HeaderProps){
    const [isOpen,openMenu]=useState<true|false>(false);

    return(
        <>
            <nav className='navbar bg-dark p-3 navbar-expand-lg navbar-expand-md  navbar-dark row' style={{borderBottom:"1px solid #808080"}}>
                <Col className="logo-holder" lg={{span:4}} md={{span:4}} sm={{span:10}} xs={{span:10}}>
                    <Link to="/" className="navbar-brand">
                        <img src={photo} />
                    </Link>
                </Col>
                <Col className="menu-btn" sm={{span:2}} xs={{span:2}} onClick={()=>openMenu(!isOpen)} style={{color:isOpen?"wheat":"#808080"}}>
                    <FontAwesomeIcon icon={faBars}/>
                </Col>
                <Col className="menu-options" style={{display:isOpen?"block":"none"}} 
                    lg={{span:8}} md={{span:8}}
                        sm={{span:12}} xs={{span:12}}>
                    <ul className="navbar-nav">
                        {
                            configureNavLinks(props.role)
                        }
                    </ul>
                </Col>
               
            </nav>
        </>
    )
    
}
function configureNavLinks(role:RoleType){
    return getRolePaths(role).map(navEl=>{
                return ( 
                <NavLink to={navEl.path} 
                    className={({ isActive }) => isActive ? "nav-active nav-link-style p-1" : "nav-link-style p-1"}>
                 {
                    navEl.icon && <FontAwesomeIcon icon={navEl.icon}/>
                 }
                 {
                    " "+navEl.name
                 }
                </NavLink>
                )
                
            });
        
    
}

function getRolePaths(role:RoleType):{
    name:string;
    path:string;
    icon?:any;
}[]{
    switch(role){
        case "workman":
            return [{
                name:"Altera ponuda",
                path:"/workman/offer",
                icon:faBurger
            },{
                name:"Korpa",
                path:"/workman/cart",
                icon:faShoppingCart
            },{
                name:"Info",
                path:"/workman/info",
                icon:faInfo
            },
            {
                name:"Izloguj se",
                path:"/workman/logout",
                icon:faRightFromBracket
            }
        ];
        case "administrator":
            return [];
        default :
            return [{
                name:"Registrer",
                path:"/register",
                icon:faUsers
            },{
                name:"Login",
                path:"/login",
                icon:faRightToBracket
            }]
    }
}

