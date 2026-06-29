import StatCard from "../../components/ui/StatCard";
import theme from "../../theme/theme";

export default function StudentStatistics({ students = [] }) {

    const total = students.length;

    const male = students.filter(
        student => student.gender === "Male"
    ).length;

    const female = students.filter(
        student => student.gender === "Female"
    ).length;

    const science = students.filter(
        student => student.section === "Science"
    ).length;

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: "20px",
                marginBottom: "25px"
            }}
        >

            <StatCard
                title="Total Students"
                value={total}
                icon="🎓"
                color={theme.colors.primary}
            />

            <StatCard
                title="Male Students"
                value={male}
                icon="👦"
                color={theme.colors.info}
            />

            <StatCard
                title="Female Students"
                value={female}
                icon="👧"
                color={theme.colors.secondary}
            />

            <StatCard
                title="Science Section"
                value={science}
                icon="🧪"
                color={theme.colors.success}
            />

        </div>

    );

}
