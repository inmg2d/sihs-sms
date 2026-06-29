import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f4f6f8"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Topbar />

                <main
                    style={{
                        flex: 1,
                        padding: "20px",
                        overflow: "auto"
                    }}
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
