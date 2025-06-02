import { Unkey, verifyKey } from '@unkey/api'

const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY })

export async function checkToken(token: string) {
	const { result, error } = await verifyKey(token)
	if (error) {
		console.error(`Error verifying token: ${error.message}`)
		return null
	}
	if (!result.valid) {
		return null
	}
	console.log(`Verified token`)
	return result
}

export async function createToken(userId: string) {
	const { result, error } = await unkey.keys.create({
		apiId: process.env.UNKEY_API_ID,
		externalId: userId,
		expires: 1686941966471,
		ratelimit: {
			async: true,
			duration: 2629800000,
			limit: 100
		},
		remaining: 1000,
		name: `${userId}'s Token`,
		// refill: {
		//   interval: "monthly",
		//   amount: 100,
		//   refillDay: 15,
		// },
		enabled: true
	})
	if (error) {
		console.error(`Unkey: Error creating token: ${error.message}`)
		return null
	}
	console.log(`Unkey: Created token`)
	return result
}

export async function deleteToken(keyId: string) {
	const { result, error } = await unkey.keys.delete({
		keyId,
		permanent: true
	})
	if (error) {
		console.error(`Unkey: Error deleting token: ${error.message}`)
		return null
	}
	console.log(`Unkey: Deleted token`)
	return result
}
