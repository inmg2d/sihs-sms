import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://api.sihs.online/api/fee-categories";

export default function FeeCategories() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        code: "",
        name: "",
        description: "",
        active: true,
    });

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const res = await axios.get(API);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function saveCategory() {
        try {
            await axios.post(API, form);

            setForm({
                code: "",
                name: "",
                description: "",
                active: true,
            });

            loadCategories();

            alert("Category saved successfully.");
        } catch (err) {
            console.error(err);
            alert("Unable to save category.");
        }
    }

    async function deleteCategory(id) {
        if (!window.confirm("Delete this category?")) return;

        await axios.delete(`${API}/${id}`);

        loadCategories();
    }

    return (
        <div style={{ padding: 30 }}>
            <h1 style={{ color: "#8B0000" }}>
                Fee Categories
            </h1>

            <div
                style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    marginTop: 20,
                }}
            >
                <input
                    placeholder="Code"
                    value={form.code}
                    onChange={(e) =>
                        setForm({ ...form, code: e.target.value })
                    }
                />

                <br />
                <br />

                <input
                    placeholder="Category Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <br />
                <br />

                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                <br />
                <br />

                <button
                    onClick={saveCategory}
                    style={{
                        background: "#8B0000",
                        color: "#fff",
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: 5,
                    }}
                >
                    Save Category
                </button>
            </div>

            <table
                style={{
                    width: "100%",
                    marginTop: 30,
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr style={{ background: "#8B0000", color: "#fff" }}>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.code}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        deleteCategory(cat.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {categories.length === 0 && (
                        <tr>
                            <td
                                colSpan="5"
                                style={{ textAlign: "center" }}
                            >
                                No fee categories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
