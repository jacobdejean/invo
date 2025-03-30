import { Button } from '@radix-ui/themes'
import { useState } from 'react'
import { useFetcher } from 'react-router'
import useInvoiceStore, { type Invoice } from '~/store'
import { BasicInvoice } from './templates/basic'
import posthog from 'posthog-js'

export type PreviewProps = {}

export default function Preview({}: PreviewProps) {
	const invoice = useInvoiceStore()
	return (
		<div className='relative flex min-h-full grow items-start justify-center overflow-hidden p-4'>
			<div className='relative w-full max-w-[595px] overflow-hidden'>
				<div>
					<div className='aspect-[1/1.414] w-full origin-top scale-100 overflow-auto border border-neutral-300 bg-white shadow-lg'>
						<BasicInvoice data={invoice} />
					</div>
					<Button size={'4'} className='!mt-6 !w-full' type='submit'>
						Download invoice
					</Button>
				</div>
			</div>
		</div>
	)
}
