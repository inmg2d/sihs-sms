import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        api.get("/students")
            .then(res => setStudents(res.data))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>SIHS Students</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Name</th>
                        <th>Class</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.matricule}</td>
                            <td>
                                {student.first_name} {student.last_name}
                            </td>
                            <td>{student.class}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
