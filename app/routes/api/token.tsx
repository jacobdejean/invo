import { getAuth } from '@clerk/react-router/ssr.server'
import type { Route } from './+types/token'
import { redirect } from 'react-router'
import invariant from 'tiny-invariant'
import { clerkClient } from '~/lib/clerk-backend'
import { createToken, deleteToken, getToken } from '~/lib/unkey'

export async function action(args: Route.ActionArgs) {
	try {
		const { userId } = await getAuth(args)

		if (!userId) {
			return new Response('Unauthenticated', {
				status: 401
			})
		}

		if (args.request.method === 'POST') {
			const key = await createToken(userId)
			if (!key) {
				return new Response('Failed to create access token for user', {
					status: 500
				})
			}

			await clerkClient.users.updateUserMetadata(userId, {
				// public metadata can be viewed but not changed from the frontend
				publicMetadata: {
					unkey_key: key.key
				}
			})

			console.log(`Token: User generated new token. ID ${key.keyId}`)
			return new Response('OK', { status: 200 })
		}
	} catch (err) {
		console.error('Inbox: Error handling webhook:', err)
		return new Response('Error handling webhook', { status: 400 })
	}
}
