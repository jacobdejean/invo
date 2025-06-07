import type { Route } from './+types/new'
import { checkToken } from '~/lib/unkey'
import { createPdfResponse, fromFormData } from '../render-pdf'

const API_DISABLED = true

export async function action({ request, params }: Route.ActionArgs) {
	const authHeader = request.headers.get('Authorization')
	const token = authHeader?.replace('Bearer ', '')
	const user = token ? await checkToken(token) : null
	if (!user) {
		return new Response('Unauthenticated', {
			status: 401
		})
	}

	// When the api is ready, rely on user's token's validity here
	if (API_DISABLED) {
		//(!user.enabled) {
		return new Response('Access not enabled', {
			status: 403
		})
	}

	// TODO support formdata or json input
	// const contentHeader = request.headers.get('Content-Type')

	const invoiceFormData = await request.formData()
	const invoiceData = fromFormData(invoiceFormData)
	return createPdfResponse(invoiceData)
}
