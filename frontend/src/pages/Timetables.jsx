import { useEffect, useState } from "react";
import api from "../services/api";

export default function Timetables() {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [timetables, setTimetables] = useState([]);

    const [form, setForm] = useState({
        school_class_id: "",
        teacher_id: "",
        subject_id: "",
        day: "Monday",
        start_time: "",
        end_time: "",
        room: "",
    });

    const loadData = async () => {
        try {
            const [c, t, s, tt] = await Promise.all([
                api.get("/classes"),
                api.get("/teachers"),
                api.get("/subjects"),
                api.get("/timetables"),
            ]);

            setClasses(c.data);
            setTeachers(t.data);
            setSubjects(s.data);
            setTimetables(tt.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const saveTimetable = async (e) => {
        e.preventDefault();

        try {
            await api.post("/timetables", form);

            setForm({
                school_class_id: "",
                teacher_id: "",
                subject_id: "",
                day: "Monday",
                start_time: "",
                end_time: "",
                room: "",
            });

            loadData();
        } catch (err) {
            console.error(err);
        }
    };

    const remove = async (id) => {
        if (!window.confirm("Delete timetable?")) return;

        await api.delete("/timetables/" + id);
        loadData();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>School Timetable</h2>

            <form onSubmit={saveTimetable}>
                <select
                    value={form.school_class_id}
                    onChange={(e) =>
                        setForm({ ...form, school_class_id: e.target.value })
                    }
                >
                    <option value="">Select Class</option>
                    {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} {c.section}
                        </option>
                    ))}
                </select>

                <select
                    value={form.subject_id}
                    onChange={(e) =>
                        setForm({ ...form, subject_id: e.target.value })
                    }
                >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <select
                    value={form.teacher_id}
                    onChange={(e) =>
                        setForm({ ...form, teacher_id: e.target.value })
                    }
                >
                    <option value="">Select Teacher</option>
                    {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.first_name} {t.last_name}
                        </option>
                    ))}
                </select>

                <select
                    value={form.day}
                    onChange={(e) =>
                        setForm({ ...form, day: e.target.value })
                    }
                >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                </select>

                <input
                    type="time"
                    value={form.start_time}
                    onChange={(e) =>
                        setForm({ ...form, start_time: e.target.value })
                    }
                />

                <input
                    type="time"
                    value={form.end_time}
                    onChange={(e) =>
                        setForm({ ...form, end_time: e.target.value })
                    }
                />

                <input
                    placeholder="Room"
                    value={form.room}
                    onChange={(e) =>
                        setForm({ ...form, room: e.target.value })
                    }
                />

                <button type="submit">Save Timetable</button>
            </form>

            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Room</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {timetables.map((t) => (
                        <tr key={t.id}>
                            <td>
                                {t.school_class?.name} {t.school_class?.section}
                            </td>
                            <td>{t.day}</td>
                            <td>
                                {t.start_time} - {t.end_time}
                            </td>
                            <td>{t.subject?.name}</td>
                            <td>
                                {t.teacher?.first_name} {t.teacher?.last_name}
                            </td>
                            <td>{t.room}</td>
                            <td>
                                <button onClick={() => remove(t.id)}>
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
