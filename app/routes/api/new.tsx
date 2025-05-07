import type { Route } from './+types/new'
import { createPdfResponse, fromFormData } from '../render-pdf'

export async function action({ request, params }: Route.ActionArgs) {
	const invoiceFormData = await request.formData()
	const invoiceData = fromFormData(invoiceFormData)
	return createPdfResponse(invoiceData)
}
