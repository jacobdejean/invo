import { useUser } from '@clerk/react-router'
import { useEffect, useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { KeyRound } from 'lucide-react'
import { type FetcherWithComponents, useFetcher } from 'react-router'

export type AccessMenuProps = {}

export default function AccessMenu({}: AccessMenuProps) {
	const user = useUser()

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
				<TextField.Root
					id='token'
					size={'3'}
					name={'Token'}
					placeholder='...'
					defaultValue={'.'}
					disabled
					className='clerk-input'
				>
					<TextField.Slot>
						<KeyRound className='mr-2' height={14} width={14} />
					</TextField.Slot>
				</TextField.Root>
				<div className='mt-4 flex gap-4'>
					<CopyToken />
					<button className='h-8 bg-[#FFEBF1] text-[#CB2262] rounded-sm px-3 flex items-center justify-center cursor-pointer'>
						Refresh Token
					</button>
				</div>
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
