import { useState } from "react";

import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import Classes from "./pages/Classes";
import ClassSubjects from "./pages/ClassSubjects";
import Timetables from "./pages/Timetables";
import Attendance from "./pages/Attendance";
import Exams from "./pages/Exams";
import Marks from "./pages/Marks";
import ReportCard from "./pages/ReportCard";

function App() {

    const [page, setPage] = useState("students");

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    marginBottom: "20px"
                }}
            >

                <button onClick={() => setPage("students")}>Students</button>

                <button onClick={() => setPage("teachers")}>Teachers</button>

                <button onClick={() => setPage("subjects")}>Subjects</button>
                
               <button onClick={() => setPage("reportcard")}>
                 Report Cards
               </button>

                <button onClick={() => setPage("assignments")}>
                    Teacher Assignments
                </button>

                <button onClick={() => setPage("classes")}>Classes</button>

                <button onClick={() => setPage("classsubjects")}>
                    Class Subjects
                </button>

                <button onClick={() => setPage("timetables")}>
                    Timetables
                </button>

                <button onClick={() => setPage("attendance")}>
                    Attendance
                </button>

                <button onClick={() => setPage("exams")}>
                    Exams
                </button>

                <button onClick={() => setPage("marks")}>
                    Marks
                </button>

            </div>

            {page === "students" && <Students />}
            {page === "teachers" && <Teachers />}
            {page === "subjects" && <Subjects />}
            {page === "assignments" && <Assignments />}
            {page === "classes" && <Classes />}
            {page === "classsubjects" && <ClassSubjects />}
            {page === "timetables" && <Timetables />}
            {page === "attendance" && <Attendance />}
            {page === "exams" && <Exams />}
            {page === "marks" && <Marks />}
            {page === "reportcard" && <ReportCard />}

        </div>

    );

}

export default App;
