import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, Tile } from '../app.component';

@Component({
  selector: 'app-tile-dialog',
  templateUrl: './tile-dialog.component.html',
  styleUrls: ['./tile-dialog.component.css']
})
export class TileDialogComponent implements OnInit {

  public tileInfo: Tile;
  public answerRevealed = false;
  public innerWidth: any;
  public revealStatement: string;
  public exitStatement: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.determineStatements();
    this.tileInfo = this.data.tileInfo;
  }

  public revealAnswer() {
    this.tileInfo.answered = true;
    this.answerRevealed = true;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.revealAnswer();
    } else if (event.code === 'Enter') {
      this.closeDialog();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.determineStatements();
  }

  closeDialog() {
    this.data.closeDialog(this.tileInfo);
  }

  determineStatements() {
    this.revealStatement = this.innerWidth > 780 ? 'Press [ Spacebar ] to reveal answer' : 'Press here to reveal answer';
    this.exitStatement = this.innerWidth > 780 ? 'Press [ Enter ] to exit' : 'Press here to exit';
  }

}
