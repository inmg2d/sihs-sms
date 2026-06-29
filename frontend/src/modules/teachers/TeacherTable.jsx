import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";

export default function TeacherTable({

    teachers,

    editTeacher,

    deleteTeacher

}) {

    const columns = [

        {
            key: "photo",
            label: "Photo",
            render: (teacher) => (

                teacher.photo ? (

                    <img
                        src={`https://api.sihs.online/storage/${teacher.photo}`}
                        alt="Teacher"
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />

                ) : (

                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            background: "#ddd",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        👤
                    </div>

                )

            )
        },

        {
            key: "staff_id",
            label: "Staff ID"
        },

        {
            key: "name",
            label: "Teacher",
            render: (teacher) => (
                <strong>
                    {teacher.first_name} {teacher.last_name}
                </strong>
            )
        },

        {
            key: "gender",
            label: "Gender"
        },

        {
            key: "qualification",
            label: "Qualification"
        },

        {
            key: "specialization",
            label: "Specialization"
        },

        {
            key: "email",
            label: "Email"
        },

        {
            key: "actions",
            label: "Actions",

            render: (teacher) => (

                <div
                    style={{
                        display: "flex",
                        gap: "8px"
                    }}
                >

                    <Button

                        onClick={() => editTeacher(teacher)}

                    >

                        Edit

                    </Button>

                    <Button

                        variant="danger"

                        onClick={() => deleteTeacher(teacher.id)}

                    >

                        Delete

                    </Button>

                </div>

            )

        }

    ];

    return (

        <DataTable

            columns={columns}

            data={teachers}

        />

    );

}
