import { Data } from "@angular/router";

export enum Action {
  RESET =1,
  PLAYERMOVE,
  GAMEOVER
}

export class Message {
  public action!: Action;
  public data!:any;
}
