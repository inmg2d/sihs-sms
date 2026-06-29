import DataTable from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";

export default function StudentTable({

    students,

    editStudent,

    deleteStudent

}) {

    const columns = [

        {

            key: "photo",

            label: "Photo",

            render: (student) => (

                student.photo ?

                    <img

                        src={`https://api.sihs.online/storage/${student.photo}`}

                        alt="Student"

                        style={{

                            width: "50px",

                            height: "50px",

                            objectFit: "cover",

                            borderRadius: "50%"

                        }}

                    />

                :

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

        },

        {

            key: "matricule",

            label: "Matricule"

        },

        {

            key: "name",

            label: "Student",

            render: (student) => (

                <strong>

                    {student.first_name} {student.last_name}

                </strong>

            )

        },

        {

            key: "gender",

            label: "Gender"

        },

        {

            key: "class",

            label: "Class"

        },

        {

            key: "section",

            label: "Section"

        },

        {

            key: "parent_name",

            label: "Parent"

        },

        {

            key: "actions",

            label: "Actions",

            render: (student) => (

                <div

                    style={{

                        display: "flex",

                        gap: "8px"

                    }}

                >

                    <Button

                        size="sm"

                        onClick={() => editStudent(student)}

                    >

                        Edit

                    </Button>

                    <Button

                        size="sm"

                        variant="danger"

                        onClick={() => deleteStudent(student.id)}

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

            data={students}

        />

    );

}
