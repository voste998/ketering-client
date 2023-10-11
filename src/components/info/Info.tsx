import { Col, Row } from "react-bootstrap";
import "./Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCalendarDay, faCheck, faCircleInfo, faEnvelope, faFileSignature, faIndustry, faInfo, faInfoCircle, faKey, faLocation, faSignature, faUser, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import ApiResponse from "../../misc/api.response.class";
import { days } from "../../misc/day.type";
import { RoleContext } from "../app/App";
import { useNavigate } from "react-router-dom";
export function Info(){

    const [status,setStatus]=useState<"logout"|"logedin">("logedin");
    const [info,setInfo]=useState<Workman>();
    const [companyDays,setDays]=useState<CompanyDays>({});

    const navigate=useNavigate();

    useEffect(()=>{
        api("api/workman/info","get","workman",undefined).then(res=>infoHandler(res));
    },[])

    const setRole=useContext(RoleContext);

    useEffect(()=>{
        if(status==="logout"){
            setRole(undefined);
            navigate("/login");   
        }

    },[status]);

    return(<>
    <Row>
        <Col lg={{span:6,offset:3}} md={{span:8,offset:2}} sm={{span:8,offset:2}} className="info-holder">
            <div className="mt-4">
                <div className="p-3"><FontAwesomeIcon icon={faInfoCircle}/> Informacije o kompaniji</div>
                <div>
                    <FontAwesomeIcon icon={faBuildingColumns}/>
                </div>
                <div className="p-2">
                    <FontAwesomeIcon icon={faKey}/> Id: {info?.company?.companyId} <br/>
                    <FontAwesomeIcon icon={faSignature}/> Naziv kompanije: {info?.company?.name}<br/>
                    <FontAwesomeIcon icon={faUsers}/> Broj radnika: {info?.company?.workpeople}<br/>
                    <FontAwesomeIcon icon={faLocation}/> Adresa: {info?.company?.address}

                </div>
                <div className=" p-2">
                    <FontAwesomeIcon icon={faCalendarDay}/> Dozvoljeni dani za obroke:
                </div>
                <div className=" p-2">
                    {
                        Object.keys(days).map(day=>{
                            let toNumb:0|1|2|3|4|5|6=Number(day) as any;
                            return <p><FontAwesomeIcon color={companyDays[toNumb]?"#d0d0d0":"#dc0101"} icon={companyDays[toNumb]?faCheck:faXmark}/> {days[toNumb]}</p>
                        })
                    } 
                </div>
                
            </div>
            <div className="mt-4 mb-4">
                <div className="p-3"><FontAwesomeIcon icon={faCircleInfo}/>  Informacije o radniku</div>
                <div><FontAwesomeIcon icon={faUser}/></div>
                <div className="p-2">
                    <FontAwesomeIcon icon={faKey}/> Id: {info?.workmanId}<br/>
                    <FontAwesomeIcon icon={faFileSignature}/> Ime: {info?.name}<br/>
                    <FontAwesomeIcon icon={faFileSignature}/> Prezime: {info?.lastname}<br/>
                    <FontAwesomeIcon icon={faEnvelope}/> Email: {info?.email}<br/>
                </div>
            </div>
        </Col>
    </Row>
    </>)
    function infoHandler(res:ApiResponse){
        if(res.status==="ok"){
            const response=res.data as Workman;
            setInfo({...response});

            const companyDays:CompanyDays={};

            response.company.companyDays.forEach(companyDay=>{
                companyDays[Number(companyDay.day)]=true;
            });
            setDays(companyDays);  
            return;
        }
        if(res.status==="login"){
            setStatus("logout");
            return;
        }
    }
}

interface Workman{
    workmanId:number;
    name:string;
    lastname:string;
    email:string;
    company:Company;
}
interface Company{
    companyId:number;
    name:string;
    workpeople:number;
    address:string;
    companyDays:{
        day:string;
        companyDayId:number;
    }[];
}
interface CompanyDays{
    [key:number]:boolean;
}
