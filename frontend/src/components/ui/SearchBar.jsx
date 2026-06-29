import theme from "../../theme/theme";

export default function SearchBar({

    value,

    onChange,

    placeholder = "Search..."

}) {

    return (

        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "400px"
            }}
        >

            <input

                type="text"

                value={value}

                placeholder={placeholder}

                onChange={(e) => onChange(e.target.value)}

                style={{

                    width: "100%",

                    padding: "12px 45px 12px 15px",

                    borderRadius: theme.radius.md,

                    border: `1px solid ${theme.colors.border}`,

                    outline: "none",

                    fontFamily: theme.typography.fontFamily,

                    fontSize: theme.typography.body,

                    background: theme.colors.surface,

                    color: theme.colors.text,

                    boxSizing: "border-box"

                }}

            />

            <span

                style={{

                    position: "absolute",

                    right: "15px",

                    top: "50%",

                    transform: "translateY(-50%)",

                    color: theme.colors.textSecondary,

                    fontSize: "18px"

                }}

            >

                🔍

            </span>

        </div>

    );

}
