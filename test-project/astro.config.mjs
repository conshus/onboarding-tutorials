import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import myIntegration from './my-toolbar-app/my-integration.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://conshus.github.io/onboarding-tutorials/test-project',
  integrations: [
    myIntegration,
    starlight({
      title: 'Vonage Onboarding',
      tableOfContents: false,
      pagefind: false,
      // social: {
      // 	github: 'https://github.com/withastro/starlight',
      // },
      // sidebar: [
      // 	{
      // 		label: 'Guides',
      // 		items: [
      // 			// Each item here is one entry in the navigation menu.
      // 			{ label: 'Example Guide', slug: 'guides/example' },
      // 		],
      // 	},
      // 	{
      // 		label: 'Reference',
      // 		autogenerate: { directory: 'reference' },
      // 	},
      // ],
    }),
  ],
});
