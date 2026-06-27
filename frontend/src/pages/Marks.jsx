import { useEffect, useState } from "react";
import api from "../services/api";

export default function Marks() {

    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const [marks, setMarks] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const examsRes = await api.get("/exams");
            const classesRes = await api.get("/classes");
            const subjectsRes = await api.get("/subjects");

            setExams(examsRes.data);
            setClasses(classesRes.data);
            setSubjects(subjectsRes.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function loadStudents() {

        if (!selectedClass) {

            alert("Select a class first.");

            return;

        }
async function saveMarks() {

    if (!selectedExam) {

        alert("Select an exam.");

        return;

    }

    if (!selectedSubject) {

        alert("Select a subject.");

        return;

    }

    try {

        for (let i = 0; i < marks.length; i++) {

            if (marks[i].score === "") continue;

            await api.post("/marks", {

                student_id: marks[i].student_id,

                exam_id: selectedExam,

                subject_id: selectedSubject,

                teacher_id: 1,

                score: Number(marks[i].score)

            });

        }

        alert("Marks saved successfully.");

    } catch (err) {

        console.error(err);

        alert("Unable to save marks.");

    }

}
        try {

            const res = await api.get("/students");

            const filtered = res.data.filter(student =>
                Number(student.school_class_id) === Number(selectedClass)
            );

            setStudents(filtered);

            setMarks(
                filtered.map(student => ({
                    student_id: student.id,
                    score: ""
                }))
            );

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div style={{ padding: "20px" }}>

            <h2>Student Marks Entry</h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}
            >

                <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                >
                    <option value="">Select Exam</option>

                    {exams.map(exam => (

                        <option
                            key={exam.id}
                            value={exam.id}
                        >
                            {exam.name}
                        </option>

                    ))}

                </select>

                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Select Class</option>

                    {classes.map(cls => (

                        <option
                            key={cls.id}
                            value={cls.id}
                        >
                            {cls.name} {cls.section}
                        </option>

                    ))}

                </select>

                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    <option value="">Select Subject</option>

                    {subjects.map(subject => (

                        <option
                            key={subject.id}
                            value={subject.id}
                        >
                            {subject.name}
                        </option>

                    ))}

                </select>

                <button onClick={loadStudents}>
                    Load Students
                </button>

<br />

<button onClick={saveMarks}>
    Save All Marks
</button>

            </div>

            <table border="1" cellPadding="8">

                <thead>

                    <tr>

                        <th>Matricule</th>
                        <th>Student</th>
                        <th>Score</th>

                    </tr>

                </thead>

<tbody>

    {students.map((student, index) => (

        <tr key={student.id}>

            <td>{student.matricule}</td>

            <td>
                {student.first_name} {student.last_name}
            </td>

            <td>

                <input
                    type="number"
                    min="0"
                    max="100"
                    value={marks[index]?.score || ""}
                    onChange={(e) => {

                        const updated = [...marks];

                        updated[index].score = e.target.value;

                        setMarks(updated);

                    }}
                />

            </td>

        </tr>

    ))}

</tbody>

            </table>

        </div>

    );

}
