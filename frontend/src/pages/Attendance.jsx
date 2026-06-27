import { useEffect, useState } from "react";
import api from "../services/api";

export default function Attendance() {

    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);

    const [classId, setClassId] = useState("");
    const [attendanceDate, setAttendanceDate] = useState(
        new Date().toISOString().substring(0, 10)
    );

    useEffect(() => {

        api.get("/classes")
            .then(res => {
                setClasses(res.data);
            })
            .catch(console.error);

    }, []);

    useEffect(() => {

        if (!classId) {
            setStudents([]);
            return;
        }

        api.get("/students")
            .then(res => {

                console.log("Selected class:", classId);
                console.log("Students:", res.data);

                const list = res.data
                    .filter(student =>
                        Number(student.school_class_id) === Number(classId)
                    )
                    .map(student => ({
                        ...student,
                        status: "Present"
                    }));

                console.log("Filtered:", list);

                setStudents(list);

            })
            .catch(console.error);

    }, [classId]);

    const saveAttendance = async () => {

        try {

            for (const student of students) {

                await api.post("/attendances", {

                    student_id: student.id,
                    school_class_id: classId,
                    attendance_date: attendanceDate,
                    status: student.status

                });

            }

            alert("Attendance saved successfully.");

        } catch (err) {

            console.error(err);
            alert("Unable to save attendance.");

        }

    };

    return (

        <div style={{ padding: 20 }}>

            <h2>Student Attendance</h2>

            <select
                value={classId}
                onChange={e => setClassId(e.target.value)}
            >

                <option value="">Select Class</option>

                {classes.map(c => (

                    <option key={c.id} value={c.id}>
                        {c.name} {c.section}
                    </option>

                ))}

            </select>

            <input
                type="date"
                value={attendanceDate}
                onChange={e => setAttendanceDate(e.target.value)}
            />

            <br /><br />

            <table border="1" cellPadding="6">

                <thead>

                    <tr>
                        <th>Matricule</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {students.map(student => (

                        <tr key={student.id}>

                            <td>{student.matricule}</td>

                            <td>
                                {student.first_name} {student.last_name}
                            </td>

                            <td>

                                <select
                                    value={student.status}
                                    onChange={e => {

                                        const updated = [...students];

                                        const index = updated.findIndex(
                                            s => s.id === student.id
                                        );

                                        updated[index].status = e.target.value;

                                        setStudents(updated);

                                    }}
                                >

                                    <option>Present</option>
                                    <option>Absent</option>
                                    <option>Late</option>
                                    <option>Excused</option>

                                </select>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br />

            <button onClick={saveAttendance}>
                Save Attendance
            </button>

        </div>

    );

}
