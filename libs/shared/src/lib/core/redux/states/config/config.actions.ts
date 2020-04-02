export class SetConfigAction {
  public static readonly type = '[Config] Set configuration item';

  constructor(public key: string, public value: any) {
  }
}
