import type { Route } from './+types/home'
import {
	Box,
	Button,
	Card,
	Container,
	Grid,
	Section,
	Slider,
	Tabs,
	Text
} from '@radix-ui/themes'
import WebNav from '~/components/web-nav'
import WebFooter from '~/components/web-footer'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Home - invo.dev' },
		{ name: 'description', content: 'Welcome to Invo.dev!' }
	]
}

export default function Home() {
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
			<Section className='max-sm:!pt-0'>
				<Container>
					<h1 className='mb-4 text-6xl leading-none font-medium max-sm:text-4xl'>
						A <i>simpler</i> way to create
						<br className='max-sm:hidden' /> professional invoices
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
					<div className='mt-6'>
						<a
							href='/new'
							className='rt-reset rt-BaseButton rt-r-size-4 rt-variant-solid rt-Button'
						>
							Get started
						</a>
						{/* <Button size={'4'} disabled>Coming soon</Button> */}
					</div>
				</Container>
			</Section>
			<Section id='persona' className='hidden'>
				<Container>
					<Grid gap={'6'} columns={'2'}>
						<Card className='p-6'>
							<h2 className='mb-4 text-4xl'>Freelancers</h2>
							<Text className='mb-4'>
								Tired of spending hours creating
								professional-looking invoices? Invo.dev helps
								you create beautiful invoices in seconds so you
								can focus on what you do best - your work.
							</Text>
							<div className='mt-4 aspect-square bg-neutral-200' />
						</Card>
						<Card className='p-6'>
							<h2 className='mb-4 text-4xl'>Small Businesses</h2>
							<Text className='mb-4'>
								Need a simple invoicing solution without the
								overhead of complex accounting software?
								Invo.dev provides just what you need - clean,
								professional invoices with minimal effort.
							</Text>
							<div className='mt-4 aspect-square bg-neutral-200' />
						</Card>
					</Grid>
				</Container>
			</Section>
			<Section id='features' className='hidden'>
				<Container>
					<Grid
						columns={'2'}
						gap={'6'}
						className='grid-cols-[0.25fr,0.75fr]'
					>
						<div>
							<h2 className='mb-4 text-4xl'>Features</h2>
							<Text className='mb-4'>
								Invo.dev focuses on simplicity and efficiency,
								helping you create professional invoices with
								minimal effort.
							</Text>
						</div>
						<Grid gap={'2'} columns={'3'}>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									Simple Form Interface
								</h3>
								<Text>
									Create invoices by filling out a
									straightforward form—no complex menus or
									settings.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									Professional PDF Output
								</h3>
								<Text>
									Generate clean, well-formatted PDFs that
									impress clients and ensure timely payments.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									Customizable Templates
								</h3>
								<Text>
									Choose from elegant templates that can be
									adjusted to match your brand identity.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									Line Item Management
								</h3>
								<Text>
									Easily add, edit, and organize invoice items
									with automatic calculation of totals.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									No Account Required
								</h3>
								<Text>
									Generate invoices instantly without creating
									accounts or sharing unnecessary personal
									information.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									Multiple Currency Support
								</h3>
								<Text>
									Create invoices in your local currency with
									proper formatting and symbols.
								</Text>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Section>
			<Section id='pricing' className='hidden'>
				<Container>
					<Grid gap={'6'} columns={'2'} mb={'6'}>
						<Card className='p-6'>
							<h2 className='mb-4 text-4xl'>Free</h2>
							<Text className='mb-4'>
								<Text className='font-bold'>$0/mo</Text>
								<br />
								Up to 5 invoices per month.
								<br /> Basic templates only
							</Text>
						</Card>
						<Card className='p-6'>
							<h2 className='mb-4 text-4xl'>Pro</h2>
							<Text className='mb-4'>
								<strong>$9.99/mo</strong>
								<br />
								Unlimited invoices.
								<br /> All premium templates included
							</Text>
						</Card>
					</Grid>
					<Card className='p-6'>
						<Text>How many invoices do you need?</Text>

						<Slider defaultValue={[50]} radius='small' />
					</Card>
				</Container>
			</Section>
			<Section id='how-it-works' className='hidden'>
				<Container>
					<Grid
						columns={'2'}
						gap={'6'}
						className='grid-cols-[0.5fr,0.5fr]'
					>
						<div>
							<h2 className='mb-4 text-4xl'>How does it work?</h2>
							<Text className='mb-4'>
								Create professional invoices in three simple
								steps - no accounting knowledge required.
							</Text>
						</div>
						<Grid gap={'2'} columns={'1'}>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									1. Fill out the form
								</h3>
								<Text>
									Enter your business details, client
									information, and line items in our intuitive
									form. Add descriptions, quantities, rates,
									and taxes as needed. Our form adjusts as you
									type to ensure a clean invoice.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									2. Preview your invoice
								</h3>
								<Text>
									See a real-time preview of how your invoice
									will look when downloaded. Make adjustments
									as needed until everything looks perfect.
									Choose from different templates to match
									your style.
								</Text>
							</Card>
							<Card className='p-4'>
								<h3 className='mb-4 text-2xl'>
									3. Download as PDF
								</h3>
								<Text>
									With one click, download your professional
									invoice as a PDF ready to send to clients.
									No watermarks, no hassle - just a clean,
									professional document that helps you get
									paid faster.
								</Text>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Section>
			<Section className='hidden'>
				<Container>
					<div className='flex flex-col items-center'>
						<h2 className='mb-4 text-4xl'>
							Create professional invoices today
						</h2>
						<Text className='mb-4'>
							Stop struggling with complex tools and get paid
							faster with beautiful invoices.
						</Text>
						{/* <Button>Get started </Button> */}
						<Button disabled>Coming soon</Button>
					</div>
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
