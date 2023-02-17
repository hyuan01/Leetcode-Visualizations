import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'leetcode';

  constructor(private fb: FormBuilder){}

  public sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  public matrix: Array<boolean>[] = [];
  public result: number[] = [];
  public isRunning: boolean = false;

  public form: FormGroup = this.fb.group({
    rows: new FormControl(3, [Validators.max(9), Validators.min(1)]),
    cols: new FormControl(3, [Validators.max(9), Validators.min(1)])
  });

  public async spiralMatrix() {
    this.isRunning = true;
    // reset program
    this.resetMatrix();

    // set up matrix
    for (let i = 0; i < this.form.value.rows; i++) {
        var column: boolean[] = [];
        for (let j = 0; j < this.form.value.cols; j++) column.push(false);
        this.matrix.push(column);
    }

    // initialize stuff
    let currDir: number = 0;
    let dirX: number[] = [0,1,0,-1];
    let dirY: number[] = [1,0,-1,0];
    let x: number = 0;
    let y: number = 0;
    let res: number[] = []

    // begin traversal
    for (let i = 0; i < (this.form.value.rows * this.form.value.cols); i++) {
      // keep going in a direction until no longer able
      if(x < this.form.value.rows && y < this.form.value.cols && this.matrix[x][y] === false) {
          res.push((y + 1) + (x * this.form.value.cols));
          await this.sleep(50);
          this.matrix[x][y] = true;

          x += dirX[currDir];
          y += dirY[currDir];
      }
      else {
          // reset back in range
          x -= dirX[currDir];
          y -= dirY[currDir];

          // find the direction
          while(this.matrix[x][y] === true) {
              // cycle direction
              if (currDir === 3) currDir = 0;
              else currDir += 1;

              x += dirX[currDir];
              y += dirY[currDir];
          }

          res.push((y + 1) + (x * this.form.value.cols));
          await this.sleep(50);
          this.matrix[x][y] = true;

          x += dirX[currDir];
          y += dirY[currDir];
      }
    }

    this.result = res;
    this.isRunning = false;
  }

  public resetMatrix(): void {
      this.matrix = [];
      this.result = [];
  }
}
