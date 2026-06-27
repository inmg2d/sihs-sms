import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReportCard() {

    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);

    const [studentId, setStudentId] = useState("");
    const [examId, setExamId] = useState("");

    const [report, setReport] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {

            const studentsResponse = await api.get("/students");
            const examsResponse = await api.get("/exams");

            setStudents(studentsResponse.data);
            setExams(examsResponse.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function loadReport() {

        if (!studentId || !examId) {
            alert("Please select both Student and Exam.");
            return;
        }

        try {

            const response = await api.get(
                `/reportcard/${studentId}/${examId}`
            );

            setReport(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load report card.");

        }

    }

    return (

        <div style={{ padding: 20 }}>

            <h2>Student Report Card</h2>

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20
                }}
            >

                <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                >
                    <option value="">Select Student</option>

                    {students.map(student => (

                        <option
                            key={student.id}
                            value={student.id}
                        >
                            {student.matricule} - {student.first_name} {student.last_name}
                        </option>

                    ))}

                </select>

                <select
                    value={examId}
                    onChange={(e) => setExamId(e.target.value)}
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

                <button onClick={loadReport}>
                    Load Report
                </button>

            </div>

            {report && (

                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: 20,
                        borderRadius: 10,
                        background: "#fff"
                    }}
                >

                    <h1 style={{ marginBottom: 5 }}>
                        Saint Isidore High School Ndop
                    </h1>

                    <h3>Student Report Card</h3>

                    <hr />

                    <p>

                        <strong>Name:</strong>{" "}
                        {report.student.first_name} {report.student.last_name}

                    </p>

                    <p>

                        <strong>Matricule:</strong>{" "}
                        {report.student.matricule}

                    </p>

                    <p>

                        <strong>Class:</strong>{" "}
                        {report.student.class}

                    </p>

                    <table
                        border="1"
                        cellPadding="8"
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: 20
                        }}
                    >

                        <thead>

                            <tr>

                                <th>Subject</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Remark</th>

                            </tr>

                        </thead>

                        <tbody>

                            {report.marks.map(mark => (

                                <tr key={mark.id}>

                                    <td>{mark.subject.name}</td>

                                    <td>{mark.score}</td>

                                    <td>{mark.grade}</td>

                                    <td>{mark.remark}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <h3 style={{ marginTop: 20 }}>

                        Total: {report.total}

                    </h3>

                    <h3>

                        Average: {report.average}

                    </h3>

                    <button
                        onClick={() => window.print()}
                        style={{
                            marginTop: 20,
                            padding: "10px 20px"
                        }}
                    >
                        Print Report Card
                    </button>

                </div>

            )}

        </div>

    );

}
