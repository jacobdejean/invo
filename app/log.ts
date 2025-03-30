// log.ts

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

const log = (level: LogLevel, message: string, ...args: any[]) => {
	const timestamp = new Date().toISOString()
	const formattedArgs = args.length ? JSON.stringify(args) : ''
	console.log(`[${timestamp}] [${level}] ${message} ${formattedArgs}`.trim())
}

export default log
