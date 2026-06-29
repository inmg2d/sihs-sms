import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            style={{
                width: "260px",
                background: "#8B0000",
                color: "#fff",
                minHeight: "100vh",
                padding: "20px",
                overflowY: "auto",
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                <img
                    src="/logo.jpeg"
                    alt="SIHS"
                    style={{
                        width: "90px",
                        marginBottom: "10px"
                    }}
                />

                <h2 style={{ margin: 0 }}>
                    SIHS ERP
                </h2>

                <small>
                    Saint Isidore High School Ndop
                </small>
            </div>

            <MenuLink title="Dashboard" to="/dashboard" />

            <Section title="ACADEMICS" />

            <MenuLink title="Students" to="/students" />
            <MenuLink title="Teachers" to="/teachers" />
            <MenuLink title="Classes" to="/classes" />
            <MenuLink title="Subjects" to="/subjects" />
            <MenuLink title="Assignments" to="/assignments" />
            <MenuLink title="Attendance" to="/attendance" />
            <MenuLink title="Timetable" to="/timetables" />

            <Section title="EXAMINATIONS" />

            <MenuLink title="Exams" to="/exams" />
            <MenuLink title="Marks Entry" to="/marks" />
            <MenuLink title="Report Cards" to="/reportcard" />

            <Section title="FINANCE & BURSARY" />

            <MenuLink
                title="Finance Dashboard"
                to="/finance"
            />

            <MenuLink
                title="Fee Categories"
                to="/finance/fee-categories"
            />

            <MenuLink
                title="Fee Structure"
                to="/finance/fee-structure"
            />

            <MenuLink
                title="Student Billing"
                to="/finance/student-billing"
            />

            <MenuLink
                title="Collect Fees"
                to="/finance/collect-fees"
            />

            <MenuLink
                title="Receipts"
                to="/finance/receipts"
            />

            <MenuLink
                title="Finance Reports"
                to="/finance/reports"
            />

            <Section title="LIBRARY" />

            <MenuLink title="Library" to="/library" />

            <Section title="HOSTEL" />

            <MenuLink title="Hostel" to="/hostel" />

            <Section title="TRANSPORT" />

            <MenuLink title="Transport" to="/transport" />

            <Section title="CLINIC" />

            <MenuLink title="Clinic" to="/clinic" />

            <Section title="INVENTORY" />

            <MenuLink title="Inventory" to="/inventory" />

            <Section title="HR & PAYROLL" />

            <MenuLink title="Payroll" to="/dashboard" />

            <Section title="SYSTEM" />

            <MenuLink title="Settings" to="/settings" />
        </div>
    );
}

function Section({ title }) {
    return (
        <>
            <hr
                style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    borderColor: "#ffffff44"
                }}
            />

            <h4
                style={{
                    color: "#FFD700",
                    marginBottom: "10px",
                    fontSize: "14px"
                }}
            >
                {title}
            </h4>
        </>
    );
}

function MenuLink({ title, to }) {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: "block",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#fff",
                background: isActive ? "#ffffff55" : "#ffffff20",
                fontWeight: isActive ? "bold" : "normal",
                transition: "0.2s"
            })}
        >
            {title}
        </NavLink>
    );
}
