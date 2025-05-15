export interface GetPlanningDuringPeriodRequestDTO {
  queries: {
    startDate: string
    endDate: string
  }
}

export interface CreatePlanningRequestDTO {
  startDateTime: Date
  endDateTime: Date
  roomId: number
  talkId: number
}
