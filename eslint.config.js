import js from "@eslint/js";

export default [
    js.configs.recommended,
    // Override the recommended config
    {
        rules: {
          "no-console": "warn",
          "no-unused-vars": "warn"
        }
        // ...other configuration
    }
];