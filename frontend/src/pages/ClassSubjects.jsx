import { useEffect, useState } from "react";
import api from "../services/api";

export default function ClassSubjects() {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [classId, setClassId] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const loadData = async () => {
        const classRes = await api.get("/class-subjects");
        const subjectRes = await api.get("/subjects");

        setClasses(classRes.data);
        setSubjects(subjectRes.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const assign = async () => {
        if (!classId || !subjectId) {
            alert("Select both a class and a subject.");
            return;
        }

        await api.post("/class-subjects", {
            school_class_id: classId,
            subject_id: subjectId,
        });

        setSubjectId("");
        loadData();
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Class Subject Assignment</h1>

            <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
            >
                <option value="">Select Class</option>

                {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name} {c.section}
                    </option>
                ))}
            </select>

            <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                style={{ marginLeft: 10 }}
            >
                <option value="">Select Subject</option>

                {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>

            <button
                onClick={assign}
                style={{ marginLeft: 10 }}
            >
                Assign
            </button>

            <hr />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Subjects</th>
                    </tr>
                </thead>

                <tbody>
                    {classes.map((c) => (
                        <tr key={c.id}>
                            <td>
                                {c.name} {c.section}
                            </td>

                            <td>
                                {c.subjects.length
                                    ? c.subjects.map((s) => s.name).join(", ")
                                    : "No subjects assigned"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
