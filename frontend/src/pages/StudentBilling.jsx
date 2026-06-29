import { useEffect, useState } from "react";
import axios from "axios";

const STUDENT_API = "https://api.sihs.online/api/students";
const BILL_API = "https://api.sihs.online/api/student-bills";

export default function StudentBilling() {

    const [students,setStudents]=useState([]);
    const [bills,setBills]=useState([]);

    const [form,setForm]=useState({
        student_id:"",
        academic_year:"",
        term:"Term 1"
    });

    useEffect(()=>{
        loadStudents();
        loadBills();
    },[]);

    async function loadStudents(){

        try{
            const res=await axios.get(STUDENT_API);
            setStudents(res.data);
        }catch(e){
            console.log(e);
        }

    }

    async function loadBills(){

        try{
            const res=await axios.get(BILL_API);
            setBills(res.data);
        }catch(e){
            console.log(e);
        }

    }

    async function generateBill(){

        try{

            await axios.post(BILL_API,form);

            alert("Student Bill Generated");

            loadBills();

        }catch(e){

            console.log(e);

            alert("Unable to generate bill");

        }

    }

    return(

        <div style={{padding:"30px"}}>

            <h1 style={{color:"#8B0000"}}>

                Student Billing

            </h1>

            <div
                style={{
                    background:"#fff",
                    padding:"20px",
                    borderRadius:"10px",
                    marginTop:"20px"
                }}
            >

                <select
                    value={form.student_id}
                    onChange={(e)=>setForm({...form,student_id:e.target.value})}
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

                <input
                    placeholder="Academic Year"
                    value={form.academic_year}
                    onChange={(e)=>setForm({...form,academic_year:e.target.value})}
                />

                <br/><br/>

                <select
                    value={form.term}
                    onChange={(e)=>setForm({...form,term:e.target.value})}
                >

                    <option>Term 1</option>
                    <option>Term 2</option>
                    <option>Term 3</option>

                </select>

                <br/><br/>

                <button
                    onClick={generateBill}
                    style={{
                        background:"#8B0000",
                        color:"#fff",
                        padding:"12px 20px",
                        border:"none",
                        borderRadius:"6px"
                    }}
                >
                    Generate Bill
                </button>

            </div>

            <table
                style={{
                    width:"100%",
                    marginTop:"30px",
                    borderCollapse:"collapse"
                }}
            >

                <thead
                    style={{
                        background:"#8B0000",
                        color:"#fff"
                    }}
                >

                    <tr>

                        <th>ID</th>
                        <th>Student</th>
                        <th>Academic Year</th>
                        <th>Term</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                {bills.map(bill=>(

                    <tr key={bill.id}>

                        <td>{bill.id}</td>

                        <td>{bill.student?.name}</td>

                        <td>{bill.academic_year}</td>

                        <td>{bill.term}</td>

                        <td>{Number(bill.total_amount).toLocaleString()} FCFA</td>

                        <td>{Number(bill.amount_paid).toLocaleString()} FCFA</td>

                        <td>{Number(bill.balance).toLocaleString()} FCFA</td>

                        <td>{bill.status}</td>

                    </tr>

                ))}

                {bills.length===0 &&

                    <tr>

                        <td
                            colSpan="8"
                            style={{textAlign:"center"}}
                        >

                            No Student Bills Generated

                        </td>

                    </tr>

                }

                </tbody>

            </table>

        </div>

    );

}
