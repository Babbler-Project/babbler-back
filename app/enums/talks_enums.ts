export enum TalkStatus {
  PENDING = 1,
  APPROVED = 2,
  REFUSED = 3,
}

export class TalkConstants {
  public static readonly MAX_DURATION = 180
  public static readonly START_PLANNING_TIME = { hour: 9, minute: 0 }
  public static readonly END_PLANNING_TIME = { hour: 19, minute: 0 }
  public static readonly START_PAUSE_TIME = { hour: 12, minute: 0 }
  public static readonly END_PAUSE_TIME = { hour: 12, minute: 0 }
  // Vous pourrez ajouter d'autres constantes ici
}
