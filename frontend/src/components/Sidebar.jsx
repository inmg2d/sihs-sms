export default function Sidebar({ setPage }) {
    return (
        <div
            style={{
                width: "250px",
                background: "#b30000",
                color: "#fff",
                minHeight: "100vh",
                padding: "20px",
                boxSizing: "border-box",
                overflowY: "auto"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <img
                    src="/logo.jpeg"
                    alt="SIHS Logo"
                    style={{
                        width: "90px",
                        marginBottom: "10px"
                    }}
                />

                <h2
                    style={{
                        margin: 0,
                        fontSize: "18px"
                    }}
                >
                    SIHS
                </h2>

                <small>
                    Educating the Mind and Heart
                </small>
            </div>

            <MenuButton title="Dashboard" page="dashboard" setPage={setPage} />

            <hr />

            <h4>Academics</h4>

            <MenuButton title="Students" page="students" setPage={setPage} />

            <MenuButton title="Teachers" page="teachers" setPage={setPage} />

            <MenuButton title="Classes" page="classes" setPage={setPage} />

            <MenuButton title="Subjects" page="subjects" setPage={setPage} />

            <MenuButton title="Assignments" page="assignments" setPage={setPage} />

            <MenuButton title="Attendance" page="attendance" setPage={setPage} />

            <MenuButton title="Timetable" page="timetables" setPage={setPage} />

            <hr />

            <h4>Examinations</h4>

            <MenuButton title="Exams" page="exams" setPage={setPage} />

            <MenuButton title="Marks Entry" page="marks" setPage={setPage} />

            <MenuButton title="Report Cards" page="reportcard" setPage={setPage} />

            <hr />

            <h4>Administration</h4>

            <MenuButton title="Settings" page="settings" setPage={setPage} />
        </div>
    );
}

function MenuButton({ title, page, setPage }) {
    return (
        <button
            onClick={() => setPage(page)}
            style={{
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                border: "none",
                borderRadius: "6px",
                background: "#ffffff22",
                color: "#fff",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px"
            }}
        >
            {title}
        </button>
    );
}
