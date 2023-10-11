import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { photosUrl } from "../../config/photo.config";
import "./MealCard.css";
import { faCalendarDays, faCartPlus, faCommentDots, faEllipsis, faMugHot, faSignature, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { days } from "../../misc/day.type";
import { useState } from "react";
import api from "../../api/api";
export function MealCard(props:{ data:MealCardData }){
    const [info,setInfo]=useState<string|undefined>(undefined);

    return(
        <div className="meal-card-holder m-2">
            <p className="meal-card-name">
                <FontAwesomeIcon icon={faSignature}/> {props.data.name}
            </p>
            <img width={"100%"} src={photosUrl+"/edited/"+props.data.imagePath}/>
            <p className="meal-card-description  p-2 m-2" onClick={expandDescription}>
                {props.data.description.slice(0,80)+".."} <FontAwesomeIcon icon={faCommentDots}/>
            </p>
            <p className="description-expand" onClick={e=>closeDescription(e)}>{props.data.description}</p>
            <div className="meal-card-details mb-2">
                {
                    info?<p className="add-meal-error" role="alert">{info}</p>:<></>
                }
                <div><FontAwesomeIcon icon={faCalendarDays}/> Dan:{toDay(props.data.day)}</div>
                <div><FontAwesomeIcon icon={faMugHot}/> Ponuda: {props.data.offer==="constant"?"Stalna":"Izmjenjiva"}</div>
            </div>
            <div className="card-meal-footer">
                <div className="m-2 p-2" tabIndex={0} onClick={e=>addInCart(e)}>
                    Dodaj <FontAwesomeIcon icon={faCartPlus}/> 
                </div>
            </div>

        </div>
    )
    function expandDescription(e:React.MouseEvent<HTMLElement>){
        (e.currentTarget.nextElementSibling as HTMLElement).style.display="flex";
    }
    function closeDescription(e:React.MouseEvent<HTMLElement>){
        e.currentTarget.style.display="none";
    }
    function toDay(dayNumb:string){
        const numb:0|1|2|3|4|5|6=Number(dayNumb) as any;
        return days[numb];
    }
    function addInCart(e:React.MouseEvent<HTMLDivElement>){
        e.currentTarget.focus();
        setInfo(undefined);
        api("api/cart/addMeal","post","workman",{mealId:props.data.mealId}).then(res=>{
    
            if(res.status==="ok"){
                if(res.data.statusCode){
                    switch(res.data.statusCode){
                        case -6001:
                            return setInfo("Jelo nije dostupno!");
                        case -5001:
                            return setInfo("Ne postoji otvorena korpa!");
                    }
                }
                return setInfo("Obrok je uspesno dodan u korpu.");
            }
            if(res.status==="error"){
                if(res.data.response?.data.statusCode===500){
                    return setInfo("Nemate pristup jelima za ovaj dan!");
                }
                return setInfo("Doslo je do greske,proverite internet konekciju!");
            }
               

        });
    }
}

export interface MealCardData{
    mealId:number;
    name:string;
    offer:string;
    day:string;
    description:string;
    photoId:number;
    imagePath:string;
}