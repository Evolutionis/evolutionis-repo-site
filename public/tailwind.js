tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#DDEAF6',
              300: '#86efac',
              400: '#4ade80',
              500: 'var(--color-primary-light, #22c55e)',
              600: 'var(--color-primary, #1E4E79)',
              700: 'var(--color-primary-dark, #1E4E89)',
              800: '#166534',
              900: '#14532d',
            },
            secondary: {
              50: 'var(--color-secondary, #eff6ff)',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            }
          },
          fontFamily: {
            heading: ['Montserrat', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
          },
        }
      }
    }