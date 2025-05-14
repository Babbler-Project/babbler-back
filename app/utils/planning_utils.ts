import { DateTime } from 'luxon'

export function isOutOfOpeningHours(start: DateTime, end: DateTime): boolean {
  if (start.hour < 9 || end.hour > 19 || (end.hour === 19 && end.minute > 0)) {
    return true
  }
  return false
}

export function isLunchOverlap(start: DateTime, end: DateTime): boolean {
  const lunchStart = DateTime.fromObject({ hour: 12, minute: 0 })
  const lunchEnd = DateTime.fromObject({ hour: 13, minute: 0 })
  if (start < lunchEnd && end > lunchStart) {
    true
  }
  return false
}

export function isMoreThanMaxDuration(start: DateTime, end: DateTime): boolean {
  const duration = end.diff(start, 'hours').hours
  if (duration > 3) {
    return true
  }
  return false
}
