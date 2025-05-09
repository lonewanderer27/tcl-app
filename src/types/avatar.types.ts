export enum SystemAvatarNames {
  Man = "Man",
  ManAlt = "ManAlt",
  Woman = "Woman",
  WomanAlt = "WomanAlt"
}

export interface Avatar {
  name: SystemAvatarNames | string,
  path: string,
  system: boolean,
}
