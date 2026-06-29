import { useState } from "react";
import { login as loginUser } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

async function login(e) {
    e.preventDefault();

    try {
        setLoading(true);

        await loginUser(email, password);

        window.location.href = "/";

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Login failed."
        );

    } finally {

        setLoading(false);

    }
}
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f6f8"
            }}
        >
            <div
                style={{
                    width: "420px",
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0,0,0,.15)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                    <img
                        src="/logo.jpeg"
                        alt="SIHS"
                        style={{ width: "90px" }}
                    />

                    <h2 style={{ color: "#8B0000" }}>
                        SIHS ERP
                    </h2>

                    <p>
                        Saint Isidore High School Ndop
                    </p>
                </div>

                <form onSubmit={login}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "20px"
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: "#8B0000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>

                </form>

            </div>
        </div>
    );
}
