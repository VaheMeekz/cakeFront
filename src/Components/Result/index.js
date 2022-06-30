import React,{useEffect,useState,useRef} from 'react';
import axios from "axios";
import keys, {IdramID, SecretKey} from "../../keys";
import {useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const Index = () => {
    const [data, setDate] = useState(null);
    const idram = useRef();
    let {id} = useParams();

    useEffect(() => {
        axios
            .post(`${keys.baseURI}/api/v1/orders/getSingle`, {
                id,
            })
            .then(function (response) {
                setDate(response.data);
                setTimeout(() => {
                    idram.current && idram.current.submit();
                }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div style={{
            width:"100%",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"

        }}>
            <div
                style={{
                    opacity: "0",
                }}
            >
                <div>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                {data && (
                    <form
                        action="https://banking.idram.am/Payment/GetPayment"
                        method="POST"
                        ref={idram}
                    >
                        <input type="hidden" name="EDP_LANGUAGE" value="AM"/>
                        <input type="hidden" name="SUCCESS_URL" value={`${keys.myUrl}/success`}/>
                        <input type="hidden" name="FAIL_URL" value={`${keys.myUrl}/fail`}/>
                        <input type="hidden" name="RESULT_URL" value={`${keys.myUrl}/`}/>
                        <input type="hidden" name="SECRET_KEY" value={SecretKey}/>
                        <input type="hidden" name="EDP_REC_ACCOUNT" value={IdramID}/>
                        <input
                            type="hidden"
                            id="title"
                            name="EDP_DESCRIPTION"
                            value={data.description}
                        />
                        <input
                            type="hidden"
                            id="payent_amount"
                            name="EDP_AMOUNT"
                            // value="10"
                            value={data.amount}
                        />
                        <input
                            type="hidden"
                            id="payment_num"
                            name="EDP_BILL_NO"
                            value={data.PaymentID}
                        />
                        <input
                            type="hidden"
                            name="EDP_EMAIL"
                            value="vaheemkrtchyan@gmail.com"
                        />
                        <input type="submit" value="submit"/>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Index;