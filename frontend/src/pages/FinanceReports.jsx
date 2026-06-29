import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.sihs.online/api/finance-reports";

export default function FinanceReports() {

    const [report, setReport] = useState({
        total_collected: 0,
        outstanding: 0,
        total_students: 0,
        paid_students: 0,
        unpaid_students: 0
    });

    useEffect(() => {
        loadReport();
    }, []);

    async function loadReport() {
        try {
            const res = await axios.get(API);
            setReport(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    function Card(title, value, color) {
        return (
            <div
                style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    borderLeft: `6px solid ${color}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,.15)"
                }}
            >
                <h3>{title}</h3>
                <h2 style={{ color }}>{value}</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: 30 }}>

            <h1 style={{ color: "#8B0000" }}>
                Finance Reports
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                    gap: 20,
                    marginTop: 30
                }}
            >

                {Card(
                    "Total Collected",
                    Number(report.total_collected).toLocaleString() + " FCFA",
                    "#198754"
                )}

                {Card(
                    "Outstanding Fees",
                    Number(report.outstanding).toLocaleString() + " FCFA",
                    "#dc3545"
                )}

                {Card(
                    "Students",
                    report.total_students,
                    "#0d6efd"
                )}

                {Card(
                    "Paid Students",
                    report.paid_students,
                    "#198754"
                )}

                {Card(
                    "Unpaid Students",
                    report.unpaid_students,
                    "#dc3545"
                )}

            </div>

            <div
                style={{
                    marginTop: 40,
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap"
                }}
            >

                <button>Daily Report</button>

                <button>Monthly Report</button>

                <button>Annual Report</button>

                <button>Outstanding Fees</button>

                <button>Export Excel</button>

                <button>Export PDF</button>

            </div>

        </div>
    );

}
