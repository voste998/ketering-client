import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import photo from "../login/kuvar.png"
import "./Footer.css";
import { faEnvelope, faLocationDot, faMarker, faPhone } from "@fortawesome/free-solid-svg-icons";

export function Footer(){
    return (<>
        <div className="footer-head">
            <div>Povezite se sa nama na drustvenim mrezama:</div>
           
            <div>
                <a href="https://www.instagram.com/cito.rentacar/" className="" 
                    target="_blank" rel="noopener">
                </a>
            </div>
        </div>
        <div className="footer-holder">
            <div className="foot-info-box">
                <h5>Altera Ketering</h5>
                <p>
                    .
                </p>
            </div>
            <div className="foot-info-box">
                <h5>Info</h5>
                <p>
                    <FontAwesomeIcon icon={faPhone}/> 065 928 212 <br/>
                </p>
                <p>
                    <FontAwesomeIcon icon={faEnvelope}/> AlteraKetering@gmail.com <br/>
                </p>
                <p>
                    <FontAwesomeIcon icon={faLocationDot}/> Naziv neke ulice 77<br/>
                </p>
            </div>
            <div className="foot-info-box">
                <h5>Info</h5>
                <p>
                    <FontAwesomeIcon icon={faPhone}/> 065 928 212 <br/>
                </p>
                <p>
                    <FontAwesomeIcon icon={faEnvelope}/> AlteraKetering@gmail.com <br/>
                </p>
                <p>
                    <FontAwesomeIcon icon={faLocationDot}/> Naziv neke ulice 77<br/>
                </p>
            </div>
            <div className="foot-photo">
            <img src={photo}/>
            </div>
        </div>
        </>
    );
}