import type { Route } from './+types/new'
import { checkToken } from '~/lib/unkey'
import { createPdfResponse, fromFormData } from '../render-pdf'

export async function action({ request, params }: Route.ActionArgs) {
	const authHeader = request.headers.get('Authorization')
	const token = authHeader?.replace('Bearer ', '')
	const user = token ? await checkToken(token) : null
	if (!user) {
		return new Response('Unauthenticated', {
			status: 401
		})
	}
	if (!user.enabled) {
		return new Response('Access not enabled', {
			status: 403
		})
	}
	const contentHeader = request.headers.get('Content-Type')
	switch(contentHeader) {
	'application/json': {
    break;
	}

	}
	const invoiceFormData = await request.formData()
	const invoiceData = fromFormData(invoiceFormData)
	return createPdfResponse(invoiceData)
}
