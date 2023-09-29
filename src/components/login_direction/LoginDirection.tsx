import { Col, Row } from "react-bootstrap";
import "./LoginDirection.css";

export function LoginDirection(){
    return(
        <Row>
            <Col lg={{span:6,offset:3}}>
                <div className="alert alert-success mt-2" role="alert">
                    Uspjesno ste se ulogovali u aplikaciju Altera ketering.<br/>
                    Prije nego sto nastavite koristenje aplikacije,<br/>proverjerite email da bi potvrdili da ste to vi.
                </div>
            </Col>
        </Row>
    )
}