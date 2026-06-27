import { useEffect, useState } from "react";
import api from "../services/api";

export default function Classes() {
    const [classes, setClasses] = useState([]);

    const [form, setForm] = useState({
        name: "",
        section: "",
        academic_year: "",
        active: true,
    });

    const loadClasses = () => {
        api.get("/classes")
            .then(res => setClasses(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadClasses();
    }, []);

    const saveClass = async (e) => {
        e.preventDefault();

        await api.post("/classes", form);

        setForm({
            name: "",
            section: "",
            academic_year: "",
            active: true,
        });

        loadClasses();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>School Classes</h1>

            <form onSubmit={saveClass}>

                <input
                    placeholder="Class Name"
                    value={form.name}
                    onChange={e =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Section"
                    value={form.section}
                    onChange={e =>
                        setForm({ ...form, section: e.target.value })
                    }
                />

                <input
                    placeholder="Academic Year"
                    value={form.academic_year}
                    onChange={e =>
                        setForm({
                            ...form,
                            academic_year: e.target.value,
                        })
                    }
                />

                <button type="submit">
                    Save Class
                </button>

            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Academic Year</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {classes.map(c => (

                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.section}</td>
                            <td>{c.academic_year}</td>
                            <td>
                                {c.active ? "Active" : "Inactive"}
                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    );
}

