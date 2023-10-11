import { days } from "../../misc/day.type";
import "./Calendar.css";

interface CalendarProps {
    date: string;
}

export function Calendar(props: CalendarProps) {
    
    const date = new Date(props.date);
    date.setDate(date.getDate() + 8);

    let deliveryDate=date.getDate();
    let monthNumbOfDays=new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let monthFirstDay= new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    
    let dates=[];
    for (let i = 1; i <= monthNumbOfDays; i++)
        dates.push(<div className={deliveryDate===i?"cal-date focus-date":"cal-date"}>{i}</div>);

        
    return (
        <>  
            
            <div className="calendar">
            <p className="text-center">{date.toDateString()}</p>
                <div className="cal-days">
                    {
                        Object.keys(days).map((day, index) => {
                            let dayNumb: 0 | 1 | 2 | 3 | 4 | 5 | 6 = (index) as any;
                            return <div>{days[dayNumb].slice(0, 3)}</div>
                        })
                    }
                </div>
                <div className="cal-dates" >
                    {
                        new Array(monthFirstDay).fill(<div></div>)
                    }
                    {
                        dates 
                    }
                </div>
            </div>
        </>
        );

}


