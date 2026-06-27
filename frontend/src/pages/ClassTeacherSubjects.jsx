import { useEffect, useState } from "react";
import api from "../services/api";
import ClassTeacherSubjects from "./pages/ClassTeacherSubjects";
export default function ClassTeacherSubjects() {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [classId, setClassId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const loadData = async () => {
        const classRes = await api.get("/class-teacher-subjects");
        const teacherRes = await api.get("/teachers");
        const subjectRes = await api.get("/subjects");

        setClasses(classRes.data);
        setTeachers(teacherRes.data);
        setSubjects(subjectRes.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const assign = async () => {
        await api.post("/class-teacher-subjects", {
            school_class_id: classId,
            teacher_id: teacherId,
            subject_id: subjectId,
        });

        loadData();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Class Teacher Assignment</h1>

            <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
            >
                <option value="">Select Class</option>

                {classes.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name} {c.section}
                    </option>
                ))}
            </select>

            <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
            >
                <option value="">Select Subject</option>

                {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>

            <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
            >
                <option value="">Select Teacher</option>

                {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                        {t.first_name} {t.last_name}
                    </option>
                ))}
            </select>

            <button onClick={assign}>
                Assign
<button onClick={() => setPage("classteachers")}>
    Class Teachers
</button>            
</button>

            <hr />

            <table border="1">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Teachers</th>
         
           </tr>
{page === "classteachers" && <ClassTeacherSubjects />}
                </thead>

                <tbody>
                    {classes.map(c => (
                        <tr key={c.id}>
                            <td>{c.name} {c.section}</td>

                            <td>
                                {c.teachers.length
                                    ? c.teachers.map(t => t.first_name + " " + t.last_name).join(", ")
                                    : "No teachers assigned"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
