import { ApplicationCommandData, CommandInteraction } from 'discord.js'

/**
 * Command executable by the command handler.
 */
export interface Command {
  /**
   * Data used to create the command with discord
   */
  data: ApplicationCommandData

  /**
   * Function containing the command's logic.
   *
   * @param message The message containing the command.
   * @param args A list of arguments passed to the command.
   */
  execute: (interaction: CommandInteraction) => void
}
