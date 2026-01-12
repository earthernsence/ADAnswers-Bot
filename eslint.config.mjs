import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import stylistic from "@stylistic/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends("eslint:recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@stylistic": stylistic,
      "import/": importPlugin
    },

    files: ["**/*.ts", "**/*.js", "**/*.mjs", "**/*.cjs"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          impliedStrict: false
        }
      }
    },

    rules: {
      "import/prefer-default-export": "off",
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
      "import/no-duplicates": "warn",
      "import/extensions": ["warn", "never"],
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-named-default": "warn",
      "import/no-self-import": "warn",
      "import/order": [
        "warn",
        {
          "newlines-between": "always-and-inside-groups",
          pathGroups: [{ pattern: "@/**", group: "sibling" }]
        }
      ],
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          allowSeparatedGroups: true,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
        }
      ],
      "no-console": "off",
      "no-template-curly-in-string": "warn",
      "array-callback-return": "error",
      complexity: "warn",
      "consistent-return": "error",
      "@stylistic/dot-location": ["error", "property"],
      "dot-notation": "error",
      eqeqeq: "error",

      "no-else-return": [
        "error",
        {
          allowElseIf: false
        }
      ],

      "no-empty-function": "error",
      "no-eval": "error",
      "no-extra-bind": "error",
      "no-extra-label": "error",
      "@stylistic/no-floating-decimal": "error",
      "no-implicit-coercion": "error",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-loop-func": "error",
      "@stylistic/no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-octal-escape": "error",
      "no-param-reassign": "error",
      "no-proto": "error",
      "no-script-url": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-unmodified-loop-condition": "error",
      "no-unused-expressions": "error",
      "no-useless-call": "error",
      "no-useless-catch": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "@stylistic/no-trailing-spaces": "error",
      "no-void": "error",
      "no-with": "error",
      radix: "warn",
      "require-await": "error",
      "require-unicode-regexp": "error",
      "@stylistic/wrap-iife": "error",
      yoda: "error",
      "no-label-var": "error",
      "no-shadow": "error",
      "no-shadow-restricted-names": "error",
      "no-undef": "off",

      "no-unused-vars": [
        "error",
        {
          vars: "local",
          args: "all"
        }
      ],

      "no-use-before-define": [
        "error",
        {
          functions: false,
          variables: false
        }
      ],

      "@stylistic/array-bracket-spacing": "error",
      "@stylistic/block-spacing": "error",

      "@stylistic/brace-style": [
        "error",
        "1tbs",
        {
          allowSingleLine: true
        }
      ],

      camelcase: "error",

      "capitalized-comments": [
        "error",
        "always",
        {
          ignoreConsecutiveComments: true
        }
      ],

      "@stylistic/comma-spacing": "error",
      "@stylistic/comma-style": "error",
      "@stylistic/computed-property-spacing": "error",
      "consistent-this": "error",
      "@stylistic/func-call-spacing": "error",
      "id-denylist": ["error", "ret", "helper", "temp", "tmp"],

      "@stylistic/indent": [
        "warn",
        2,
        {
          SwitchCase: 1
        }
      ],

      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/line-comment-position": "error",

      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true
        }
      ],

      "max-depth": "warn",

      "@stylistic/max-len": [
        "warn",
        {
          code: 240
        }
      ],

      "max-params": "warn",
      "@stylistic/max-statements-per-line": "error",
      "@stylistic/multiline-comment-style": ["error", "separate-lines"],
      "@stylistic/new-parens": "error",
      "no-array-constructor": "warn",
      "no-bitwise": "warn",
      "no-inline-comments": "error",
      "no-lonely-if": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "no-multi-assign": "warn",
      "@stylistic/no-multiple-empty-lines": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-object-constructor": "error",
      "@stylistic/no-tabs": "error",
      "no-unneeded-ternary": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "operator-assignment": "error",

      "@stylistic/operator-linebreak": [
        "error",
        "after",
        {
          overrides: {
            "?": "before",
            ":": "before"
          }
        }
      ],

      "@stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],

      "@stylistic/semi": "warn",
      "@stylistic/semi-spacing": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": ["error", "never"],
      "@stylistic/space-in-parens": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/spaced-comment": "error",
      strict: ["error", "global"],
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-tag-spacing": "error",
      "arrow-body-style": "error",
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@stylistic/arrow-spacing": "error",

      "@stylistic/no-confusing-arrow": [
        "error",
        {
          allowParens: true
        }
      ],

      "no-duplicate-imports": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "@stylistic/rest-spread-spacing": "error",
      "@stylistic/template-curly-spacing": "error",
      "prefer-template": "error"
    }
  }
];
