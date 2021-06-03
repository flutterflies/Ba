import { Client, Message } from 'discord.js'
import { Commands } from '../commands'

/**
 *
 * @param message The message sent to trigger the function call
 * @param client The bot's client instance.
 */
async function handleDeploy (message: Message, client: Client): Promise<void> {
  if (message.content !== ('?ba deployCommands')) { return }

  if (process.env.USERS_WHO_CAN_DEPLOY == null) { return }
  if (!process.env.USERS_WHO_CAN_DEPLOY.includes(message.author.id)) { return }

  // Register commands
  const commandData = Commands.commandList.map((c) => c.data)
  client.application?.commands.set(commandData)
}

export const CommandUtils = {
  handleDeploy
}
