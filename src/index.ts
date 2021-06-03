import { Client, Intents } from 'discord.js'
import { Events } from './events'
import { Logger } from './utils/logger'

/**
 * Registers all the event listeners used by Ba.
 *
 * @param client - The Discord.js client instance
 */
function setupEvents (client: Client): void {
  Events.eventsList.forEach((event) => {
    const handle = (...args: any[]): void => event.handle(...args, client)
    Logger.info(`Registering an handler for ${event.eventName} events.`)
    client.on(event.eventName, handle)
  })
}

/**
 * The main function that starts Ba.
 */
async function startBa (): Promise<void> {
  Logger.info('Welcome to Ba 🐑!')

  const client = new Client({
    intents: Intents.NON_PRIVILEGED
  })

  setupEvents(client)

  try {
    await client.login(process.env.BOT_TOKEN)
  } catch (error) {
    Logger.error('Unable to log in to discord, did you set your bot token?')
    process.exit()
  }

  Logger.info('Successfully logged in to Discord.')
}

startBa().catch((error) => {
  const errorMessage: string = error.toString()
  Logger.error(`Unable to start Ba.\n${errorMessage}`)
  process.exit()
})
