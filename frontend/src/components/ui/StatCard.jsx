import theme from "../../theme/theme";

export default function StatCard({

    title,

    value,

    icon = "📊",

    color = theme.colors.secondary,

    footer = null

}) {

    return (

        <div
            style={{
                background: theme.colors.surface,
                borderRadius: theme.radius.md,
                boxShadow: theme.shadow.card,
                padding: "20px",
                borderLeft: `6px solid ${color}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "120px"
            }}
        >

            <div>

                <div
                    style={{
                        color: theme.colors.textSecondary,
                        fontSize: "14px",
                        marginBottom: "8px",
                        fontFamily: theme.typography.fontFamily
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontSize: "34px",
                        fontWeight: "700",
                        color: theme.colors.primary,
                        fontFamily: theme.typography.fontFamily
                    }}
                >
                    {value}
                </div>

                {footer && (

                    <div
                        style={{
                            marginTop: "10px",
                            color: theme.colors.textSecondary,
                            fontSize: "13px"
                        }}
                    >
                        {footer}
                    </div>

                )}

            </div>

            <div
                style={{
                    fontSize: "48px"
                }}
            >
                {icon}
            </div>

        </div>

    );

}
