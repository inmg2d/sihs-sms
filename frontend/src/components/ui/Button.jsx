import theme from "../../theme/theme";

export default function Button({

    children,

    variant = "primary",

    size = "md",

    fullWidth = false,

    disabled = false,

    loading = false,

    icon = null,

    type = "button",

    onClick

}) {

    const colors = {

        primary: theme.colors.primary,

        secondary: theme.colors.secondary,

        success: theme.colors.success,

        danger: theme.colors.danger,

        info: theme.colors.info

    };

    const sizes = {

        sm: "10px 18px",

        md: "12px 22px",

        lg: "15px 28px"

    };

    return (

        <button

            type={type}

            disabled={disabled || loading}

            onClick={onClick}

            style={{

                background: colors[variant],

                color: "#fff",

                border: "none",

                borderRadius: theme.radius.md,

                padding: sizes[size],

                cursor: disabled ? "not-allowed" : "pointer",

                opacity: disabled ? .6 : 1,

                width: fullWidth ? "100%" : "auto",

                display: "inline-flex",

                alignItems: "center",

                justifyContent: "center",

                gap: "8px",

                fontWeight: 600,

                fontFamily: theme.typography.fontFamily,

                boxShadow: theme.shadow.card,

                transition: ".2s"

            }}

        >

            {loading ? "Loading..." : (

                <>

                    {icon}

                    {children}

                </>

            )}

        </button>

    );

}
