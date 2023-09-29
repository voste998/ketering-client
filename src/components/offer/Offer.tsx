import { Col, Row } from "react-bootstrap";
import "./Offer.css";
import { DayType, days } from "../../misc/day.type";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight, faArrowDown19, faArrowRight, faCartArrowDown, faCartShopping, faInfoCircle, faSquareCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { OfferType } from "../../misc/offer.type";
import api from "../../api/api";
import ApiResponse from "../../misc/api.response.class";
import { MealCard, MealCardData } from "../meal_card/MealCard";
import { RoleContext } from "../app/App";
import { useNavigate } from "react-router-dom";

export function Offer(){
    const [day,setDay]=useState<DayType>(1);
    const [offer,setOffer]=useState<OfferType>("none");

    const [meals,setMeals]=useState<MealCardData[]>([]);
    const [status,setStatus]=useState<"logout"|"logedin">("logedin");

    const [workmanInfo,setInfo]=useState<PlainInfo>();

    const navigate=useNavigate();

    const setRole=useContext(RoleContext);

    useEffect(()=>{
        if(status==="logout"){
            setRole(undefined);
            navigate("/login");
        }
    },[status]);
    
    useEffect(()=>{
        api("api/workman/plainInfo","get","workman",undefined)
            .then(res=>plainInfoHandler(res));
    },[])

    useEffect(()=>{
        api("api/meal/mealFilter","post","workman",{
            day:day+"",
            offer:offer==="none"?undefined:offer
        }).then(res=>mealResultsHandler(res));

    },[day,offer]);

    return(
        <>
        <Row>
            <Col lg={{span:6,offset:1}}>
                <div id="day-menu">
                    <div id="backward" className="change-day" onClick={e=>selectDay(e)}><FontAwesomeIcon icon={faArrowCircleLeft}/></div>
                    {
                       Object.keys(days).map((value,index)=>{
                            let toNumb:DayType=Number(value) as any;
                            return <div className={getClass(toNumb,day)}
                                            onClick={()=>setDay(toNumb)}>{days[toNumb]}</div>
                       })
                    }
                    <div id="forward" className="change-day" onClick={e=>selectDay(e)}><FontAwesomeIcon icon={faArrowCircleRight}/></div>
                </div>
                <div id="offer-menu" className="pt-2">
                    <div className="offer-nav m-2"><FontAwesomeIcon icon={faSquareCheck}/> Ponuda:</div>
                    <div className={getOfferClass(offer,"none")} onClick={()=>setOffer("none")}>Sve</div>
                    <div className={getOfferClass(offer,"constant")} onClick={()=>setOffer("constant")}>Stalna</div>
                    <div className={getOfferClass(offer,"exchangeable")} onClick={()=>setOffer("exchangeable")}>Izmjenjiva</div>
                </div>
                <div className="row mt-2">
                    {
                        meals.map(meal=>{
                            return <Col lg={{span:6}} md={{span:6}} className="p-2">
                                <MealCard data={meal}></MealCard>
                            </Col>
                        })
                    }
                </div>
            </Col>
            <Col className="option-info" lg={{span:4}}>
                <div className="cart-nav mt-4">
                    <div>
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </div>
                </div>
                <div className="offer-workman-info mt-4">
                    <div className="p-3"><FontAwesomeIcon icon={faInfoCircle}/> Informacije o radniku</div>
                    <div className="pt-2 pb-2"><FontAwesomeIcon icon={faUser}/></div>
                    <div className="pt-2 pb-2">
                        <ul>
                            <li>Naziv firme: {workmanInfo?.companyName}</li>
                            <li>Ime: {workmanInfo?.name}</li>
                            <li>Prezime: {workmanInfo?.lastname}</li>
                            <li>Email: {workmanInfo?.email}</li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
        </>
    )
    function selectDay(e:React.MouseEvent<HTMLDivElement>){
        switch(e.currentTarget.id){
            case "backward":
                return setDay(prev=>{
                    return (7+prev-1)%7 as any;
                });
            default:
                return setDay(prev=>{
                    return (prev+1)%7 as any;
                })
        }
    }
    function getClass(day:number,currentDay:number){
        return day===currentDay?"is-active pb-2 pt-2":"non-active pb-2 pt-2";
    }
    function getOfferClass(offer:OfferType,currenOffer:OfferType){
        return offer===currenOffer?"offer-option-active m-2":"offer-option m-2";
    }
    function mealResultsHandler(res:ApiResponse){
        if(res.status==="login"){
            setStatus("logout");
            return;
        }
        if(res.status==="error"){
            return;
        }
        setMeals(res.data);
    }
    function plainInfoHandler(res:ApiResponse){
        if(res.status==="login"){
            setStatus("logout");
            return;
        }
        if(res.status==="error"){
            return;
        }
        setInfo(res.data);
    }
}

interface PlainInfo{
    name:string;
    lastname:string;
    companyName:string;
    email:string;
}