import theme from "../../theme/theme";

export default function PageHeader({

    title,

    subtitle,

    actions = null

}) {

    return (

        <div
            style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: "25px",

                paddingBottom: "15px",

                borderBottom: `2px solid ${theme.colors.border}`

            }}
        >

            <div>

                <h1
                    style={{

                        margin: 0,

                        color: theme.colors.primary,

                        fontFamily: theme.typography.fontFamily,

                        fontSize: theme.typography.h2

                    }}
                >

                    {title}

                </h1>

                {subtitle && (

                    <p
                        style={{

                            marginTop: "6px",

                            color: theme.colors.textSecondary,

                            fontSize: theme.typography.body

                        }}
                    >

                        {subtitle}

                    </p>

                )}

            </div>

            <div
                style={{

                    display: "flex",

                    gap: "10px",

                    alignItems: "center"

                }}
            >

                {actions}

            </div>

        </div>

    );

}
