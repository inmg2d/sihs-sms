import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.sihs.online/api/receipts";

export default function Receipts() {

    const [receipts, setReceipts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadReceipts();
    }, []);

    async function loadReceipts() {
        try {
            const res = await axios.get(API);
            setReceipts(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const filtered = receipts.filter(r =>
        (r.student?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (r.receipt_number || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ color: "#8B0000" }}>
                Payment Receipts
            </h1>

            <input
                placeholder="Search receipt or student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "350px",
                    padding: "10px",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            />

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff"
                }}
            >

                <thead
                    style={{
                        background: "#8B0000",
                        color: "#fff"
                    }}
                >
                    <tr>
                        <th>Receipt No.</th>
                        <th>Student</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {filtered.map(r => (

                        <tr key={r.id}>

                            <td>{r.receipt_number}</td>

                            <td>{r.student?.name}</td>

                            <td>{Number(r.amount).toLocaleString()} FCFA</td>

                            <td>{r.payment_method}</td>

                            <td>{r.created_at}</td>

                            <td>

                                <button>
                                    Print
                                </button>

                            </td>

                        </tr>

                    ))}

                    {filtered.length === 0 && (

                        <tr>

                            <td
                                colSpan="6"
                                style={{ textAlign: "center" }}
                            >
                                No receipts available.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}
