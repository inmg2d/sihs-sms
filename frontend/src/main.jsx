import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import AppRouter from "./routes/AppRouter";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <AppRouter />

        <Toaster

            position="top-right"

            reverseOrder={false}

            toastOptions={{

                duration: 3000,

                style: {

                    borderRadius: "10px",

                    background: "#ffffff",

                    color: "#222",

                    fontSize: "14px",

                    padding: "14px",

                    boxShadow: "0 5px 18px rgba(0,0,0,.15)"

                },

                success: {

                    style: {

                        borderLeft: "6px solid #16a34a"

                    }

                },

                error: {

                    style: {

                        borderLeft: "6px solid #dc2626"

                    }

                }

            }}

        />

    </React.StrictMode>

);
