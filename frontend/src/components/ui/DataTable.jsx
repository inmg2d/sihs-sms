import theme from "../../theme/theme";

export default function DataTable({

    columns = [],

    data = [],

    loading = false,

    emptyMessage = "No records found."

}) {

    if (loading) {

        return (

            <div
                style={{
                    padding: "40px",
                    textAlign: "center",
                    color: theme.colors.textSecondary,
                    fontFamily: theme.typography.fontFamily
                }}
            >
                Loading...
            </div>

        );

    }

    return (

        <div
            style={{
                background: theme.colors.surface,
                borderRadius: theme.radius.md,
                boxShadow: theme.shadow.card,
                overflowX: "auto"
            }}
        >

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: theme.typography.fontFamily
                }}
            >

                <thead>

                    <tr
                        style={{
                            background: theme.colors.primary,
                            color: "#ffffff"
                        }}
                    >

                        {columns.map((column) => (

                            <th
                                key={column.key}
                                style={{
                                    padding: "14px",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {column.label}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.length === 0 ? (

                        <tr>

                            <td
                                colSpan={columns.length}
                                style={{
                                    padding: "30px",
                                    textAlign: "center",
                                    color: theme.colors.textSecondary
                                }}
                            >
                                {emptyMessage}
                            </td>

                        </tr>

                    ) : (

                        data.map((row, rowIndex) => (

                            <tr
                                key={row.id || rowIndex}
                                style={{
                                    background:
                                        rowIndex % 2 === 0
                                            ? "#ffffff"
                                            : "#fafafa",
                                    borderBottom:
                                        `1px solid ${theme.colors.border}`
                                }}
                            >

                                {columns.map((column) => (

                                    <td
                                        key={column.key}
                                        style={{
                                            padding: "14px",
                                            verticalAlign: "middle"
                                        }}
                                    >

                                        {column.render
                                            ? column.render(row)
                                            : row[column.key]}

                                    </td>

                                ))}

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}
