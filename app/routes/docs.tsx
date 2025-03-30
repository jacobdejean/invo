import type { Route } from './+types/home'
import {
	Box,
	Button,
	Card,
	Container,
	Grid,
	Heading,
	Link,
	Section,
	Slider,
	Tabs,
	Text
} from '@radix-ui/themes'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Home - invo.dev' },
		{ name: 'description', content: 'Welcome to Invo.dev!' }
	]
}

export default function Docs() {
	return (
		<div className='page-wrapper'>
			<div className='flex justify-center border-b-2 border-dashed border-neutral-300 py-4'>
				<p>
					<strong>Invo.dev is live!</strong>
				</p>
			</div>
			<Section className='max-sm:!pb-0'>
				<Container>
					<WebNav />
				</Container>
			</Section>

			<Section className='!pt-0 !pb-0'>
				<Container>
					<h1 className='mb-4 text-4xl leading-none font-medium max-sm:text-2xl'>
						Invo Docs
					</h1>
					<Box className='mb-4 max-w-2xl'>
						<Text mb={'4'}>
							Invo.dev is a minimal pdf invoice generation tool.
							It's designed to be simple and easy to use, so you
							can focus on what you do. It was born out of a
							personal need to generate PDF invoices without the
							overhead of a full billing solution.
							<br />
							<br />
							You can make feature suggestions my emailing us and
							if you encounter any bugs, please send an email to{' '}
							<Link href='mailto:support@invo.dev'>
								support@invo.dev
							</Link>
							.
						</Text>
						<h2 className='mt-10 mb-4 text-2xl'>Getting Started</h2>
						<Text>
							To get started, simply navigate to{' '}
							<Link href='/new'>invo.dev/new</Link> where you will
							see a form fill. Proceed to enter as many fields as
							you find necessary, and then click the "Generate
							invoice" button. After just a few seconds, a
							download should automatically start.
						</Text>
						<h2 className='mt-10 mb-4 text-2xl'>How it works</h2>
						<Text>
							Invo.dev is as minimal on the backend as it is on
							the frontend. The tool simply packages up your
							submission and renders to a real, high quality PDF
							with Cloudflare. No data is stored in this process
							by any party. The 'real PDF' note is important here,
							as many basic PDF rendering solutions really just
							render the page to an image, rastering every element
							to be opaque and unselectable. Invo.dev goes the
							distance to utilizes browser rendering tech to print
							a sized page to PDF automatically without any hacks
							or tradeoffs.
						</Text>
					</Box>
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
