import StatCard from "../../components/ui/StatCard";
import theme from "../../theme/theme";

export default function TeacherStatistics({ teachers = [] }) {

    const total = teachers.length;

    const male = teachers.filter(
        teacher => teacher.gender === "Male"
    ).length;

    const female = teachers.filter(
        teacher => teacher.gender === "Female"
    ).length;

    const departments = new Set(
        teachers
            .map(t => t.specialization)
            .filter(Boolean)
    ).size;

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
                title="Total Teachers"
                value={total}
                icon="👩‍🏫"
                color={theme.colors.primary}
            />

            <StatCard
                title="Male Teachers"
                value={male}
                icon="👨‍🏫"
                color={theme.colors.info}
            />

            <StatCard
                title="Female Teachers"
                value={female}
                icon="👩‍🏫"
                color={theme.colors.secondary}
            />

            <StatCard
                title="Specializations"
                value={departments}
                icon="📘"
                color={theme.colors.success}
            />

        </div>

    );

}
