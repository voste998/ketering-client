import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cart } from "./MyCart";
import "./MyCart.css";
import { faBurger, faCalendarDay, faKey } from "@fortawesome/free-solid-svg-icons";
import { days } from "../../misc/day.type";

export interface MyCartTableProps{
    cart:Cart;
}
export function MyCartTable(props:MyCartTableProps){

    return (
        <><div className="mt-3">
        <div className="p-2">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th><FontAwesomeIcon icon={faCalendarDay}/> Dan</th>
                        <th><FontAwesomeIcon icon={faKey}/></th>
                        <th><FontAwesomeIcon icon={faBurger}/> Jelo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        configureTableRows(props.cart)
                    }
                </tbody>
            </table>
        </div> 
    </div>
    </>
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
            </tr>;

        });
        return tableRows.filter(el=>{
            return el!==undefined;
        })
    }
}