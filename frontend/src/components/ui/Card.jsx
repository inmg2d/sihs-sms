import theme from "../../theme/theme";

export default function Card({

    title,

    subtitle,

    children,

    actions = null,

    padding = true

}) {

    return (

        <div
            style={{
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                boxShadow: theme.shadow.card,
                marginBottom: theme.spacing.lg,
                overflow: "hidden"
            }}
        >

            {(title || actions) && (

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderBottom: `1px solid ${theme.colors.border}`,
                        background: "#fafafa"
                    }}
                >

                    <div>

                        {title && (

                            <h2
                                style={{
                                    margin: 0,
                                    color: theme.colors.primary,
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: theme.typography.h4
                                }}
                            >
                                {title}
                            </h2>

                        )}

                        {subtitle && (

                            <small
                                style={{
                                    color: theme.colors.textSecondary
                                }}
                            >
                                {subtitle}
                            </small>

                        )}

                    </div>

                    {actions}

                </div>

            )}

            <div
                style={{
                    padding: padding ? "20px" : 0
                }}
            >

                {children}

            </div>

        </div>

    );

}
