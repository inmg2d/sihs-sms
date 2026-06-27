import { useEffect, useState } from "react";
import api from "../services/api";

export default function Teachers() {
const [teachers, setTeachers] = useState([]);
const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");

const [form, setForm] = useState({
    staff_id: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    phone: "",
    email: "",
    qualification: "",
    specialization: "",
    photo: null,
});

    const loadTeachers = () => {
        api.get("/teachers")
            .then(res => setTeachers(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadTeachers();
    }, []);
const editTeacher = (teacher) => {
    setForm({
        staff_id: teacher.staff_id,
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        gender: teacher.gender || "Male",
        phone: teacher.phone || "",
        email: teacher.email || "",
        qualification: teacher.qualification || "",
        specialization: teacher.specialization || "",
        photo: null,
    });

    setEditingId(teacher.id);
};

const deleteTeacher = async (id) => {
    if (!confirm("Delete this teacher?")) return;

    try {
        await api.delete(`/teachers/${id}`);
        loadTeachers();
    } catch (err) {
        console.error(err);
        alert("Failed to delete teacher");
    }
};
const submitTeacher = async (e) => {
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
                `/teachers/${editingId}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } else {
            await api.post(
                "/teachers",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        }

        setForm({
            staff_id: "",
            first_name: "",
            last_name: "",
            gender: "Male",
            phone: "",
            email: "",
            qualification: "",
            specialization: "",
            photo: null,
        });

        setEditingId(null);

        loadTeachers();

    } catch (err) {
        console.error(err);
        alert("Failed to save teacher");
    }
};  
  return (
        <div style={{ padding: "20px" }}>
            <h1>SIHS Teachers</h1>
<input
    type="text"
    placeholder="Search teachers..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<br />
<br />

<form onSubmit={submitTeacher}>
   <input
        placeholder="Staff ID"
        value={form.staff_id}
        onChange={e =>
            setForm({ ...form, staff_id: e.target.value })
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
        placeholder="Phone"
        value={form.phone}
        onChange={e =>
            setForm({ ...form, phone: e.target.value })
        }
    />

    <input
        placeholder="Email"
        value={form.email}
        onChange={e =>
            setForm({ ...form, email: e.target.value })
        }
    />

    <input
        placeholder="Qualification"
        value={form.qualification}
        onChange={e =>
            setForm({ ...form, qualification: e.target.value })
        }
    />

    <input
        placeholder="Specialization"
        value={form.specialization}
        onChange={e =>
            setForm({ ...form, specialization: e.target.value })
        }
    />

    <input
        type="file"
        accept="image/*"
        onChange={e =>
            setForm({ ...form, photo: e.target.files[0] })
        }
    />

    <button type="submit">
        {editingId ? "Update Teacher" : "Add Teacher"}
    </button>
</form>

<br />

            <table border="1">
                <thead>
                    <tr>
<th>Photo</th>
<th>Staff ID</th>
<th>Name</th>
<th>Gender</th>
<th>Phone</th>
<th>Email</th>
<th>Qualification</th>
<th>Specialization</th>
<th>Actions</th>
                    </tr>
                </thead>

<tbody>
{teachers
    .filter(teacher =>
        (
            teacher.first_name +
            " " +
            teacher.last_name +
            " " +
            teacher.staff_id
        )
            .toLowerCase()
            .includes(search.toLowerCase())
    )
    .map(teacher => (
        <tr key={teacher.id}>
            <td>
                {teacher.photo ? (
                    <img
                        src={`http://2.25.213.90:8000/storage/${teacher.photo}`}
                        alt="teacher"
                        width="50"
                        height="50"
                    />
                ) : (
                    "No Photo"
                )}
            </td>

            <td>{teacher.staff_id}</td>

            <td>
                {teacher.first_name} {teacher.last_name}
            </td>

            <td>{teacher.gender}</td>

            <td>{teacher.phone}</td>

            <td>{teacher.email}</td>

            <td>{teacher.qualification}</td>

            <td>{teacher.specialization}</td>

            <td>
                <button onClick={() => editTeacher(teacher)}>
                    Edit
                </button>

                <button onClick={() => deleteTeacher(teacher.id)}>
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
