import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		prerender: {
			handleHttpError: ({ status, path }) => {
				if (status === 404) {
					// Skip the route if a 404 error occurs during prerendering
					console.warn(`404 Error at ${path}. Skipping prerender.`);
					return;
				}

				// Throw the error for other status codes
				throw new Error(`${status} Error at ${path}`);
			}
		}
	}
};

export default config;
