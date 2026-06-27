export default function Dashboard() {

    return (

        <div style={{ padding: 30 }}>

            <h1
                style={{
                    color: "#b30000"
                }}
            >
                SIHS Dashboard
            </h1>

            <p>
                Welcome to the Saint Isidore High School Ndop
                School Management System.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <Card title="Students" value="1" />

                <Card title="Teachers" value="1" />

                <Card title="Subjects" value="5" />

                <Card title="Exams" value="2" />

            </div>

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div
            style={{
                background: "#fff",
                padding: 25,
                borderRadius: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,.1)"
            }}
        >

            <h2>{value}</h2>

            <p>{title}</p>

        </div>

    );

}
