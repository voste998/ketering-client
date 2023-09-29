import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { photosUrl } from "../../config/photo.config";
import "./MealCard.css";
import { faCalendarDays, faCartPlus, faCommentDots, faEllipsis, faMugHot, faSignature, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { days } from "../../misc/day.type";
import { useState } from "react";
export function MealCard(props:{ data:MealCardData }){
    const [error,setError]=useState<string>("sadasd");

    return(
        <div className="meal-card-holder m-2">
            <p className="p-3 meal-card-name">
                <FontAwesomeIcon icon={faSignature}/> {props.data.name}
            </p>
            <img width={"100%"} src={photosUrl+"/edited/"+props.data.imagePath}/>
            <p className="meal-card-description  p-2 m-2">
                {props.data.description.slice(0,80)+".."} <FontAwesomeIcon icon={faCommentDots}/>
            </p>
            <div className="meal-card-details p-2 mb-2">
                {
                    error && <p className="add-meal-error" role="alert"><FontAwesomeIcon icon={faTriangleExclamation}/>{" "+error}</p>
                }
                <div><FontAwesomeIcon icon={faCalendarDays}/> Dan:{toDay(props.data.day)}</div>
                <div><FontAwesomeIcon icon={faMugHot}/> Ponuda: {props.data.offer==="constant"?"Stalna":"Izmjenjiva"}</div>
            </div>
            <div className="card-meal-footer">
                <div className="m-2 p-2" tabIndex={0} onClick={e=>focus(e)}>
                    Dodaj <FontAwesomeIcon icon={faCartPlus}/> 
                </div>
            </div>

        </div>
    )
    function toDay(dayNumb:string){
        const numb:0|1|2|3|4|5|6=Number(dayNumb) as any;
        return days[numb];
    }
    function focus(e:React.MouseEvent<HTMLDivElement>){
        e.currentTarget.focus()
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