import { notify } from "../utils/notify";
import { useEffect, useState } from "react";
import api from "../services/api";

import theme from "../theme/theme";

import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {

    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        subjects: 0,
        classes: 0,
        exams: 0,
        marks: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

   async function loadDashboard() {

    const loading = notify.loading("Loading dashboard...");

    try {

        const res = await api.get("/dashboard");

        setStats(res.data);

        notify.dismiss(loading);

        notify.success("Dashboard loaded");

    } catch (err) {

        notify.dismiss(loading);

        notify.error("Unable to load dashboard");

        console.error(err);

    }

}

    return (

        <div>

            <PageHeader

                title="Dashboard"

                subtitle="Welcome to Saint Isidore High School Ndop ERP"

                actions={
                    <Button>
                        Refresh
                    </Button>
                }

            />

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

                    gap: "20px",

                    marginBottom: "25px"

                }}

            >

                <StatCard

                    title="Students"

                    value={stats.students}

                    icon="🎓"

                    color={theme.colors.primary}

                />

                <StatCard

                    title="Teachers"

                    value={stats.teachers}

                    icon="👩‍🏫"

                    color={theme.colors.secondary}

                />

                <StatCard

                    title="Classes"

                    value={stats.classes}

                    icon="🏫"

                    color={theme.colors.success}

                />

                <StatCard

                    title="Subjects"

                    value={stats.subjects}

                    icon="📚"

                    color={theme.colors.info}

                />

                <StatCard

                    title="Exams"

                    value={stats.exams}

                    icon="📝"

                    color={theme.colors.warning}

                />

                <StatCard

                    title="Marks"

                    value={stats.marks}

                    icon="📊"

                    color={theme.colors.danger}

                />

            </div>

            <Card

                title="Quick Actions"

                subtitle="Frequently used system functions"

            >

                <div

                    style={{

                        display: "flex",

                        flexWrap: "wrap",

                        gap: "15px"

                    }}

                >

                    <Button>New Student</Button>

                    <Button variant="secondary">

                        New Teacher

                    </Button>

                    <Button variant="success">

                        Collect Fees

                    </Button>

                    <Button variant="info">

                        Enter Marks

                    </Button>

                </div>

            </Card>

            <Card

                title="Announcements"

                subtitle="School Information"

            >

                <p>

                    Welcome to the new

                    <strong> SIHS ERP Enterprise System.</strong>

                </p>

                <p>

                    This dashboard will continue to evolve with

                    Finance, Students, Examinations, Library,

                    Clinic, Payroll, Inventory and Reports.

                </p>

            </Card>

        </div>

    );

}
