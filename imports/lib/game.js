
import { Player1 } from './new_player1.js';
import { Player2 } from './new_player2.js';
import { Ball } from './ball.js';

class Game {

    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this._width = width;
        this._height = height;
        this._ctx = canvas.getContext('2d'); // store context to draw something
        this._player1 = new Player1(this._ctx, this._width / 50, this._height / 5); // create player1
        this._player2 = new Player2(this._ctx, this._width / 50, this._height / 5); // create player2
        this._ball = new Ball(this._ctx, 8, 2, 2); // create ball
    }

    play() {
        this._clear(); // clear the whole canvas to draw something new
        this._drawBorder(); // draw a game area border
        this._player1.draw(); // update player1 on each tick
        this._player2.draw(); // update player2 on each tick
        this._ball.draw(); // update ball on each tick
        

        if (this._checkState()) { // check game status : run other tick if player doesn't lose =)
            requestAnimationFrame(this.play.bind(this)); // run play again ~60 times per sec
            if(this._returnBall()) {
                this._ball._dx = -this._ball._dx
            }
        } else {
            this._playWin();
        }
    }

    


    // checks if ball has hit wall behind a player
    _checkState() {
        let bordersBall = this._ball.getBorders();
        return (
            bordersBall.xMin >= 0 &&
            bordersBall.xMax <= this._width
            );
    }

    // checks if player is able to return the ball
    _returnBall() {
        let bordersPlayer1 = this._player1.getBorders();
        let bordersPlayer2 = this._player2.getBorders();
        let bordersBall = this._ball.getBorders();
        return (
            (bordersBall.xMax == bordersPlayer2.xMin &&
            this._ball._y <= bordersPlayer2.yMax &&
            this._ball._y >= bordersPlayer2.yMin)
            ||
            (bordersBall.xMin == bordersPlayer1.xMax &&
            this._ball._y <= bordersPlayer1.yMax &&
            this._ball._y >= bordersPlayer1.yMin)
            );
    }


    // plays message when a player has won
    _playWin() {
        this._ctx.beginPath();
        this._ctx.font = '30px serif';
        this._ctx.fillStyle = 'green';
        
        if(this._ball._x < this._width / 2) {
        this._ctx.fillText("Player 2 wins!", this._width / 2, this._height / 2);
        } else {
            this._ctx.fillText("Player 1 wins!", this._width / 2, this._height / 2);
        }
    }

    _drawBorder() {
        this._ctx.beginPath();
        this._ctx.rect(0, 0, this._width, this._height);
        this._ctx.stroke();
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._width, this._height); // just clear the whole game area
    }
}


export { Game }