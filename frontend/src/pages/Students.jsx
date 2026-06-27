import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  
  const [students, setStudents] = useState([]);
const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");
const [form, setForm] = useState({
    matricule: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    date_of_birth: "",
    parent_name: "",
    parent_phone: "",
    class: "",
    section: "Science",
    photo: null,
});

    const loadStudents = () => {
        api.get("/students")
            .then(res => setStudents(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadStudents();
    }, []);
const editStudent = (student) => {
    setForm({
        matricule: student.matricule,
        first_name: student.first_name,
        last_name: student.last_name,
        gender: student.gender,
        date_of_birth: student.date_of_birth || "",
        parent_name: student.parent_name || "",
        parent_phone: student.parent_phone || "",
        class: student.class,
        section: student.section,
    });

    setEditingId(student.id);
};
const deleteStudent = async (id) => {
    if (!confirm("Delete this student?")) return;

    try {
        await api.delete(`/students/${id}`);
        loadStudents();
    } catch (err) {
        console.error(err);
        alert("Failed to delete student");
    }
};

    const submitForm = async (e) => {
        e.preventDefault();

        try {
const formData = new FormData();

Object.keys(form).forEach(key => {
    if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
    }
});

if (editingId) {
    await api.post(
        `/students/${editingId}?_method=PUT`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
} else {
    await api.post(
        "/students",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
}

setForm({
    matricule: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    date_of_birth: "",
    parent_name: "",
    parent_phone: "",
    class: "",
    section: "Science",
photo: null,
});         
setEditingId(null);
            loadStudents();
        } catch (err) {
            console.error(err);
            alert("Failed to save student");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>SIHS Students</h1>
<input
    type="text"
    placeholder="Search students..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<br />
<br />
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
<select
    value={form.gender}
    onChange={e =>
        setForm({ ...form, gender: e.target.value })
    }
>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
</select>

<input
    type="date"
    value={form.date_of_birth}
    onChange={e =>
        setForm({ ...form, date_of_birth: e.target.value })
    }
/>

<input
    placeholder="Parent Name"
    value={form.parent_name}
    onChange={e =>
        setForm({ ...form, parent_name: e.target.value })
    }
/>

<input
    placeholder="Parent Phone"
    value={form.parent_phone}
    onChange={e =>
        setForm({ ...form, parent_phone: e.target.value })
    }
/>
<select
    value={form.class}
    onChange={e =>
        setForm({ ...form, class: e.target.value })
    }
>
    <option value="">Select Class</option>
    <option>Form 1</option>
    <option>Form 2</option>
    <option>Form 3</option>
    <option>Form 4</option>
    <option>Form 5</option>
    <option>Lower Sixth</option>
    <option>Upper Sixth</option>
</select>
<select
    value={form.section}
    onChange={e =>
        setForm({ ...form, section: e.target.value })
    }
>
    <option>Grammar</option>
    <option>Science</option>
    <option>Commercial</option>
    <option>Technical</option>
</select>
<input
    type="file"
    accept="image/*"
    onChange={e =>
        setForm({ ...form, photo: e.target.files[0] })
    }
/>
                <button type="submit">
                   {editingId ? "Update Student" : "Add Student"}
                </button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
<th>Photo</th>
<th>Matricule</th>
<th>Name</th>
<th>Gender</th>
<th>Class</th>
<th>Section</th>
<th>Parent</th>
<th>Actions</th>
                    </tr>
                </thead>

                <tbody>
      {students
    .filter(student =>
        (
            student.first_name +
            " " +
            student.last_name +
            " " +
            student.matricule
        )
            .toLowerCase()
            .includes(search.toLowerCase())
    )
    .map(student => (
<tr key={student.id}>
    <td>
        {student.photo ? (
            <img
                src={`http://2.25.213.90:8000/storage/${student.photo}`}
                alt="student"
                width="50"
                height="50"
            />
        ) : (
            "No Photo"
        )}
    </td>

    <td>{student.matricule}</td>

    <td>
        {student.first_name} {student.last_name}
    </td>

    <td>{student.gender}</td>

    <td>{student.class}</td>

    <td>{student.section}</td>

    <td>{student.parent_name}</td>

    <td>
        <button onClick={() => editStudent(student)}>
            Edit
        </button>

        <button onClick={() => deleteStudent(student.id)}>
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
