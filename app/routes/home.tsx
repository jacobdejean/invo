import type { Route } from './+types/home'
import { Suspense, lazy } from 'react'
import {
	Box,
	Button,
	Card,
	Code,
	Container,
	Grid,
	Link,
	Section,
	Slider,
	Tabs,
	Text
} from '@radix-ui/themes'
import { Highlight, themes } from 'prism-react-renderer'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'
import { example, exampleHeaders } from './docs'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Home - invo.dev' },
		{ name: 'description', content: 'Welcome to Invo.dev!' }
	]
}

export default function Home() {
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
			<Section className='!pt-0'>
				<Container>
					<h1 className='mb-8 text-6xl leading-none font-medium max-sm:text-4xl'>
						A <i>simpler</i> way to create
						<br className='max-sm:hidden' /> professional invoices.
					</h1>
					<Box className='max-w-2xl'>
						<Text mb={'4'}>
							Generate beautiful, professional invoices in
							seconds. Invo.dev offers a simple form interface and
							instant PDF downloads—making invoice creation simple
							and elegant for freelancers and small businesses.
							<br />
							<br />
							<p>
								<i>
									Perfect for freelancers and small businesses
									who need a straightforward invoicing
									solution without the complexity.
								</i>
							</p>
						</Text>
					</Box>
					<div className='mt-6 flex gap-4'>
						<a
							href='/new'
							className='rt-reset rt-BaseButton rt-r-size-4 rt-variant-solid rt-Button'
						>
							Create a new invoice
						</a>
						<a
							href='#api'
							className='rt-reset rt-BaseButton rt-r-size-4 rt-variant-soft rt-Button !hidden'
						>
							Explore the API
						</a>
						{/* <Button size={'4'} disabled>Coming soon</Button> */}
					</div>
				</Container>
			</Section>
			<Section className='!pb-0'>
				<Container>
					<h2 className='mb-8 text-3xl leading-none font-medium max-sm:text-2xl'>
						Getting Started
					</h2>
					<Box className='mb-4 max-w-2xl'>
						<Text mb={'4'}>
							Invo.dev provides a streamlined solution for
							creating professional PDF invoices without the
							complexity of full-featured accounting software.
							Designed with simplicity in mind, our platform helps
							freelancers and small businesses create polished
							invoices quickly and efficiently.
							<br />
							<br />
							<p className='mb-4'>To use Invo.dev:</p>
							<ol className='flex flex-col gap-2 list-decimal pl-5'>
								<li>
									Navigate to{' '}
									<Link href='/new'>invo.dev/new</Link>.
								</li>
								<li>
									Complete the invoice form with your business
									and client information.
								</li>
								<li>
									Click "Generate invoice" to create your PDF.
								</li>
								<li>
									Your invoice will automatically download
									within seconds.
								</li>
							</ol>
							<br />
							<br />
							For feature requests or assistance, please contact
							us at{' '}
							<Link href='mailto:support@invo.dev'>
								support@invo.dev
							</Link>
							.
						</Text>
						<br />
					</Box>
				</Container>
			</Section>
			<Section id='api' className='!pb-0'>
				<Container>
					<h2 className='mb-8 text-3xl leading-none font-medium max-sm:text-2xl'>
						How it Works
					</h2>
					<Box className='mb-4 max-w-2xl'>
						<Text>
							Invo.dev leverages Cloudflare APIs to produce
							high-quality, professional PDF documents. Unlike
							many PDF generation tools that simply convert
							content to images (resulting in non-selectable text
							and poor quality), our solution renders true PDFs
							with selectable text and vector graphics.
							<br />
							<br />
							By utilizing a isolated headless browser
							environments, we generate well-formatted PDFs that
							maintain the integrity of the data. This approach
							enables us to support businesses requiring secure,
							scaleable invoicing infrastructure. You can{' '}
							<Link href='mailto:support@invo.dev'>
								reach out
							</Link>{' '}
							for more information on this.
						</Text>
					</Box>
				</Container>
			</Section>
			<Section id='api' className='!pb-0 hidden'>
				<Container>
					<h2 className='mb-8 text-3xl leading-none font-medium max-sm:text-2xl'>
						API
					</h2>
					<Box className='mb-4 max-w-2xl'>
						<Text>
							Invo.dev offers a straightforward API for
							programmatic invoice creation. To access this
							functionality, you'll need to register for an access
							token. The API is available free of charge with a
							limit of 100 requests per month, with paid tiers
							planned for users requiring higher volume.
						</Text>
						<br />
						<br />
						<Text className='font-medium'>
							Available endpoints:
						</Text>
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
						<br />
						<br />
						<Highlight
							theme={themes.oneLight}
							code={example}
							language='ts'
						>
							{({
								className,
								style,
								tokens,
								getLineProps,
								getTokenProps
							}) => (
								<pre style={style} className=''>
									{tokens.map((line, i) => (
										<div
											key={i}
											{...getLineProps({ line })}
										>
											<span>{i + 1} </span>
											{line.map((token, key) => (
												<span
													key={key}
													{...getTokenProps({
														token
													})}
												/>
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
						<br />
						<Text>
							<br />
							A successful request will result in these response
							these headers along with a pdf blob.
							<br />
							<br />
							<Highlight
								theme={themes.oneLight}
								code={exampleHeaders}
								language='json'
							>
								{({
									className,
									style,
									tokens,
									getLineProps,
									getTokenProps
								}) => (
									<pre style={style} className=''>
										{tokens.map((line, i) => (
											<div
												key={i}
												{...getLineProps({ line })}
											>
												<span>{i + 1} </span>
												{line.map((token, key) => (
													<span
														key={key}
														{...getTokenProps({
															token
														})}
													/>
												))}
											</div>
										))}
									</pre>
								)}
							</Highlight>
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
