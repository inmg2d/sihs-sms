import { confirmDelete } from "../../utils/confirm";
import { notify } from "../../utils/notify";
import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";

import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";

import StudentStatistics from "./StudentStatistics";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

export default function StudentsPage() {

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

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

        photo: null

    });

    useEffect(() => {

        loadStudents();

    }, []);

    async function loadStudents() {

        try {

            const res = await api.get("/students");

            setStudents(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    function editStudent(student) {

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

            photo: null

        });

        setEditingId(student.id);

    }

async function deleteStudent(id) {

    const confirmed = await confirmDelete(

        "Delete Student",

        "This student will be permanently removed."

    );

    if (!confirmed) return;

    try {

        await api.delete(`/students/${id}`);

        notify.success("Student deleted successfully.");

        loadStudents();

    } catch (err) {

        console.error(err);

        notify.error("Unable to delete student.");

    }

}
    async function submitForm(e) {

        e.preventDefault();

        try {

            const formData = new FormData();

            Object.keys(form).forEach((key) => {

                if (form[key] !== "" && form[key] !== null) {

                    formData.append(key, form[key]);

                }

            });

            if (editingId) {

                await api.post(

                    `/students/${editingId}?_method=PUT`,

                    formData,

                    {

                        headers: {

                            "Content-Type":

                                "multipart/form-data"

                        }

                    }

                );

            } else {

                await api.post(

                    "/students",

                    formData,

                    {

                        headers: {

                            "Content-Type":

                                "multipart/form-data"

                        }

                    }

                );

            }

            setEditingId(null);

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

                photo: null

            });

            loadStudents();

        } catch (err) {

            console.error(err);

            alert("Unable to save student.");

        }

    }

const filteredStudents = useMemo(() => {

    return students.filter((student) => {

        return (

            `${student.first_name} ${student.last_name} ${student.matricule}`

                .toLowerCase()

                .includes(search.toLowerCase())

        );

    });

}, [students, search]);

return (

    <div>

        <PageHeader

            title="Students"

            subtitle="Student Information Management"

            actions={

                <Button

                    onClick={() => {

                        setEditingId(null);

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

                            photo: null

                        });

                    }}

                >

                    New Student

                </Button>

            }

        />

        <StudentStatistics students={students} />

        <div

            style={{

                marginBottom: "25px",

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap",

                gap: "15px"

            }}

        >

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Search students..."

            />

        </div>

        <StudentForm

            form={form}

            setForm={setForm}

            submitForm={submitForm}

            editingId={editingId}

        />

        <StudentTable

            students={filteredStudents}

            editStudent={editStudent}

            deleteStudent={deleteStudent}

        />

    </div>

);

}
