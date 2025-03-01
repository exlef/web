import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsp from "@typescript-eslint/parser";

export default [
    js.configs.recommended, // Base ESLint rules
    {
        files: ["**/*.ts"], // Apply these rules to TypeScript files
        languageOptions: {
            parser: tsp,
            globals: {
                // Define browser globals here
                window: "readonly",
                document: "readonly",
                requestAnimationFrame: "readonly",
                cancelAnimationFrame: "readonly",
                HTMLCanvasElement: "readonly",
                console: "readonly",
                performance: "readonly",
                // Add other globals as needed
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules, // Apply recommended TypeScript rules
            "semi": ["error", "always"], // Example rule: enforce semicolons
            "quotes": ["error", "double"], // Example rule: enforce double quotes
        },
    },
];
