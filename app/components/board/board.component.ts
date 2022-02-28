import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, DefaultIterableDiffer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxChessBoardView, MoveChange} from 'ngx-chess-board';
import { Action,Message } from './../../Interface/Message';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterViewInit {

  @ViewChild('board', {static: false}) board!: NgxChessBoardView;

  public isReverseMode = false;
  public lightDisabled!:boolean;
  public darkDisabled!:boolean;

  private isGameOver!:boolean;

  private playerColor!:string;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(queryParams => {

      this.isReverseMode=(queryParams["isReverseMode"]  || "false").toLowerCase() == "true";
    });

    window.addEventListener("message", (event) => {

      if(event.data && event.data.action) {
        var msg = event.data as Message;
        this.onMessageRecieved(msg);
      }

    }, false);

    window.addEventListener('unload', (event) => {
      if(!this.isGameOver) {
        this.saveState();
      }
    });


  }

  ngAfterViewInit():void {

    setTimeout(()=>{
      this.onChessBoardInitialized();
      }, 1000);
  }

  private onChessBoardInitialized() {

    if(this.isReverseMode) {
      this.lightDisabled = true;
      this.playerColor = "black";
    }
    else {
      this.darkDisabled = true;
      this.playerColor = "white";
    }

    this.restoreState();
    //this.board.reset();

    if(this.isReverseMode) {
      this.board.reverse();
    }

  }

  private onMessageRecieved(message:Message) {
    if(message.action == Action.RESET) {
      this.board.reset();
      if(this.isReverseMode) {
        this.board.reverse();
      }
    }
    else if(message.action == Action.GAMEOVER) {
      this.isGameOver = true;
    }
    else if(message.action == Action.PLAYERMOVE) {
      this.onOpponentMove(message.data);
    }
  }


  private onOpponentMove(move:string) {
    this.board.move(move);
  }


  public moveCallback(move: MoveChange): void {

    let msg = new Message();
    msg.action = Action.PLAYERMOVE;
    msg.data = move;

    window.parent.postMessage(msg);

  }


  private saveState() {
    var storage = this.getStorage();
    storage.setItem(this.getStorageConfigKey(),this.board.getFEN());
  }

  private restoreState() {
    var storage = this.getStorage();
    var key = this.getStorageConfigKey();
    if(storage.getItem(key)) {
      var moves = storage.getItem(key) as string;
      this.board.setFEN(moves);
    }
  }

  private getStorage() :Storage {
    return window.localStorage;
  }

  private getStorageConfigKey() :string {
    return `board${this.getId()}Moves`;
  }

  private getId():string {
    return window.name;
  }



}
