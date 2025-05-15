import { TalkConstants } from '#enums/talks_enums'
import { DateTime } from 'luxon'

export function isOutOfOpeningHours(start: DateTime, end: DateTime): boolean {
  if (
    start.hour < TalkConstants.START_PLANNING_TIME.hour ||
    end.hour > TalkConstants.END_PLANNING_TIME.hour ||
    (end.hour === TalkConstants.END_PLANNING_TIME.hour &&
      end.minute > TalkConstants.END_PLANNING_TIME.minute)
  ) {
    return true
  }
  return false
}

export function isLunchOverlap(start: DateTime, end: DateTime): boolean {
  const lunchStart = DateTime.fromObject({
    hour: TalkConstants.START_PAUSE_TIME.hour,
    minute: TalkConstants.START_PAUSE_TIME.minute,
  })
  const lunchEnd = DateTime.fromObject({
    hour: TalkConstants.END_PAUSE_TIME.hour,
    minute: TalkConstants.END_PAUSE_TIME.minute,
  })
  if (start < lunchEnd && end > lunchStart) {
    return true
  }
  return false
}

export function isMoreThanMaxDuration(start: DateTime, end: DateTime): boolean {
  const duration = end.diff(start, 'hours').hours
  if (duration > TalkConstants.MAX_DURATION) {
    return true
  }
  return false
}
