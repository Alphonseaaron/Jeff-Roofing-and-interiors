import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        'space': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        // Starlink Theme Colors
        background: {
          DEFAULT: "#000000",
          secondary: "#0A0A0A",
        },
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        border: "#222222",
        input: "#111111",
        primary: {
          DEFAULT: "#3399FF",
          foreground: "#FFFFFF",
          hover: "#5FB8FF",
        },
        secondary: {
          DEFAULT: "#A1A1A1",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#A1A1A1",
          foreground: "#A1A1A1",
        },
        accent: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF3B3B",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#1ABF89",
          foreground: "#FFFFFF",
        },
        ring: "#3399FF",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
