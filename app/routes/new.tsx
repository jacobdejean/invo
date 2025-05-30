import type { Route } from './+types/home'
import { useState } from 'react'
import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Section,
	Slider,
	Tabs,
	Text,
	TextArea
} from '@radix-ui/themes'
import { Form } from 'radix-ui'
import {
	Building2,
	Calendar,
	FileText,
	Home,
	Image,
	Mail,
	MapPin,
	Notebook,
	Package,
	Percent,
	Phone,
	Receipt,
	ShoppingCart,
	Truck,
	User
} from 'lucide-react'
import Preview from '~/components/preview'
import SettingsArea from '~/components/settings-text-area'
import SettingsInput from '~/components/settings-text-field'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'
import useInvoiceStore from '~/store'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New Invoice - invo.dev' },
		{ name: 'description', content: 'Create a new invoice' }
	]
}

export default function New() {
	const invoice = useInvoiceStore()

	return (
		<div className='page-wrapper'>
			<Section className='max-sm:!p-0'>
				<Container>
					<WebNav />
				</Container>
			</Section>
			<Section className='!pt-0 !pb-0'>
				<Container>
					<h1 className='mb-4 text-4xl leading-none font-medium max-sm:text-2xl'>
						New invoice
					</h1>
					<Box className='mb-4 max-w-2xl'>
						<Text mb={'4'}>
							Enter your business details, customer information,
							and line items to create an invoice. Once complete,
							you can preview and download as a PDF.
						</Text>
					</Box>
				</Container>
			</Section>
			<Section className='!pt-0 max-sm:!pb-0'>
				<Container>
					<Form.Form
						key={invoice?.invoiceName}
						method='post'
						action='/render-pdf'
						className='invoice-settings flex !gap-6 max-lg:flex-col max-lg:items-center'
					>
						<Box className='relative flex w-full max-w-[480px] flex-none items-stretch pt-4 pb-4'>
							<Flex
								direction='column'
								gap='0'
								className='max-h-full'
							>
								{/* Header */}
								<Flex direction='column' gap='4'>
									<SettingsInput
										label={'Invoice Name'}
										path={'invoiceName'}
										defaultValue={invoice?.invoiceName}
										icon={<FileText size={20} />}
									/>
									<SettingsInput
										label={'Invoice #'}
										path={'invoiceNumber'}
										defaultValue={invoice?.invoiceNumber}
										icon={<FileText size={20} />}
									/>
									{/* Invoice Details */}
									<Grid columns='2' gap='4'>
										<SettingsInput
											label={'Issue Date'}
											path={'issueDate'}
											defaultValue={invoice?.issueDate}
											type='date'
											icon={<Calendar size={20} />}
										/>
										<SettingsInput
											label={'Due Date'}
											path={'dueDate'}
											defaultValue={invoice?.dueDate}
											type='date'
											icon={<Calendar size={20} />}
										/>
									</Grid>
									<SettingsInput
										label={'Logo'}
										path={'logo'}
										defaultValue={invoice?.logo}
										type='url'
										icon={<Image size={20} />}
									/>
								</Flex>

								{/* Billing Information */}
								<Grid columns='2' gap='6'>
									{/* Sender */}
									<Flex direction='column' gap='3'>
										<Heading
											size='4'
											className='!mt-6 text-[#3D57C8]'
										>
											Sender
										</Heading>
										<SettingsInput
											label={'Name'}
											path={'senderIdentity.name'}
											defaultValue={
												invoice?.senderIdentity?.name
											}
											icon={<User size={20} />}
										/>
										<SettingsInput
											label={'Email'}
											path={'senderIdentity.email'}
											defaultValue={
												invoice?.senderIdentity?.email
											}
											icon={<Mail size={20} />}
										/>
										<SettingsInput
											label={'Phone'}
											path={'senderIdentity.phone'}
											defaultValue={
												invoice?.senderIdentity?.phone
											}
											icon={<Phone size={20} />}
										/>
										<SettingsInput
											label={'Address'}
											path={'senderIdentity.address'}
											defaultValue={
												invoice?.senderIdentity?.address
											}
											icon={<Home size={20} />}
										/>
										<SettingsInput
											label={'City'}
											path={'senderIdentity.city'}
											defaultValue={
												invoice?.senderIdentity?.city
											}
											icon={<Building2 size={20} />}
										/>
										<SettingsInput
											label={'State'}
											path={'senderIdentity.state'}
											defaultValue={
												invoice?.senderIdentity?.state
											}
											icon={<MapPin size={20} />}
										/>
										<SettingsInput
											label={'Postal Code'}
											path={'senderIdentity.postalCode'}
											defaultValue={
												invoice?.senderIdentity
													?.postalCode
											}
											icon={<MapPin size={20} />}
										/>
										<SettingsInput
											label={'Country'}
											path={'senderIdentity.country'}
											defaultValue={
												invoice?.senderIdentity?.country
											}
											icon={<MapPin size={20} />}
										/>
									</Flex>

									{/* Receiver */}
									<Flex direction='column' gap='3'>
										<Heading
											size='4'
											className='!mt-6 text-[#3D57C8]'
										>
											Receiver
										</Heading>
										<SettingsInput
											label={'Name'}
											path={'customerIdentity.name'}
											defaultValue={
												invoice?.customerIdentity?.name
											}
											icon={<User size={20} />}
										/>
										<SettingsInput
											label={'Email'}
											path={'customerIdentity.email'}
											defaultValue={
												invoice?.customerIdentity?.email
											}
											icon={<Mail size={20} />}
										/>
										<SettingsInput
											label={'Phone'}
											path={'customerIdentity.phone'}
											defaultValue={
												invoice?.customerIdentity?.phone
											}
											icon={<Phone size={20} />}
										/>
										<SettingsInput
											label={'Address'}
											path={'customerIdentity.address'}
											defaultValue={
												invoice?.customerIdentity
													?.address
											}
											icon={<Home size={20} />}
										/>
										<SettingsInput
											label={'City'}
											path={'customerIdentity.city'}
											defaultValue={
												invoice?.customerIdentity?.city
											}
											icon={<Building2 size={20} />}
										/>
										<SettingsInput
											label={'State'}
											path={'customerIdentity.state'}
											defaultValue={
												invoice?.customerIdentity?.state
											}
											icon={<MapPin size={20} />}
										/>
										<SettingsInput
											label={'Postal Code'}
											path={'customerIdentity.postalCode'}
											defaultValue={
												invoice?.customerIdentity
													?.postalCode
											}
											icon={<MapPin size={20} />}
										/>
										<SettingsInput
											label={'Country'}
											path={'customerIdentity.country'}
											defaultValue={
												invoice?.customerIdentity
													?.country
											}
											icon={<MapPin size={20} />}
										/>
									</Flex>
								</Grid>

								{/* Line Items */}
								<Flex
									direction='column'
									gap='4'
									className='static'
								>
									<Heading
										size='4'
										className='!mt-6 text-[#3D57C8]'
									>
										Line Items
									</Heading>
									<Flex direction={'column'} gap={'4'}>
										{invoice.lineItems?.map((item, i) => (
											<LineItem
												key={i}
												item={item}
												index={i}
											/>
										))}
									</Flex>
									<Button
										variant='soft'
										size={'3'}
										type='button'
										onClick={() => {
											invoice.addLineItem()
										}}
									>
										Add Item
									</Button>
									<Grid columns='2' gap='6'>
										<SettingsArea
											label={'Memo'}
											path={'memo'}
											defaultValue={invoice?.memo}
											icon={<Notebook size={20} />}
										/>
										<Flex direction='column' gap='3'>
											<SettingsInput
												label={'Discount %'}
												path={'discount'}
												defaultValue={invoice?.discount?.toString()}
												icon={<Percent size={20} />}
											/>
											<SettingsInput
												label={'Shipping Fee'}
												path={'shippingFee'}
												defaultValue={invoice?.shippingFee?.toString()}
												icon={<Truck size={20} />}
											/>
											<SettingsInput
												label={'Tax Rate %'}
												path={'taxRate'}
												defaultValue={invoice?.taxRate?.toString()}
												icon={<Percent size={20} />}
											/>
										</Flex>
									</Grid>
								</Flex>
							</Flex>
						</Box>
						<Preview />
					</Form.Form>
				</Container>
			</Section>
			<Section className='max-sm:hidden'>
				<Container>
					<WebFooter />
				</Container>
			</Section>
		</div>
	)
}

export type LineItemProps = {
	item: any
	index: number
}

export function LineItem({ item, index }: LineItemProps) {
	return (
		<Flex direction={'column'} gap={'4'}>
			<Grid columns='3' gap='4'>
				<SettingsInput
					label={'Item Name'}
					path={`lineItems[${index}].name`}
					defaultValue={item.name}
					icon={<ShoppingCart size={20} />}
				/>
				<SettingsInput
					label={'Quantity'}
					path={`lineItems[${index}].quantity`}
					defaultValue={item.quantity?.toString()}
					type='number'
					icon={<Package size={20} />}
				/>
				<SettingsInput
					label={'Price'}
					path={`lineItems[${index}].unitPrice`}
					defaultValue={item.unitPrice?.toString()}
					type='number'
					icon={<Receipt size={20} />}
				/>
			</Grid>
		</Flex>
	)
}
