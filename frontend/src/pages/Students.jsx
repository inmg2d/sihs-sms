import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
    const [students, setStudents] = useState([]);

    const [form, setForm] = useState({
        matricule: "",
        first_name: "",
        last_name: "",
        gender: "Male",
        class: "",
        section: "Science",
    });

    const loadStudents = () => {
        api.get("/students")
            .then(res => setStudents(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await api.post("/students", form);

            setForm({
                matricule: "",
                first_name: "",
                last_name: "",
                gender: "Male",
                class: "",
                section: "Science",
            });

            loadStudents();
        } catch (err) {
            console.error(err);
            alert("Failed to save student");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>SIHS Students</h1>

            <form onSubmit={submitForm}>
                <input
                    placeholder="Matricule"
                    value={form.matricule}
                    onChange={e =>
                        setForm({ ...form, matricule: e.target.value })
                    }
                />

                <input
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={e =>
                        setForm({ ...form, first_name: e.target.value })
                    }
                />

                <input
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={e =>
                        setForm({ ...form, last_name: e.target.value })
                    }
                />

                <input
                    placeholder="Class"
                    value={form.class}
                    onChange={e =>
                        setForm({ ...form, class: e.target.value })
                    }
                />

                <button type="submit">
                    Add Student
                </button>
            </form>

            <br />

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
