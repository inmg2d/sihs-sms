import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function StudentForm({

    form,

    setForm,

    submitForm,

    editingId

}) {

    return (

        <Card

            title={
                editingId
                    ? "Update Student"
                    : "Register Student"
            }

            subtitle="Student Registration"

        >

            <form onSubmit={submitForm}>

                <div

                    style={{

                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",

                        gap: "15px"

                    }}

                >

                    <input
                        placeholder="Matricule"
                        value={form.matricule}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                matricule:e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                first_name:e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                last_name:e.target.value
                            })
                        }
                    />

                    <select
                        value={form.gender}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                gender:e.target.value
                            })
                        }
                    >

                        <option>Male</option>

                        <option>Female</option>

                    </select>

                    <input
                        type="date"
                        value={form.date_of_birth}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                date_of_birth:e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Parent Name"
                        value={form.parent_name}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                parent_name:e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Parent Phone"
                        value={form.parent_phone}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                parent_phone:e.target.value
                            })
                        }
                    />

                    <select
                        value={form.class}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                class:e.target.value
                            })
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
                        onChange={(e)=>
                            setForm({
                                ...form,
                                section:e.target.value
                            })
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
                        onChange={(e)=>
                            setForm({
                                ...form,
                                photo:e.target.files[0]
                            })
                        }
                    />

                </div>

                <div
                    style={{
                        marginTop:"20px"
                    }}
                >

                    <Button type="submit">

                        {editingId
                            ? "Update Student"
                            : "Add Student"}

                    </Button>

                </div>

            </form>

        </Card>

    );

}
