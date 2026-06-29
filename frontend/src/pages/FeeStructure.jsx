import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.sihs.online/api/fee-structures";
const CATEGORY_API = "https://api.sihs.online/api/fee-categories";
const CLASS_API = "https://api.sihs.online/api/classes";

export default function FeeStructure() {

    const [structures, setStructures] = useState([]);
    const [categories, setCategories] = useState([]);
    const [classes, setClasses] = useState([]);

    const [form, setForm] = useState({
        academic_year: "",
        term: "Term 1",
        school_class_id: "",
        fee_category_id: "",
        amount: ""
    });

    useEffect(() => {
        loadStructures();
        loadCategories();
        loadClasses();
    }, []);

    async function loadStructures() {
        try {
            const res = await axios.get(API);
            setStructures(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function loadCategories() {
        try {
            const res = await axios.get(CATEGORY_API);
            setCategories(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function loadClasses() {
        try {
            const res = await axios.get(CLASS_API);
            setClasses(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function saveStructure() {

        try {

            await axios.post(API, form);

            alert("Fee Structure Saved");

            setForm({
                academic_year: "",
                term: "Term 1",
                school_class_id: "",
                fee_category_id: "",
                amount: ""
            });

            loadStructures();

        } catch (e) {
            console.log(e);
            alert("Unable to save.");
        }

    }

    async function deleteStructure(id) {

        if (!window.confirm("Delete Fee Structure?")) return;

        await axios.delete(API + "/" + id);

        loadStructures();

    }

    return (

        <div style={{padding:"30px"}}>

            <h1 style={{color:"#8B0000"}}>
                Fee Structure
            </h1>

            <div
                style={{
                    background:"#fff",
                    padding:"20px",
                    borderRadius:"10px",
                    marginTop:"20px"
                }}
            >

                <input
                    placeholder="Academic Year (2026/2027)"
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

                <select
                    value={form.school_class_id}
                    onChange={(e)=>setForm({...form,school_class_id:e.target.value})}
                >
                    <option value="">Select Class</option>

                    {classes.map(c=>(
                        <option
                            key={c.id}
                            value={c.id}
                        >
                            {c.name}
                        </option>
                    ))}

                </select>

                <br/><br/>

                <select
                    value={form.fee_category_id}
                    onChange={(e)=>setForm({...form,fee_category_id:e.target.value})}
                >
                    <option value="">Fee Category</option>

                    {categories.map(c=>(
                        <option
                            key={c.id}
                            value={c.id}
                        >
                            {c.name}
                        </option>
                    ))}

                </select>

                <br/><br/>

                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e)=>setForm({...form,amount:e.target.value})}
                />

                <br/><br/>

                <button
                    onClick={saveStructure}
                    style={{
                        background:"#8B0000",
                        color:"#fff",
                        padding:"12px 25px",
                        border:"none",
                        borderRadius:"6px"
                    }}
                >
                    Save Fee Structure
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
                        <th>Academic Year</th>
                        <th>Term</th>
                        <th>Class</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>

                {structures.map(s=>(

                    <tr key={s.id}>

                        <td>{s.id}</td>
                        <td>{s.academic_year}</td>
                        <td>{s.term}</td>
                        <td>{s.school_class?.name}</td>
                        <td>{s.fee_category?.name}</td>
                        <td>{Number(s.amount).toLocaleString()} FCFA</td>

                        <td>

                            <button
                                onClick={()=>deleteStructure(s.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                {structures.length===0 &&

                    <tr>

                        <td
                            colSpan="7"
                            style={{
                                textAlign:"center"
                            }}
                        >
                            No Fee Structures Found
                        </td>

                    </tr>

                }

                </tbody>

            </table>

        </div>

    );

}
