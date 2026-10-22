import { createRequestHandler } from 'react-router'

declare module 'react-router' {
	export interface AppLoadContext {
		env: Env
		ctx: ExecutionContext
	}
}

const requestHandler = createRequestHandler(
	() => import('virtual:react-router/server-build'),
	import.meta.env.MODE
)

export default {
	fetch(request, env, ctx) {
		return requestHandler(request, { env, ctx })
	}
} satisfies ExportedHandler<Env>
