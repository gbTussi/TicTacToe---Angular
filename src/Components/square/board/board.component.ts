import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="board">
      <div *ngFor="let square of squares; let idx = index" 
           class="square" 
           (click)="makeMove(idx)">
        {{ square }}
      </div>
    </div>
    <p *ngIf="winner">{{ winner }} wins!</p>
    <button (click)="newGame()">New Game</button>
  `,
  styles: [
    `
    :host {
      display: block;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-gap: 5px;
    }
    .square {
      width: 100px;
      height: 100px;
      background: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string = '';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'O' : 'X';
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
