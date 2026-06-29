import { confirmDelete } from "../../utils/confirm";
import { notify } from "../../utils/notify";
import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";

import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";

import TeacherStatistics from "./TeacherStatistics";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./TeacherTable";

export default function TeacherPage() {

    const [teachers, setTeachers] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({

        staff_id: "",

        first_name: "",

        last_name: "",

        gender: "Male",

        phone: "",

        email: "",

        qualification: "",

        specialization: "",

        photo: null

    });

    useEffect(() => {

        loadTeachers();

    }, []);

    async function loadTeachers() {

        try {

            const res = await api.get("/teachers");

            setTeachers(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    function editTeacher(teacher) {

        setEditingId(teacher.id);

        setForm({

            staff_id: teacher.staff_id,

            first_name: teacher.first_name,

            last_name: teacher.last_name,

            gender: teacher.gender,

            phone: teacher.phone,

            email: teacher.email,

            qualification: teacher.qualification,

            specialization: teacher.specialization,

            photo: null

        });

    }

async function deleteTeacher(id) {

    const confirmed = await confirmDelete(

        "Delete Teacher",

        "This teacher will be permanently removed."

    );

    if (!confirmed) return;

    try {

        await api.delete(`/teachers/${id}`);

        notify.success("Teacher deleted successfully.");

        loadTeachers();

    } catch (err) {

        console.error(err);

        notify.error("Unable to delete teacher.");

    }

}
    async function submitForm(e) {

        e.preventDefault();

        try {

            const formData = new FormData();

            Object.keys(form).forEach(key => {

                if (form[key] !== "" && form[key] !== null) {

                    formData.append(key, form[key]);

                }

            });

            if (editingId) {

                await api.post(

                    `/teachers/${editingId}?_method=PUT`,

                    formData,

                    {

                        headers: {

                            "Content-Type": "multipart/form-data"

                        }

                    }

                );

            } else {

                await api.post(

                    "/teachers",

                    formData,

                    {

                        headers: {

                            "Content-Type": "multipart/form-data"

                        }

                    }

                );

            }

            setEditingId(null);

            setForm({

                staff_id: "",

                first_name: "",

                last_name: "",

                gender: "Male",

                phone: "",

                email: "",

                qualification: "",

                specialization: "",

                photo: null

            });

            loadTeachers();

        } catch (err) {

            console.error(err);

            alert("Unable to save teacher.");

        }

    }

    const filteredTeachers = useMemo(() => {

        return teachers.filter(teacher =>

            `${teacher.first_name} ${teacher.last_name} ${teacher.staff_id}`

                .toLowerCase()

                .includes(search.toLowerCase())

        );

    }, [teachers, search]);
return (

    <div>

        <PageHeader

            title="Teachers"

            subtitle="Teacher Management"

            actions={

                <Button

                    onClick={() => {

                        setEditingId(null);

                        setForm({

                            staff_id: "",

                            first_name: "",

                            last_name: "",

                            gender: "Male",

                            phone: "",

                            email: "",

                            qualification: "",

                            specialization: "",

                            photo: null

                        });

                    }}

                >

                    New Teacher

                </Button>

            }

        />

        <TeacherStatistics

            teachers={teachers}

        />

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

                placeholder="Search teachers..."

            />

        </div>

        <TeacherForm

            form={form}

            setForm={setForm}

            submitForm={submitForm}

            editingId={editingId}

        />

        <TeacherTable

            teachers={filteredTeachers}

            editTeacher={editTeacher}

            deleteTeacher={deleteTeacher}

        />

    </div>

);

}
