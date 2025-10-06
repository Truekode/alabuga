import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --color-bg: #0b1220;
        --color-surface: #111827;
        --color-border: #1f2937;
        --color-text: #e5e7eb;
        --color-muted: #9ca3af;
        --color-primary: #6366f1;
        --color-primary-weak: #eef2ff;
        --color-critical: #ef4444;
        --color-success: #10b981;
        --radius-sm: 6px;
        --radius-md: 10px;
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        margin: 0;
        background: var(--color-bg);
        color: var(--color-text);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    }

    * {
        box-sizing: border-box;
    }
`

export const theme = {
  colors: {
    bg: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    border: 'var(--color-border)',
    text: 'var(--color-text)',
    muted: 'var(--color-muted)',
    primary: 'var(--color-primary)',
    primaryWeak: 'var(--color-primary-weak)',
    critical: 'var(--color-critical)',
    success: 'var(--color-success)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
  },
  space: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
  },
} as const
