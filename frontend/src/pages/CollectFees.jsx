import { useEffect, useState } from "react";
import axios from "axios";

const STUDENTS_API = "https://api.sihs.online/api/students";
const PAYMENT_API = "https://api.sihs.online/api/fee-collections";

export default function CollectFees() {

    const [students, setStudents] = useState([]);

    const [payment, setPayment] = useState({
        student_id: "",
        amount: "",
        payment_method: "Cash",
        reference: ""
    });

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        try {
            const res = await axios.get(STUDENTS_API);
            setStudents(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function receivePayment() {

        try {

            await axios.post(PAYMENT_API, payment);

            alert("Payment Successfully Received");

            setPayment({
                student_id: "",
                amount: "",
                payment_method: "Cash",
                reference: ""
            });

        } catch (e) {

            console.log(e);

            alert("Unable to receive payment.");

        }

    }

    return (

        <div style={{padding:"30px"}}>

            <h1 style={{color:"#8B0000"}}>

                Collect School Fees

            </h1>

            <div
                style={{
                    background:"#fff",
                    padding:"25px",
                    borderRadius:"10px",
                    maxWidth:"700px",
                    marginTop:"20px"
                }}
            >

                <label>Student</label>

                <br/>

                <select
                    value={payment.student_id}
                    onChange={(e)=>setPayment({...payment,student_id:e.target.value})}
                    style={{width:"100%",padding:"10px"}}
                >

                    <option value="">Select Student</option>

                    {students.map(student=>(

                        <option
                            key={student.id}
                            value={student.id}
                        >
                            {student.name}
                        </option>

                    ))}

                </select>

                <br/><br/>

                <label>Amount Paid</label>

                <br/>

                <input
                    type="number"
                    value={payment.amount}
                    onChange={(e)=>setPayment({...payment,amount:e.target.value})}
                    style={{width:"100%",padding:"10px"}}
                />

                <br/><br/>

                <label>Payment Method</label>

                <br/>

                <select
                    value={payment.payment_method}
                    onChange={(e)=>setPayment({...payment,payment_method:e.target.value})}
                    style={{width:"100%",padding:"10px"}}
                >

                    <option>Cash</option>
                    <option>Mobile Money</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>

                </select>

                <br/><br/>

                <label>Reference Number</label>

                <br/>

                <input
                    value={payment.reference}
                    onChange={(e)=>setPayment({...payment,reference:e.target.value})}
                    style={{width:"100%",padding:"10px"}}
                />

                <br/><br/>

                <button

                    onClick={receivePayment}

                    style={{

                        background:"#8B0000",

                        color:"#fff",

                        border:"none",

                        padding:"14px 30px",

                        borderRadius:"6px",

                        cursor:"pointer"

                    }}

                >

                    Receive Payment

                </button>

            </div>

        </div>

    );

}
