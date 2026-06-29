import axios from "axios";

const API = "https://api.sihs.online/api";

export async function login(email, password) {
    const response = await axios.post(`${API}/login`, {
        email,
        password
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getUser() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
    return !!localStorage.getItem("token");
}
