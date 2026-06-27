import { useEffect, useState } from "react";
import api from "../services/api";

export default function Marks() {

    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState([]);

    const [selectedExam, setSelectedExam] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const examsRes = await api.get("/exams");
            const classesRes = await api.get("/classes");
            const subjectsRes = await api.get("/subjects");
            const teachersRes = await api.get("/teachers");

            setExams(examsRes.data);
            setClasses(classesRes.data);
            setSubjects(subjectsRes.data);
            setTeachers(teachersRes.data);

        } catch (error) {

            console.error(error);

        }

    }

    async function loadStudents() {

        if (!selectedClass) {
            alert("Please select a class.");
            return;
        }

        try {

            const response = await api.get("/students");

            const filtered = response.data.filter(student =>
                Number(student.school_class_id) === Number(selectedClass)
            );

            setStudents(filtered);

            setMarks(
                filtered.map(student => ({
                    student_id: student.id,
                    score: ""
                }))
            );

        } catch (error) {

            console.error(error);

        }

    }

    function updateScore(index, value) {

        const copy = [...marks];

        copy[index].score = value;

        setMarks(copy);

    }

    async function saveMarks() {

        if (
            !selectedExam ||
            !selectedSubject ||
            !selectedTeacher
        ) {
            alert("Please complete all selections.");
            return;
        }

        try {

            for (const mark of marks) {

                if (mark.score === "") continue;

await api.post("/marks", {
    student_id: mark.student_id,
    school_class_id: selectedClass,
    exam_id: selectedExam,
    subject_id: selectedSubject,
    teacher_id: selectedTeacher,
    score: mark.score
});

            }

            alert("Marks saved successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to save marks.");

        }

    }

    return (

        <div style={{ padding: 20 }}>

            <h2>Marks Entry</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "10px",
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

                    {classes.map(item => (

                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name} {item.section}
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

                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                    <option value="">Select Teacher</option>

                    {teachers.map(teacher => (

                        <option
                            key={teacher.id}
                            value={teacher.id}
                        >
                            {teacher.first_name} {teacher.last_name}
                        </option>

                    ))}

                </select>

            </div>
            <button
                onClick={loadStudents}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    cursor: "pointer"
                }}
            >
                Load Students
            </button>

            <br />
            <br />

            {students.length > 0 && (

                <>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th style={{ border: "1px solid #ccc", padding: 10 }}>
                                    Matricule
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: 10 }}>
                                    Student
                                </th>

                                <th style={{ border: "1px solid #ccc", padding: 10 }}>
                                    Score
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {students.map((student, index) => (

                                <tr key={student.id}>

                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: 10
                                        }}
                                    >
                                        {student.matricule}
                                    </td>

                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: 10
                                        }}
                                    >
                                        {student.first_name} {student.last_name}
                                    </td>

                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: 10
                                        }}
                                    >

                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={marks[index]?.score || ""}
                                            onChange={(e) =>
                                                updateScore(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                width: "80px",
                                                padding: "6px"
                                            }}
                                        />

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <br />

                    <button
                        onClick={saveMarks}
                        style={{
                            padding: "12px 25px",
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Save Marks
                    </button>

                </>

            )}

        </div>

    );

}
