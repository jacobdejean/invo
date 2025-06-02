import { verifyWebhook } from '@clerk/react-router/webhooks'
import type { Route } from './+types/inbox'
import invariant from 'tiny-invariant'
import { clerkClient } from '~/lib/clerk-backend'
import { createToken, deleteToken } from '~/lib/unkey'

export async function action({ request, params }: Route.ActionArgs) {
	try {
		const evt = await verifyWebhook(request)
		const { id, public_metadata } = evt.data
		invariant(id, 'Invalid webhook payload')

		if (evt.type === 'user.deleted') {
			console.log(`Inbox: user.deleted ${id}`)
			if ('unkey_key_id' in public_metadata) {
				await deleteToken(public_metadata.unkey_key_id)
			}
		}

		return new Response('OK', { status: 200 })
	} catch (err) {
		console.error('Inbox: Error handling webhook:', err)
		return new Response('Error handling webhook', { status: 400 })
	}
}
