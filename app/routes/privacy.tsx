import type { Route } from './+types/home'
import { Box, Container, Link, Section, Text } from '@radix-ui/themes'
import WebFooter from '~/components/web-footer'
import WebNav from '~/components/web-nav'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Privacy - invo.dev' },
		{ name: 'description', content: 'Read the privacy policy for Invo.dev' }
	]
}

export default function Privacy() {
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
						Privacy Policy
					</h1>
					<Box className='mb-4 max-w-2xl'>
						<Text>
							Last Updated 3/29/2025
							<br />
							<br />
							<h2 className='text-2xl mb-4 font-semibold'>
								Information Collection and Usage
							</h2>
							<p>
								At Invo.dev, we are committed to protecting your
								privacy and ensuring the security of your data.
								We maintain minimal data collection practices in
								line with our service philosophy.
							</p>
							<br />
							<ul className='flex flex-col gap-2 list-disc pl-5'>
								<li>
									We track basic usage metrics, such as the
									number of invoices generated and site
									visitors, to help us improve our service.
								</li>
								<li>
									We do not store your invoice data on our
									servers.
								</li>
								<li>
									We do not employ session replay
									technologies, user behavior tracking, or
									analytics that could compromise your
									privacy.
								</li>
								<li>
									We do not sell or share your information
									with third parties for marketing purposes.
								</li>
							</ul>
							<h2 className='text-2xl mt-6 mb-4 font-semibold'>
								Data Processing
							</h2>
							<p>
								When you generate an invoice through Invo.dev:
							</p>
							<br />
							<ol className='flex flex-col gap-2 list-decimal pl-5'>
								<li>
									Your invoice information is transmitted
									securely to our service.
								</li>
								<li>
									We process this data temporarily to generate
									your PDF invoice.
								</li>
								<li>
									The PDF is created and delivered directly to
									you via download.
								</li>
								<li>
									Your invoice data is not retained on our
									systems after processing.
								</li>
							</ol>
							<h2 className='text-2xl mt-6 mb-4 font-semibold'>
								Third-Party Services
							</h2>
							<p>
								We utilize a limited number of third-party
								services to maintain our platform:
							</p>
							<br />
							<ul className='flex flex-col gap-2 list-disc pl-5'>
								<li>
									<strong>Posthog:</strong> We use Posthog for
									anonymous visitor counting and basic usage
									analytics. This service employs cookies to
									function properly.
								</li>
								<li>
									<strong>Cloudflare:</strong> We use
									Cloudflare to host our services. Your data
									is processed through their secure
									infrastructure but is not stored
									permanently.
								</li>
							</ul>
							<h2 className='text-2xl mt-6 mb-4 font-semibold'>
								Data Retention
							</h2>
							<p>
								Invo.dev is designed as a stateless service. We
								intentionally avoid storing your invoice data to
								enhance privacy and security. Once your PDF is
								generated and delivered, we do not maintain
								copies of your information.
							</p>
							<h2 className='text-2xl mt-6 mb-4 font-semibold'>
								Contact Information
							</h2>
							<p>
								For privacy concerns, data requests, or any
								other inquiries, please contact us at{' '}
								<Link href='mailto:support@invo.dev'>
									support@invo.dev
								</Link>
								.
							</p>
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
