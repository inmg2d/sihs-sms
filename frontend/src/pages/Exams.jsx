import { useEffect, useState } from "react";
import api from "../services/api";

export default function Exams() {

    const [exams, setExams] = useState([]);

    const [form, setForm] = useState({
        name: "",
        term: "",
        academic_year: "",
        start_date: "",
        end_date: "",
        active: true
    });

    const loadExams = async () => {
        const res = await api.get("/exams");
        setExams(res.data);
    };

    useEffect(() => {
        loadExams();
    }, []);

    const saveExam = async (e) => {
        e.preventDefault();

        await api.post("/exams", form);

        setForm({
            name: "",
            term: "",
            academic_year: "",
            start_date: "",
            end_date: "",
            active: true
        });

        loadExams();
    };

    const remove = async (id) => {

        if (!window.confirm("Delete this exam?")) return;

        await api.delete("/exams/" + id);

        loadExams();
    };

    return (

        <div style={{ padding: 20 }}>

            <h2>Examinations</h2>

            <form onSubmit={saveExam}>

                <input
                    placeholder="Exam Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Term"
                    value={form.term}
                    onChange={e => setForm({ ...form, term: e.target.value })}
                />

                <input
                    placeholder="Academic Year"
                    value={form.academic_year}
                    onChange={e => setForm({ ...form, academic_year: e.target.value })}
                />

                <input
                    type="date"
                    value={form.start_date}
                    onChange={e => setForm({ ...form, start_date: e.target.value })}
                />

                <input
                    type="date"
                    value={form.end_date}
                    onChange={e => setForm({ ...form, end_date: e.target.value })}
                />

                <button type="submit">
                    Save Exam
                </button>

            </form>

            <br />

            <table border="1">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Term</th>
                        <th>Academic Year</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {exams.map(exam => (

                        <tr key={exam.id}>

                            <td>{exam.name}</td>
                            <td>{exam.term}</td>
                            <td>{exam.academic_year}</td>
                            <td>{exam.start_date}</td>
                            <td>{exam.end_date}</td>

                            <td>

                                <button
                                    onClick={() => remove(exam.id)}
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
