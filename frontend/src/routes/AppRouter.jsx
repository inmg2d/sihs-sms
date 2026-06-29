import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Academics
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Subjects from "../pages/Subjects";
import Classes from "../pages/Classes";
import Assignments from "../pages/Assignments";
import Attendance from "../pages/Attendance";
import Timetables from "../pages/Timetables";

// Examinations
import Exams from "../pages/Exams";
import Marks from "../pages/Marks";
import ReportCard from "../pages/ReportCard";

// Finance
import FinanceDashboard from "../pages/FinanceDashboard";
import FeeCategories from "../pages/FeeCategories";
import FeeStructure from "../pages/FeeStructure";
import StudentBilling from "../pages/StudentBilling";
import CollectFees from "../pages/CollectFees";
import Receipts from "../pages/Receipts";
import FinanceReports from "../pages/FinanceReports";

export default function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route element={<DashboardLayout />}>

                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Academics */}
                    <Route path="/students" element={<Students />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/assignments" element={<Assignments />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/timetables" element={<Timetables />} />

                    {/* Examinations */}
                    <Route path="/exams" element={<Exams />} />
                    <Route path="/marks" element={<Marks />} />
                    <Route path="/reportcard" element={<ReportCard />} />

                    {/* Finance */}
                    <Route path="/finance" element={<FinanceDashboard />} />
                    <Route path="/finance/fee-categories" element={<FeeCategories />} />
                    <Route path="/finance/fee-structure" element={<FeeStructure />} />
                    <Route path="/finance/student-billing" element={<StudentBilling />} />
                    <Route path="/finance/collect-fees" element={<CollectFees />} />
                    <Route path="/finance/receipts" element={<Receipts />} />
                    <Route path="/finance/reports" element={<FinanceReports />} />

                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}
