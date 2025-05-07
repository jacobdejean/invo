import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('docs', 'routes/docs.tsx'),
	route('support', 'routes/support.tsx'),
	route('privacy', 'routes/privacy.tsx'),
	route('new', 'routes/new.tsx'),
	route('render-pdf', 'routes/render-pdf.tsx'),
	route('/api/new', 'routes/api/new.tsx'),
] satisfies RouteConfig
