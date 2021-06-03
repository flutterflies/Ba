import { Client } from 'discord.js'
import { Event } from './event'
import { Logger } from '../utils/logger'
import { createConnection } from 'typeorm'

/**
 * Fired when the bot's "ready" event is triggered.
 *
 * Used for:
 *  - Establishing a database conntection.
 *  - Setting the bot's activity.
 */
export const ReadyEvent: Event = {
  eventName: 'ready',
  handle: async (client: Client) => {
    // Establish connection to the database.
    try {
      await createConnection()
    } catch (error) {
      const errorMessage: string = error.toString()
      Logger.error(`An error occured while connecting to the database: ${errorMessage}`)
      process.exit()
    }

    // Set the bot's activity
    client.user?.setActivity('?ba help', { type: 'LISTENING' })
  }
}
