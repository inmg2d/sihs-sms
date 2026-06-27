import { useState } from "react";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Timetables from "./pages/Timetables";
import Exams from "./pages/Exams";
import Marks from "./pages/Marks";
import ReportCard from "./pages/ReportCard";

export default function App() {

    const [page, setPage] = useState("dashboard");

    function renderPage() {

        switch (page) {

            case "dashboard":
                return <Dashboard />;

            case "students":
                return <Students />;

            case "teachers":
                return <Teachers />;

            case "subjects":
                return <Subjects />;

            case "classes":
                return <Classes />;

            case "assignments":
                return <Assignments />;

            case "attendance":
                return <Attendance />;

            case "timetables":
                return <Timetables />;

            case "exams":
                return <Exams />;

            case "marks":
                return <Marks />;

            case "reportcard":
                return <ReportCard />;

            default:
                return <Dashboard />;
        }

    }

    return (

        <DashboardLayout setPage={setPage}>

            {renderPage()}

        </DashboardLayout>

    );

}
