import { TextField } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import type { ReactNode } from 'react'
import useInvoiceStore from '~/store'

type SettingsInputProps = TextField.RootProps & {
	defaultValue: string | undefined
	label: string
	icon: ReactNode
	path: string
}

export default function SettingsInput(props: SettingsInputProps) {
	const invoice = useInvoiceStore()
	return (
		<Form.Field key={props.path} className='FormField' name={props.path}>
			<div
				style={{
					display: 'flex',
					alignItems: 'baseline',
					justifyContent: 'space-between'
				}}
			>
				<Form.Label className='hidden'>{props.label}</Form.Label>
				<Form.Message className='FormMessage' match='valueMissing'>
					Enter value
				</Form.Message>
				<Form.Message className='FormMessage' match='typeMismatch'>
					Invalid value
				</Form.Message>
			</div>
			<Form.Control asChild>
				<TextField.Root
					{...props}
					size={'3'}
					key={props.path}
					name={props.path}
					placeholder={props.label}
					defaultValue={props.defaultValue}
					data-settings-field={true}
					onInput={event => {
						console.log(props.path, event.target.value)
						invoice.setFieldByPath(props.path, event.target.value)
					}}
				>
					<TextField.Slot>{props.icon}</TextField.Slot>
				</TextField.Root>
			</Form.Control>
		</Form.Field>
	)
}
