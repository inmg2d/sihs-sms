import { useNavigate } from "react-router-dom";

export default function FinanceDashboard() {

    const navigate = useNavigate();

    return (

        <div style={{ padding: "30px" }}>

            <h1 style={{
                color: "#8B0000",
                marginBottom: "30px"
            }}>
                Finance & Bursary Dashboard
            </h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px"
            }}>

                <Card title="Students with Bills" value="0" />
                <Card title="Collected Today" value="0 FCFA" />
                <Card title="Outstanding" value="0 FCFA" />
                <Card title="Receipts Today" value="0" />

            </div>

            <h2 style={{
                marginTop: "50px"
            }}>
                Quick Actions
            </h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
                marginTop: "20px"
            }}>

                <Action
                    text="Fee Categories"
                    onClick={() => navigate("/finance/fee-categories")}
                />

                <Action
                    text="Fee Structure"
                    onClick={() => navigate("/finance/fee-structure")}
                />

                <Action
                    text="Student Billing"
                    onClick={() => navigate("/finance/student-billing")}
                />

                <Action
                    text="Collect Fees"
                    onClick={() => navigate("/finance/collect-fees")}
                />

                <Action
                    text="Receipts"
                    onClick={() => navigate("/finance/receipts")}
                />

                <Action
                    text="Finance Reports"
                    onClick={() => navigate("/finance/reports")}
                />

            </div>

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,.15)"
        }}>

            <h4>{title}</h4>

            <h2 style={{ color: "#8B0000" }}>
                {value}
            </h2>

        </div>

    );

}

function Action({ text, onClick }) {

    return (

        <button
            onClick={onClick}
            style={{
                padding: "18px",
                background: "#8B0000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
            }}
        >
            {text}
        </button>

    );

}
