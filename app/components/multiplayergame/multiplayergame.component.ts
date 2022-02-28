import { Action,Message } from './../../Interface/Message';
import { Component, OnInit } from '@angular/core';
import {MoveChange} from 'ngx-chess-board';


@Component({
  selector: 'app-multiplayergame',
  templateUrl: './multiplayergame.component.html',
  styleUrls: ['./multiplayergame.component.css']
})
export class MultiplayergameComponent implements OnInit {

  constructor() { }

  private isGameEnded!: boolean;

  ngOnInit(): void {
    this.addWindowEventListeners();

  }

  public handleframeload() {
    console.log('frame loaded');
    alert('load');
  }

  private addWindowEventListeners() {

    window.addEventListener("message", (event) => {

      if(event.data && event.data.action) {
        let msg = event.data as Message;
        let moveData =msg.data as MoveChange;

        this.handlePlayerMove(msg.data.move,(event.source as Window).name);

        if(moveData.checkmate && !this.isGameEnded) {
          this.onCheckMate();
        }
      }

    }, false);

  }

  private onCheckMate(){
    this.isGameEnded = true;

    var msgesToSend = new Array();
    let gameOverMessage = new Message();
    gameOverMessage.action = Action.GAMEOVER;

    msgesToSend.push(gameOverMessage);

    if (confirm("Checkmate! Do you want to reset the board? Press Ok to reset, cancel to return back.")) {
      let msg = new Message();
      msg.action = Action.RESET;
      msgesToSend.push(msg);
    }

    var frames = window.frames;
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      msgesToSend.forEach( (msg,idx)=>frame.postMessage(msg) );
    }

  }

  private handlePlayerMove(move:string,player:string) {

    var frames = window.frames; // or // var frames = window.parent.frames;
    let msg = new Message();
    msg.action = Action.PLAYERMOVE;
    msg.data = move;

    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      if(frame.name != player) {

        frame.postMessage(msg);
      }
    }
  }

}
