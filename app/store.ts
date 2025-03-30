import yeast from 'yeast'
import { create } from 'zustand'
import { produce } from 'immer'

export type Invoice = {
	invoiceName: string
	invoiceNumber: string
	issueDate: string
	dueDate: string
	logo: string
	senderIdentity: {
		name: string
		email: string
		phone: string
		address: string
		city: string
		state: string
		postalCode: string
		country: string
	}
	customerIdentity: {
		name: string
		email: string
		phone: string
		address: string
		city: string
		state: string
		postalCode: string
		country: string
	}
	lineItems: Array<{
		name: string
		quantity: number
		unitPrice: number
		note: string
		productId: string
	}>
	memo: string
	discount: number
	shippingFee: number
	taxRate: number
}

const useInvoiceStore = create<
	Invoice & {
		// Actions
		setInvoiceDetail: (field: string, value: string | number) => void
		setSenderDetail: (field: string, value: string) => void
		setCustomerDetail: (field: string, value: string) => void
		addLineItem: () => void
		updateLineItem: (
			index: number,
			field: string,
			value: string | number
		) => void
		removeLineItem: (index: number) => void
		setFieldByPath: (path: string, value: any) => void
		resetInvoice: () => void
	}
>(set => ({
	// Invoice details
	// Invoice details
	invoiceName: `INV-${yeast()}`,
	invoiceNumber: `INV-${new Date().getFullYear()}-${String(
		new Date().getMonth() + 1
	).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`,
	issueDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
	dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
		.toISOString()
		.split('T')[0],
	logo: '',

	// Sender identity
	senderIdentity: {
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	},

	// Customer identity
	customerIdentity: {
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	},

	// Line items
	lineItems: [
		{
			name: '',
			quantity: 0,
			unitPrice: 0,
			note: '',
			productId: ''
		}
	],

	// Additional details
	memo: '',
	discount: undefined,
	shippingFee: undefined,
	taxRate: undefined,

	// Actions
	setInvoiceDetail: (field: string, value: string | number) =>
		set(() => ({
			[field]: value
		})),

	setSenderDetail: (field: string, value: string) =>
		set(state => ({
			senderIdentity: { ...state.senderIdentity, [field]: value }
		})),

	setCustomerDetail: (field: string, value: string) =>
		set(state => ({
			customerIdentity: { ...state.customerIdentity, [field]: value }
		})),

	addLineItem: () =>
		set(state => ({
			lineItems: [
				...state.lineItems,
				{ name: '', quantity: 0, unitPrice: 0, note: '', productId: '' }
			]
		})),

	updateLineItem: (index: number, field: string, value: string | number) =>
		set(state => {
			const updatedItems = [...state.lineItems]
			updatedItems[index] = { ...updatedItems[index], [field]: value }
			return { lineItems: updatedItems }
		}),

	removeLineItem: (index: number) =>
		set(state => ({
			lineItems: state.lineItems.filter(
				(_: any, i: number) => i !== index
			)
		})),

	setFieldByPath: (path: string, value: any) =>
		set(
			produce(state => {
				// Handle different path formats
				const normalizedPath = path
					.replace(/\[(\d+)\]/g, '.$1') // convert array[0] to array.0
					.split('.')

				// Navigate to the nested property
				let current = state
				for (let i = 0; i < normalizedPath.length - 1; i++) {
					current = current[normalizedPath[i]]
				}

				// Set the value
				current[normalizedPath[normalizedPath.length - 1]] = value
			})
		),

	resetInvoice: () =>
		set({
			invoiceName: '',
			invoiceNumber: '',
			issueDate: '',
			dueDate: '',
			logo: '',
			senderIdentity: {
				name: '',
				email: '',
				phone: '',
				address: '',
				city: '',
				state: '',
				postalCode: '',
				country: ''
			},
			customerIdentity: {
				name: '',
				email: '',
				phone: '',
				address: '',
				city: '',
				state: '',
				postalCode: '',
				country: ''
			},
			lineItems: [],
			memo: '',
			discount: 0,
			shippingFee: 0,
			taxRate: 0
		})
}))

export default useInvoiceStore
