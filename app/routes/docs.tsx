import type { Route } from './+types/home'
import {
	Box,
	Button,
	Card,
	Code,
	Container,
	Grid,
	Heading,
	Link,
	Section,
	Slider,
	Tabs,
	Text
} from '@radix-ui/themes'
import { CodeBlock } from 'react-code-blocks'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Docs - invo.dev' },
		{ name: 'description', content: 'Read the docs for Invo.dev' }
	]
}

export const example = `const response = await fetch('https://invo.dev/api/new', {\n\tmethod: "post",\n\tbody: formData,\n\theaders: {\n\t\t'Content-Type': 'application/x-www-form-urlencoded',\n\t\t'Authorization': 'Bearer token'\n }})`
export const exampleHeaders = `{\n\t"Content-Type": "application/pdf",\n\t"Content-Disposition": "attachment; filename='INVOICENUMBER.pdf'"\n}`

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
							You can make feature suggestions or bug reports by
							emailing us at{' '}
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
							The tool uses your submission to render a real, high
							quality PDF with Cloudflare's Browser Rendering API.
							Many popular PDF rendering solutions get this wrong
							by just rendering the content to an image,
							rasterizing every element to be opaque and
							unselectable. This is due to them attempting to
							render in a browser constrained environment. <br />
							<br />
							Invo.dev circumvents these constraints by utilizing
							a headless cloud browser environment to print a
							sized page to PDF automatically without any hacks.
							{/* <br />
							<br />
							This also sets Invo.dev up as a great platform for
							automated invoice generation as we can provide you
							PDFs asyncronously and in bulk. */}
						</Text>
						{/* <h2 className='mt-10 mb-4 text-2xl'>API</h2>
						<Text>
							Invo.dev offers a simple API for programmatic
							invoice pdf creation. To use the endpoint you'll
							need to register for an access token. This API is
							free to use at a rate limit of 100 requests per
							month. We plan to introduce a paid tier in the near
							future to support higher limits.
						</Text>
						<br />
						<br />
						<Text>Available endpoints:</Text>
						<br />
						<Text>
							<Code>POST</Code>
							<Code>https://invo.dev/api/new</Code>
							<br />
						</Text>
						<br />
						<Text>
							To use this endpoint make a post request containing
							the appropriate form data.
						</Text>
						<br />
						<br />
						<Text>Example:</Text>
						<CodeBlock
							text={example}
							language={'js'}
							showLineNumbers={true}
							wrapLines
						/>
						<br />
						<Text>
							<br />
							A successful request will result in these response
							these headers along with a pdf blob.
							<br />
							<br />
							<CodeBlock
								text={exampleHeaders}
								language={'json'}
								showLineNumbers={true}
								wrapLines
							/>
						</Text> */}
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
