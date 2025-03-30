import type { Route } from './+types/render-pdf'
import { renderToString } from 'react-dom/server'
import { BasicInvoice } from '~/components/templates/basic'
import log from '~/log'

/*
  render-pdf has an action setup to recieve invoice form data, render
  with cloudflare, then stream pdf back via the form navigation

  NOTE: Do not export a component from this module as that would break
  how React Router handles the action's PDF response.
*/

export async function action({ request, params }: Route.ActionArgs) {
	const invoiceFormData = await request.formData()
	const invoiceData = fromFormData(invoiceFormData)
	return createPdfResponse(invoiceData)
}

async function createPdfResponse(invoiceData: any) {
	try {
		const cloudflareAccountId =
			process.env.CLOUDFLARE_ACCOUNT_ID ?? 'env missing variable'
		const cloudflareApiToken =
			process.env.CLOUDFLARE_API_TOKEN ?? 'env missing variable'
		const domain = process.env.PRODUCTION_HOSTNAME ?? 'env missing variable'
		const renderUrl = new URL(`${domain}/render-web`)

		log('INFO', 'Creating PDF')

		const result = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/browser-rendering/pdf`,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cloudflareApiToken}`
				},
				body: JSON.stringify({
					html: renderToString(
						<html>
							<head>
								<link
									rel='stylesheet'
									href='https://invo.dev/css/base-invoice.css'
								/>
							</head>
							<body>
								<BasicInvoice data={invoiceData} />
							</body>
						</html>
					),
					viewport: {
						// A4
						width: 794,
						height: 1123
					}
				})
			}
		)

		if (!result.ok) {
			const errorText = await result.text()
			log('ERROR', `Invalid PDF Result`, errorText)
			return new Response(errorText, {
				status: result.status,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const contentType = result.headers.get('Content-Type')
		if (!contentType || !contentType.includes('application/pdf')) {
			const errorBody = JSON.stringify({
				error: 'Expected PDF but received different content type'
			})
			log(
				'ERROR',
				`Invalid Content Type`,
				errorBody,
				`Expected: application/pdf`,
				`Recieved ${contentType}`
			)
			return new Response(errorBody, {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const pdfBlob = await result.blob()

		log('INFO', 'Created Valid PDF')

		return new Response(pdfBlob, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${invoiceData?.invoiceNumber}.pdf"`
			}
		})
	} catch (error) {
		log(
			'ERROR',
			`Failed to Create PDF`,
			'message' in error ? error.message : JSON.stringify(error)
		)
		return new Response(JSON.stringify({ error: 'Failed to render PDF' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}

/*
  This is a fairly clunky way to parse the form data, but looking to prevent
  arbitrary extra data being passed further down this process. This will likely
  also be a key section in a future renovation to introduce more dynamic field
  inputs and validation.

  This doesn't apply to line items, which are arbitrarily passable by nature.
*/
function fromFormData(formData: FormData) {
	console.log('FORM DATA', formData)
	const lineItemKeys = [...formData.keys()].filter(key =>
		key.startsWith('lineItem')
	)
	const data = {
		invoiceName: formData.get('invoiceName'),
		invoiceNumber: formData.get('invoiceNumber'),
		issueDate: formData.get('issueDate'),
		dueDate: formData.get('dueDate'),
		logo: formData.get('logo'),
		senderIdentity: {
			name: formData.get('senderIdentity.name'),
			email: formData.get('senderIdentity.email'),
			phone: formData.get('senderIdentity.phone'),
			address: formData.get('senderIdentity.address'),
			city: formData.get('senderIdentity.city'),
			state: formData.get('senderIdentity.state'),
			postalCode: formData.get('senderIdentity.postalCode'),
			country: formData.get('senderIdentity.country')
		},
		customerIdentity: {
			name: formData.get('customerIdentity.name'),
			email: formData.get('customerIdentity.email'),
			phone: formData.get('customerIdentity.phone'),
			address: formData.get('customerIdentity.address'),
			city: formData.get('customerIdentity.city'),
			state: formData.get('customerIdentity.state'),
			postalCode: formData.get('customerIdentity.postalCode'),
			country: formData.get('customerIdentity.country')
		},
		lineItems: convertToArrayObject(formDataToArray(formData)),
		memo: formData.get('memo'),
		discount: parseFloat(formData.get('discount')?.toString() || '0'),
		shippingFee: parseFloat(formData.get('shippingFee')?.toString() || '0'),
		taxRate: parseFloat(formData.get('taxRate')?.toString() || '0')
	}
	console.log('DATA', data)
	return data
}

interface InputItem {
	name: string
	value: string
}

interface LineItem {
	name: string
	quantity: string
	unitPrice: string
}

const convertToArrayObject = (data: InputItem[]): LineItem[] => {
	const result: LineItem[] = []

	data.forEach((item: InputItem) => {
		const matches: RegExpMatchArray | null = item.name.match(
			/lineItems\[(\d+)\]\.(\w+)/
		)
		if (!matches) return

		const [, indexStr, property] = matches
		const index: number = parseInt(indexStr, 10)

		if (!result[index]) {
			result[index] = {
				name: '',
				quantity: '',
				unitPrice: ''
			}
		}

		if (
			property === 'name' ||
			property === 'quantity' ||
			property === 'unitPrice'
		) {
			result[index][property] = item.value
		}
	})

	return result.filter(Boolean)
}

const formDataToArray = (formData: FormData): InputItem[] => {
	return Array.from(formData.entries()).map(([name, value]) => ({
		name,
		value: value.toString()
	}))
}
