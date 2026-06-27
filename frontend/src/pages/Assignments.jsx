import { useEffect, useState } from "react";
import api from "../services/api";

export default function Assignments() {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [teacherId, setTeacherId] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const loadData = async () => {
        const teachersRes = await api.get("/teachers");
        const subjectsRes = await api.get("/subjects");
        const assignmentsRes = await api.get("/assignments");

        setTeachers(teachersRes.data);
        setSubjects(subjectsRes.data);
        setAssignments(assignmentsRes.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const assignSubject = async () => {
        await api.post("/assignments", {
            teacher_id: teacherId,
            subject_id: subjectId,
        });

        loadData();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Teacher Subject Assignments</h1>

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

            <button onClick={assignSubject}>
                Assign
            </button>

            <hr />

            <table border="1">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Subjects</th>
                    </tr>
                </thead>

                <tbody>
                    {assignments.map(teacher => (
                        <tr key={teacher.id}>
                            <td>
                                {teacher.first_name} {teacher.last_name}
                            </td>

                            <td>
                                {teacher.subjects
                                    .map(s => s.name)
                                    .join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
