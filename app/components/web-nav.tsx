import * as Clerk from '@clerk/elements/common'
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/react-router'
import { useState } from 'react'
import { Button, TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { KeyRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export type WebNavProps = {}

const links: Array<{
	label: string
	href: string
}> = [
	{
		label: 'Docs',
		href: '/docs'
	}
	// {
	//   label: "Pricing",
	//   href: "#pricing",
	// },
	// {
	//   label: "Docs",
	//   href: "/docs",
	// },
]

export default function WebNav() {
	// const navigate = useNavigate();
	return (
		<nav className='sticky top-0 flex py-12'>
			<ul className='flex gap-5'>
				<a href='/' className='text-xl font-bold'>
					Invo.dev
				</a>
				{links.map(link => (
					<Link key={link.label} to={link.href} className='text-lg'>
						{link.label}
					</Link>
				))}
			</ul>
			<div className='grow' />
			<div>
				<SignedOut>
					<SignInButton mode='modal'>
						<a className='link cursor-pointer'>Login</a>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton>
						<UserButton.UserProfilePage
							label='API Access'
							url='api-access'
							labelIcon={<KeyRound width={14} height={14} />}
						>
							<CustomPage />
						</UserButton.UserProfilePage>
					</UserButton>
				</SignedIn>
			</div>
		</nav>
	)
}

const DotIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			fill='currentColor'
		>
			<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
		</svg>
	)
}

const CustomPage = () => {
	return (
		<div>
			<div className='cl-header border-b border-b-[#EDEDED] border-solid !pb-4 mb-4'>
				<h1 className='text-base font-bold mt-1'>API Access</h1>
			</div>
			<div>
				<p className='mb-4'>
					This is your secret key. Do not share it with anyone. If you
					suspect that your secret key has been compromised, you
					should create a new key, update your code, then delete
					references to your compromised key.
				</p>
				<Form.Form
					method='get'
					action=''
					className='flex !gap-6 max-lg:flex-col max-lg:items-center'
				>
					<Form.Field className='FormField' name={'Token'}>
						<div
							style={{
								display: 'flex',
								alignItems: 'baseline',
								justifyContent: 'space-between'
							}}
						>
							<Form.Label className='hidden'>Token</Form.Label>
						</div>
						<Form.Control asChild>
							<div>
								<TextField.Root
									size={'3'}
									name={'Token'}
									placeholder='...'
									defaultValue={'Token...'}
									disabled
									className='clerk-input'
								>
									<TextField.Slot>
										<KeyRound
											className='mr-2'
											height={14}
											width={14}
										/>
									</TextField.Slot>
								</TextField.Root>
							</div>
						</Form.Control>
					</Form.Field>
				</Form.Form>
				<div className='mt-4 flex gap-4'>
					<CopyToken />
					<a className='h-8 bg-[#FFEBF1] text-[#CB2262] rounded-sm px-3 flex items-center justify-center cursor-pointer'>
						Refresh Token
					</a>
					{/* <Button size={'4'} disabled>Coming soon</Button> */}
				</div>
				{/* <Clerk.Field name='apiToken'>
					<Clerk.Label>API Token</Clerk.Label>
					<Clerk.Input type='text' value={'asdf'} readOnly />
				</Clerk.Field> */}
			</div>
		</div>
	)
}

function CopyToken() {
	const [copied, setCopied] = useState(false)
	return (
		<a
			className='h-8 bg-[#EEF2FE] text-[#3D57C8] rounded-sm px-3 flex items-center justify-center cursor-pointer'
			onClick={() => {
				navigator.clipboard.writeText('asdf')
				setCopied(true)
			}}
		>
			<span className=''>
				{copied ? <>&nbsp;&nbsp;Copied&nbsp;&nbsp;</> : <>Copy Token</>}
			</span>
		</a>
	)
}
