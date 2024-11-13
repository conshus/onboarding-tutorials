import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

export default {
  name: 'my-astro-integration',
  hooks: {
    'astro:config:setup': ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: 'my-toolbar-app',
        name: 'My Toolbar App',
        icon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vonage</title><path d="M9.279 11.617l-4.54-10.07H0l6.797 15.296a.084.084 0 0 0 .153 0zm9.898-10.07s-6.148 13.868-6.917 15.565c-1.838 4.056-3.2 5.07-4.588 5.289a.026.026 0 0 0 .004.052h4.34c1.911 0 3.219-1.285 5.06-5.341C17.72 15.694 24 1.547 24 1.547z" fill="white"/></svg>',
        entrypoint: fileURLToPath(new URL('./app.ts', import.meta.url)),
      });
    },
  },
} satisfies AstroIntegration;
