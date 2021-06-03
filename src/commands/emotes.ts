import { Command } from './command'
import { Emote } from '../models/emote'
import { CommandInteraction } from 'discord.js'

/**
 * Prints a list of all emotes which are active for today.
 */
export const EmotesCommand: Command = {
  data: {
    name: 'emotes',
    description: 'Prints a list of all currently active emotes.',
    defaultPermission: true
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const emotes = await Emote.forToday()

    let returnMessage = 'Today\'s active emotes are:\n'
    emotes.forEach((emote) => {
      returnMessage += `• ${emote.formattedEmoji()} (\`${emote.name}\`)\n`
    })

    await interaction.reply(returnMessage)
  }
}
