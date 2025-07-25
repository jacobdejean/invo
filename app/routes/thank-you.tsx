import type { Route } from './+types/home'
import {
	Box,
	Button,
	Container,
	Flex,
	Link,
	Section,
	Text,
	TextArea,
	TextField
} from '@radix-ui/themes'
import { Form } from 'radix-ui'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Support - invo.dev' },
		{ name: 'description', content: 'Get support for Invo.dev' }
	]
}

export default function Support() {
	return (
		<div className='page-wrapper'>
			{/* <div className='flex justify-center border-b-2 border-dashed border-neutral-300 py-4'>
				<p>
					<strong>Invo.dev is live!</strong>
				</p>
			</div> */}

			<Section className='max-sm:!pb-0'>
				<Container>
					<WebNav />
				</Container>
			</Section>

			<Section className='!pt-0 !pb-0'>
				<Container>
					<h1 className='mb-4 text-4xl leading-none font-medium max-sm:text-2xl'>
						Your submission was received.
					</h1>
					<Box className='mb-4 max-w-2xl'>
						<Text mb={'4'}>
							Thank you for your inquiry, we'll follow up as soon
							as we can.
							<br />
							<br />
							<Link href='mailto:support@invo.dev'>
								support@invo.dev
							</Link>
						</Text>
					</Box>
				</Container>
			</Section>

			<Section className='!pt-0 max-sm:!pb-0'>
				<Container>
					<Form.Form
						action={'/api/inbox'}
						method='POST'
						className='invoice-settings flex !gap-6 max-lg:flex-col max-lg:items-center'
					>
						<Box className='flex pt-4 pb-4 items-stretch flex-none w-full max-w-[480px] relative'>
							<Flex
								direction='column'
								gap='0'
								className='max-h-full'
							>
								<Flex direction='column' gap='4'>
									<TextField.Root
										name='contact-name'
										placeholder='Your name'
										size='3'
									></TextField.Root>
									<TextField.Root
										name='contact-email'
										placeholder='Your email'
										size='3'
									></TextField.Root>
									<TextArea
										size='3'
										placeholder='Your message'
									/>
									<Box>
										<Button size='4' type='submit'>
											Send Message
										</Button>
									</Box>
								</Flex>
							</Flex>
						</Box>
					</Form.Form>
				</Container>
			</Section>

			<Section>
				<Container>
					<WebFooter />
				</Container>
			</Section>
		</div>
	)
}
