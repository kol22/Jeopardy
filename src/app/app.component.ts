
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TileDialogComponent } from './tile-dialog/tile-dialog.component';
import { HttpClient } from '@angular/common/http';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  question: string;
  answer: string;
  textColor: string;
  tileTitle: string;
  answered: boolean;
  type: string;
  answerChoices?: any;
  competency: string;
}

export interface TileResponse {
  data: Tile[];
}

export interface DialogData {
  tileInfo: Tile;
  closeDialog: any;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'jeopardy';

  public tiles: Tile[];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  async ngOnInit() {
    this.http.get<TileResponse>(`${window.location.href}assets/data.json`).subscribe(x => {
      this.tiles = x.data;
    });
  }


  public openDialog(index: number): void {
    if (!this.tiles[index].answered) {
      this.dialog.open(TileDialogComponent, {
        data: {
          tileInfo: this.tiles[index],
          closeDialog: this.closeDialog.bind(this)
        },
        height: '90vh',
        width: '100vw',
        panelClass: 'grid-modal',
        disableClose: true,
      });
    }
  }


  public closeDialog(tile: Tile) {
    this.dialog.closeAll();

  }


}
