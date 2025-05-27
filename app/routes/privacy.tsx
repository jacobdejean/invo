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
						Privacy Policy
					</h1>
					<Box className='mb-4 max-w-2xl'>
						<Text>
							Last Updated 3/29/2025
							<br />
							<br />
							What kind of information we collect?
							<strong>
								We track the number of times this website has
								been used to generate an invoice. We do not
								track, analyze, ,
							</strong>
							<br />
							<br />
							<p className='mb-2'>
								What third parties see my data?
							</p>
							<ul className='flex flex-col gap-2'>
								<li>
									- We anonymously count the number of
									visitors to our site and the number of
									submissions we process via{' '}
									<Link href='https://posthog.com/'>
										Posthog
									</Link>
									. Cookies are used for this.
								</li>
								<li>
									- We compile your submission and render it
									with a{' '}
									<Link href='https://www.cloudflare.com/'>
										Cloudflare
									</Link>{' '}
									API. Your invoice data is not stored for any
									amount of time on our infrastructure.
								</li>
							</ul>
							<br />
							<br />
							For any concerns and requests, please contact us at{' '}
							<Link href='mailto:support@invo.dev'>
								support@invo.dev
							</Link>
							.
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
