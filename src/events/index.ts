import { InteractionEvent } from './interaction'
import { MessageEvent } from './message'
import { MessageUpdateEvent } from './message-update'
import { ReadyEvent } from './ready'

const eventsList = [
  InteractionEvent,
  MessageEvent,
  MessageUpdateEvent,
  ReadyEvent
]

export const Events = {
  eventsList
}
