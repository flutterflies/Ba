import { Client, Interaction } from 'discord.js'
import { Commands } from '../commands'
import { Event } from './event'
import { Logger } from '../utils/logger'

export const InteractionEvent: Event = {
  eventName: 'interaction',
  handle: async (interaction: Interaction, client: Client) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!interaction.isCommand()) { return }

    const commandName: string = interaction.commandName
    const command = Commands.commandList.find((c) => c.data.name === commandName)
    if (command == null) { return }

    try {
      command.execute(interaction)
    } catch (error) {
      const errorMessage: string = error.toString()
      await interaction.reply(`An error ocurred executing command: ${commandName}`)
      Logger.error(`Attempted to exectue the command ${commandName} but the following error occured: ${errorMessage}`)
    }
  }
}
