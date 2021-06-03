import { Client, Message, PermissionResolvable } from 'discord.js'
import { EmbedUtils } from './embeds'
import { Emote } from '../models/emote'

/**
 * Determines if a messages contails a mention of the bot's user,
 * if so responsed with an info message.
 *
 * @param message The message containing the embed.
 * @param client The bot's client instance.
 */
const handleMention = async (message: Message, client: Client): Promise<void> => {
  if (client.user == null) { return }
  if (message.guild == null) { return } // Ignore DMs
  if (!message.mentions.has(client.user?.id)) { return } // Check for bot mention

  const permissions: PermissionResolvable = [
    'ADD_REACTIONS',
    'READ_MESSAGE_HISTORY',
    'SEND_MESSAGES',
    'USE_EXTERNAL_EMOJIS'
  ]

  const response = await EmbedUtils.createEmbed(message.author, client)
  response.setTitle('Welcome to Ba! 🐑')
    .setDescription('Ba is a bot the looks to spice up your server by adding fun reactions to your messages.')
    .addField('Github (PRs encouraged)', 'https://github.com/asleepysheepy/Ba')
    .addField('Invite Link', client.generateInvite({ permissions }))
  await message.channel.send(response)
}

/**
 * Check the given message for strings that should trigger a reaction.
 *
 * @param message The message to react to.
 * @param client The bot's client instance.
 */
const handleReactions = async (message: Message, client: Client): Promise<void> => {
  if ((client.user != null) && client.user.id === message.author.id) { return } // Ignore messages sent by the bot

  const emotes = await Emote.forToday()

  emotes.forEach((emote) => {
    if (emote.shouldReact(message.content)) {
      message.react(emote.emoji)
        .then(() => {})
        .catch(() => {})
    }
  })
}

export const MessageUtils = {
  handleMention,
  handleReactions
}
