import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cart } from "./MyCart";
import "./MyCart.css";
import { faBurger, faCalendarDay, faKey, faRecycle, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { days } from "../../misc/day.type";
import api from "../../api/api";

export interface MyCartTableProps{
    cart:Cart;
}
export function MyCartTable(props:MyCartTableProps){

    return (
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th><FontAwesomeIcon icon={faCalendarDay}/> Dan</th>
                        <th><FontAwesomeIcon icon={faKey}/></th>
                        <th><FontAwesomeIcon icon={faBurger}/> Jelo</th>
                        {props.cart.status==="next" && <th className="text-center"><FontAwesomeIcon icon={faRecycle}/> Izbaci</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        configureTableRows(props.cart)
                    }
                </tbody>
            </table>
    );
    function configureTableRows(cart:Cart){
        const tableRows=new Array(7);
        tableRows.fill(undefined);
        cart.mealCarts.forEach(mealCart=>{
            
            let toNumb:0|1|2|3|4|5|6=Number(mealCart.meal.day) as any;
            
            tableRows[(toNumb-1+7)%7]=<tr>
                <td>{days[toNumb]}</td>
                <td>{mealCart.meal.mealId}</td>
                <td>{mealCart.meal.name}</td>
                {
                cart.status==="next" && <td className="text-center">
                                                <FontAwesomeIcon className="delete-my-meal" id={mealCart.mealCartId+""} 
                                                        icon={faXmarkCircle} onClick={e=>deleteMeal(e)}/>
                                        </td>
                }
            </tr>;

        });
        return tableRows.filter(el=>{
            return el!==undefined;
        })
    }
    function deleteMeal(e:React.MouseEvent<SVGSVGElement>){
        const mealCartId=e.currentTarget.id;

        api("api/cart/deleteCartMeal/"+mealCartId,"delete","workman",undefined).then(res=>{
            console.log(res);
        })
    }
}