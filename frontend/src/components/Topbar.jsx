export default function Topbar() {

    const today = new Date().toLocaleDateString();

    return (

        <div
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                borderBottom: "1px solid #ddd",
                boxShadow: "0 1px 3px rgba(0,0,0,.08)"
            }}
        >

            <div>

                <h2
                    style={{
                        margin: 0,
                        color: "#b30000"
                    }}
                >
                    Saint Isidore High School Ndop
                </h2>

                <small>
                    Educating the Mind and Heart
                </small>

            </div>

            <div
                style={{
                    textAlign: "right"
                }}
            >

                <strong>Principal</strong>

                <br />

                Mr. Roland Teim

                <br />

                <small>{today}</small>

            </div>

        </div>

    );

}
