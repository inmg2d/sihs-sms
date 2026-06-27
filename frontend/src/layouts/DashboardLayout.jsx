import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
    setPage,
    children
}) {

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f4f6f8"
            }}
        >

            <Sidebar setPage={setPage} />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Topbar />

                <div
                    style={{
                        flex: 1,
                        padding: "20px"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}
