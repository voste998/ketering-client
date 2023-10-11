import { Col, Row } from "react-bootstrap";
import "./MyCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCartFlatbed, faCartPlus, faHistory, faTruck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState,useContext } from "react";
import api from "../../api/api";
import ApiResponse from "../../misc/api.response.class";
import { MyCartTable } from "./MyCartTable";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../app/App";
import { Calendar } from "../calendar/Calendar";

interface MyCartState{
    cart:Cart|undefined;
    error:string|undefined;
}
export function MyCart(){
    const navigation=useNavigate();
    const setRole=useContext(RoleContext);
    const [loginStatus,setLoginStatus]=useState<"logout"|"logedin">("logedin");

    const [status,setStatus]=useState<"previous"|"current"|"next">("next");

    const [myCart,setMyCart]=useState<MyCartState>({
        cart:undefined,
        error:undefined
    })

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
    <div>    
            <div className="my-cart">
                <div className="my-cart-holder">
                    <div className="carts-menu"> 
                        <div id="cart-backward" className="switch-cart" onClick={e=>switchCart(e)}><FontAwesomeIcon icon={faArrowAltCircleLeft}/></div>
                        <div id="previous" className={status==="previous"?"is-active-my-carts":"non-active-my-carts"} 
                                        onClick={(e=>menuNav(e))}><FontAwesomeIcon icon={faHistory}/> Predhodna korpa </div>
                        <div id="current" className={status==="current"?"is-active-my-carts":"non-active-my-carts"}
                                        onClick={(e=>menuNav(e))}><FontAwesomeIcon icon={faCartFlatbed}/> U toku isporuka </div>
                        <div id="next" className={status==="next"?"is-active-my-carts":"non-active-my-carts"}
                                        onClick={(e=>menuNav(e))}> <FontAwesomeIcon icon={faCartPlus}/> Otvorena korpa </div>
                        <div id="cart-forward" className="switch-cart" onClick={e=>switchCart(e)}><FontAwesomeIcon  icon={faArrowAltCircleRight}/></div>
                    </div>
                    {
                        myCart.cart ? <MyCartTable cart={myCart.cart}/>:
                            !myCart.error?<div className="empty-cart-info mt-3"><h3><strong>Korpa je prazna</strong></h3></div>:
                                <div style={{alignSelf:"self-start"}} className="mt-3 alert alert-danger" role="alert">
                                    {myCart.error}
                                </div>
                        
                    }
                </div>
                <div className="my-cart-info">
                     <div className="info-cart">
                        {
                            status==="previous"?<FontAwesomeIcon icon={faHistory}/>:
                                status==="current"?<FontAwesomeIcon icon={faCartFlatbed}/>:
                                    <FontAwesomeIcon icon={faCartPlus}/>
                        }
                     </div>
                     <p className="mt-3 delivery-start"><FontAwesomeIcon icon={faTruck}/> Pocetak isporuke: Ponedeljak 
                            {
                                deliveryDate(myCart.cart?.createdAt)
                            }
                    </p>
                    {
                        myCart.cart?<Calendar date={myCart.cart.createdAt}/>:<></>
                    }
                    
                </div>
            </div>
    </div>
    </>);
    function switchCart(e:React.MouseEvent<HTMLDivElement>){

        let id=e.currentTarget.id;
        setStatus(prev=>{
            switch(prev){
                case "previous":
                    return id==="cart-forward"?"current":"next";
                case "current":
                    return id==="cart-forward"?"next":"previous";
                case "next":
                    return id==="cart-forward"?"previous":"current";
            }
        })
    }
    function menuNav(e:React.MouseEvent<HTMLDivElement>){
        setStatus(e.currentTarget.id as any);
    }

    function cartHandler(res:ApiResponse){
        if(res.status==="ok"){
            setMyCart({
                cart:res.data,
                error:undefined
            });
            return;
        }
        if(res.status==="login"){
            setLoginStatus("logout");
            return;
        }
        setMyCart({
            cart:undefined,
            error:"Doslo je do greske,proverite internet konekciju!"
        })
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