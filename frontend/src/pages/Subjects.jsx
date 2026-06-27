import { useEffect, useState } from "react";
import api from "../services/api";

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        code: "",
        name: "",
        department: "",
        coefficient: 1,
    });

    const loadSubjects = () => {
        api.get("/subjects")
            .then(res => setSubjects(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    const editSubject = (subject) => {
        setForm({
            code: subject.code,
            name: subject.name,
            department: subject.department || "",
            coefficient: subject.coefficient || 1,
        });

        setEditingId(subject.id);
    };

    const deleteSubject = async (id) => {
        if (!confirm("Delete this subject?")) return;

        try {
            await api.delete(`/subjects/${id}`);
            loadSubjects();
        } catch (err) {
            console.error(err);
            alert("Failed to delete subject");
        }
    };

    const submitSubject = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await api.put(`/subjects/${editingId}`, form);
            } else {
                await api.post("/subjects", form);
            }

            setForm({
                code: "",
                name: "",
                department: "",
                coefficient: 1,
            });

            setEditingId(null);
            loadSubjects();

        } catch (err) {
            console.error(err);
            alert("Failed to save subject");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>SIHS Subjects</h1>

            <input
                type="text"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br /><br />

            <form onSubmit={submitSubject}>
                <input
                    placeholder="Code"
                    value={form.code}
                    onChange={e =>
                        setForm({ ...form, code: e.target.value })
                    }
                />

                <input
                    placeholder="Subject Name"
                    value={form.name}
                    onChange={e =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Department"
                    value={form.department}
                    onChange={e =>
                        setForm({ ...form, department: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Coefficient"
                    value={form.coefficient}
                    onChange={e =>
                        setForm({
                            ...form,
                            coefficient: e.target.value
                        })
                    }
                />

                <button type="submit">
                    {editingId ? "Update Subject" : "Add Subject"}
                </button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Coefficient</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {subjects
                        .filter(subject =>
                            (
                                subject.code +
                                " " +
                                subject.name
                            )
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map(subject => (
                            <tr key={subject.id}>
                                <td>{subject.code}</td>
                                <td>{subject.name}</td>
                                <td>{subject.department}</td>
                                <td>{subject.coefficient}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            editSubject(subject)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteSubject(subject.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
