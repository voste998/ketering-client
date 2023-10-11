import { Button, Form } from "react-bootstrap";
import "./NewCompany.css";
import { useState } from "react";
import { days } from "../../misc/day.type";
import api from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function NewCompany(){
    const [newCompany,setNewCompany]=useState<NewCompany>(newCompanyDefault);

    return (<>
        <div className="new-company-container">
            <div className="new-company p-4">
                <div className="new-comp-header p-2 mb-1">Nalog za kompaniju</div>
                <Form.Label htmlFor="name">Naziv kompanije:</Form.Label>
                <Form.Control type="text" onChange={(e)=>newCompanyData(e as any)}
                        value={newCompany.name} id="name"/>
                <Form.Label htmlFor="password">Lozinka:</Form.Label>
                <Form.Control type="password" onChange={(e)=>newCompanyData(e as any)}
                        value={newCompany.password} id="password"/>
                <Form.Label htmlFor="confirmPassword">Potvrdi lozinku:</Form.Label>
                <Form.Control type="password" onChange={(e)=>newCompanyData(e as any)}
                        value={newCompany.confirmPassword} id="confirmPassword"/>
                <Form.Label htmlFor="workpeple">Broj radnika:</Form.Label>
                <Form.Control type="number" onChange={(e)=>newCompanyData(e as any)}
                        value={newCompany.workpeople} step={1} min={1} id="workpeople"/>
                <Form.Label htmlFor="address">Adresa:</Form.Label>
                <Form.Control type="text" onChange={(e)=>newCompanyData(e as any)}
                        value={newCompany.address} id="address"/>
                <Form.Label>Dozvoljeni dani za obroke:</Form.Label>
                {
                    Object.keys(days).map(day=>{
                        return <Form.Check type="checkbox" 
                                id={day} label={days[toDayNumb(day)]} onChange={e=>checkDay(e)}/>
                    })
                }
                {
                    newCompany.error && <div className="alert alert-warning new-company-info" role="alert">
                    { newCompany.error }
                    </div>
                }
                <Button className="btn btn-primary form-control" onClick={()=>createNewCompany()}>Sacuvaj</Button>

            </div>
        </div>
    </>)
    function newCompanyData(e:React.ChangeEvent<HTMLInputElement>){
        setNewCompany(prev=>{
            return {
                ...prev,[e.target.id]:e.target.value
            }
        })
    }
    function checkDay(e:React.ChangeEvent<HTMLInputElement>){
            console.log(e.target.checked)
        setNewCompany(prev=>{
            let newCompDays=[...prev.companyDays];
            newCompDays[Number(e.target.id)]=e.target.checked;
            return {
                ...prev,companyDays:newCompDays
            }
        })
    }
    function createNewCompany(){
        if(newCompany.confirmPassword!==newCompany.password){
            setNewCompany(prev=>{
                return {
                    ...prev,
                    password:"",
                    confirmPassword:"",
                    error:"Lozinke se ne poklapaju,unesite ponovo!"
                }
            });
            return;
        }
        const addCompanyDto={
            name:newCompany.name,
            password:newCompany.password,
            workpeople:newCompany.workpeople,
            address:newCompany.address,
            companyDays:newCompany.companyDays.map((day,index)=>{
                if(!day){
                    return;
                }
                return index+""
            })
        };
        api("api/company/createNew","post","workman",addCompanyDto).then(res=>{
            if(res.status==="ok"){
                if(res.data.statusCode){
                    switch(res.data.statusCode){
                        case -1002:
                            return setNewCompany(prev=>{
                                return {
                                    ...prev,error:"Kompanija sa ovim nazivom vec postoji!"
                                }
                            });
                    }
                }
                console.log(res.data);
                return;
            }
            if(res.status==="error"){
                return setNewCompany(prev=>{
                    return {
                        ...prev,error:"Doslo je do greske,provjerite internet konekciju!"
                    }
                });
            }
            
        })

        

    }
    
}
function toDayNumb(dayStr:string):0|1|2|3|4|5|6{
    return Number(dayStr) as any;
}
interface NewCompany{
    name:string;
    password:string;
    confirmPassword:string;
    workpeople:string;
    address:string;
    companyDays:Array<boolean>;
    error:string|undefined;
}
const newCompanyDefault={
    name:"",
    password:"",
    confirmPassword:"",
    workpeople:"1",
    address:"",
    companyDays:new Array(7).fill(false),
    error:undefined
    
}