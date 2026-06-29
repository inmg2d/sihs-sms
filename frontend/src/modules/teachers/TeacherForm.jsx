import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function TeacherForm({

    form,

    setForm,

    submitForm,

    editingId

}) {

    return (

        <Card

            title={editingId ? "Update Teacher" : "Register Teacher"}

            subtitle="Teacher Information"

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
                        placeholder="Staff ID"
                        value={form.staff_id}
                        onChange={(e)=>
                            setForm({...form,staff_id:e.target.value})
                        }
                    />

                    <input
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={(e)=>
                            setForm({...form,first_name:e.target.value})
                        }
                    />

                    <input
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={(e)=>
                            setForm({...form,last_name:e.target.value})
                        }
                    />

                    <select
                        value={form.gender}
                        onChange={(e)=>
                            setForm({...form,gender:e.target.value})
                        }
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                    <input
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e)=>
                            setForm({...form,phone:e.target.value})
                        }
                    />

                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e)=>
                            setForm({...form,email:e.target.value})
                        }
                    />

                    <input
                        placeholder="Qualification"
                        value={form.qualification}
                        onChange={(e)=>
                            setForm({...form,qualification:e.target.value})
                        }
                    />

                    <input
                        placeholder="Specialization"
                        value={form.specialization}
                        onChange={(e)=>
                            setForm({...form,specialization:e.target.value})
                        }
                    />

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

                <div style={{marginTop:"20px"}}>

                    <Button type="submit">

                        {editingId
                            ? "Update Teacher"
                            : "Add Teacher"}

                    </Button>

                </div>

            </form>

        </Card>

    );

}
