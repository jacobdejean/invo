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

export async function createToken() {
	const { result, error } = await unkey.keys.create({
		apiId: 'api_123',
		externalId: 'user_1234',
		meta: {
			hello: 'world'
		},
		expires: 1686941966471,
		ratelimit: {
			async: true,
			duration: 1000,
			limit: 10
		},
		remaining: 1000,
		name: 'Token',
		// refill: {
		//   interval: "monthly",
		//   amount: 100,
		//   refillDay: 15,
		// },
		enabled: true
	})
	if (error) {
		console.error(`Error creatign token: ${error.message}`)
		return null
	}
	console.log(`Created token`)
	return result
}
