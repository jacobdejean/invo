export interface VerifiedToken {
	valid: boolean
	[key: string]: unknown
}

export async function checkToken(
	env: Env,
	token: string
): Promise<VerifiedToken | null> {
	const result = await fetch('https://api.unkey.dev/v1/keys.verifyKey', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.UNKEY_ROOT_KEY}`
		},
		body: JSON.stringify({ key: token })
	})

	if (!result.ok) {
		console.error(`Error verifying token: ${result.status}`)
		return null
	}

	const data = (await result.json()) as { valid?: boolean }
	if (!data.valid) {
		return null
	}
	console.log(`Verified token`)
	return data as VerifiedToken
}
