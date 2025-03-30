import { Button } from '@radix-ui/themes'
import { useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router'

export type WebNav = {}

const links: Array<{
	label: string
	href: string
}> = [
	// {
	//   label: "Features",
	//   href: "#features",
	// },
	// {
	//   label: "Pricing",
	//   href: "#pricing",
	// },
	// {
	//   label: "Docs",
	//   href: "/docs",
	// },
	{
		label: 'Need help?',
		href: '/support'
	},
	{
		label: 'Privacy',
		href: '/privacy'
	}
]

export default function WebFooter() {
	// const navigate = useNavigate();
	const location = useLocation()
	return (
		<footer className='sticky top-0 flex py-12'>
			<ul className='flex flex-col gap-5'>
				{/* <a href="/" className="text-xl font-bold">
          Invo.dev
        </a> */}
				{links.map(link => (
					<Link
						key={link.label}
						to={link.href}
						className={`text-lg ${
							location.pathname === link.href ? 'hidden' : ''
						}`}
					>
						{link.label}
					</Link>
				))}
			</ul>
			<div className='grow' />
			<div>
				{/* <SignedIn>
          <Button onClick={() => navigate("/dashboard")}>
            Dashboard {"->"}
          </Button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut> */}
			</div>
		</footer>
	)
}
