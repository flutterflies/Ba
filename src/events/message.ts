import { Client, Message } from 'discord.js'
import { CommandUtils } from '../utils/commands'
import { Event } from './event'
import { MessageUtils } from '../utils/messages'

/**
 * Fired when a new message is posted.
 *
 * Used for:
 *  - Responsing to mentions
 *  - Adding reactions to messages
 */
export const MessageEvent: Event = {
  eventName: 'message',
  handle: async (message: Message, client: Client): Promise<void> => {
    await CommandUtils.handleDeploy(message, client)
    await MessageUtils.handleMention(message, client)
    await MessageUtils.handleReactions(message, client)
  }
}
