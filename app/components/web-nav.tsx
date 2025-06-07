import * as Clerk from '@clerk/elements/common'
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser
} from '@clerk/react-router'
import { useEffect, useState } from 'react'
import { Button, TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { KeyRound } from 'lucide-react'
import { Link, useFetcher, useNavigate } from 'react-router'
import AccessMenu from './access-menu'

export type WebNavProps = {}

const links: Array<{
	label: string
	href: string
}> = [
	// {
	// 	label: 'Docs',
	// 	href: '/docs'
	// }
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
			<div className='hidden'>
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
							<AccessMenu />
						</UserButton.UserProfilePage>
					</UserButton>
				</SignedIn>
			</div>
		</nav>
	)
}
