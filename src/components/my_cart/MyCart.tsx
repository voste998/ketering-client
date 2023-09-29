import { Col, Row } from "react-bootstrap";
import "./MyCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed, faCartPlus, faHistory, faTruck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState,useContext } from "react";
import api from "../../api/api";
import ApiResponse from "../../misc/api.response.class";
import { MyCartTable } from "./MyCartTable";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../app/App";

export function MyCart(){
    const navigation=useNavigate();
    const setRole=useContext(RoleContext);
    const [loginStatus,setLoginStatus]=useState<"logout"|"logedin">("logedin");

    const [status,setStatus]=useState<"previous"|"current"|"next">("next");
    const [cart,setCart]=useState<Cart>();
    
    const [error,setError]=useState<string>();


    useEffect(()=>{
        api("api/cart/workmanCart","post","workman",{
            status:status
        }).then(res=>cartHandler(res))
    },[status]);

    useEffect(()=>{
        if(loginStatus==="logout"){
            setRole(undefined);
            navigation("/login");
        }
    },[loginStatus]);


    return (<>
    <Row>
        <Col lg={{span:10,offset:1}} md={{span:10,offset:1}}>
            <div className="carts-menu">
                <div id="previous" className={status==="previous"?"is-active-my-carts":"non-active-my-carts"} 
                                onClick={(e=>menuNav(e))}><FontAwesomeIcon icon={faHistory}/> Predhodna korpa </div>
                <div id="current" className={status==="current"?"is-active-my-carts":"non-active-my-carts"}
                                onClick={(e=>menuNav(e))}><FontAwesomeIcon icon={faCartFlatbed}/> U toku isporuka </div>
                <div id="next" className={status==="next"?"is-active-my-carts":"non-active-my-carts"}
                                onClick={(e=>menuNav(e))}> <FontAwesomeIcon icon={faCartPlus}/> Otvorena korpa </div>
            </div>
            <div className="my-cart">
                {
                    cart ? <MyCartTable cart={cart}/>:
                        !error?<div className="empty-cart-info mt-3"><h3><strong>Korpa je prazna</strong></h3></div>:
                            <div style={{alignSelf:"self-start"}} className="mt-3 alert alert-danger" role="alert">
                                {error}
                            </div>
                    
                }
                <div className="my-cart-info">
                     <div className="mt-3">
                        {
                            status==="previous"?<FontAwesomeIcon icon={faHistory}/>:
                                status==="current"?<FontAwesomeIcon icon={faCartFlatbed}/>:
                                    <FontAwesomeIcon icon={faCartPlus}/>
                        }
                     </div>
                     <p className="mt-3"><FontAwesomeIcon icon={faTruck}/> Pocetak isporuke: Ponedeljak 
                            {
                                deliveryDate(cart?.createdAt)
                            }
                    </p>
                </div>
            </div>
        </Col>
    </Row>
    </>);

    function menuNav(e:React.MouseEvent<HTMLDivElement>){
        setStatus(e.currentTarget.id as any);
    }

    function cartHandler(res:ApiResponse){
        if(res.status==="ok"){
            setCart(res.data);
            setError(undefined);
            return;
        }
        if(res.status==="login"){
            setLoginStatus("logout");
            return;
        }
        setCart(undefined);
        setError("Doslo je do greske,proverite internet konekciju!");
    }
    
}
function deliveryDate(date:string|undefined){
    if(!date){
        return " nepoznato";
    }
    const deliveryDate=new Date(date);
    deliveryDate.setDate(deliveryDate.getDate()+8);
    
    return " "+deliveryDate.toISOString().slice(0,10);

}
export interface Cart{
    cartId:number,
    status:"current"|"next"|"previous",
    createdAt:string;
    mealCarts:MealCart[];
}
export interface MealCart{
    mealCartId:number;
    meal:Meal;
}
export interface Meal{
    mealId:number;
    day:"0"|"1"|"2"|"3"|"4"|"5"|"6";
    name:string;
}