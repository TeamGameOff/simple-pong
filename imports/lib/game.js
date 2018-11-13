
// import { Player } from './player.js';
import { Player1 } from './new_player1.js';
import { Player2 } from './new_player2.js';

class Game {

    constructor(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this._width = width;
        this._height = height;
        this._ctx = canvas.getContext('2d'); // store context to draw something
        this._player1 = new Player1(this._ctx, this._width / 40, this._height / 4); // create a simple player
        this._player2 = new Player2(this._ctx, this._width / 40, this._height / 4); // create a simple player
    }

    play() {
        this._clear(); // clear the whole canvas to draw something new
        this._drawBorder(); // draw a game area border
        this._player1.draw(); // update player1 on each tick
        this._player2.draw(); // update player2 on each tick

        if (this._checkState1() && this._checkState2()) { // check game status : run other tick if player doesn't lose =)
            requestAnimationFrame(this.play.bind(this)); // run play again ~60 times per sec
        } else {
            this._playLose();
        }
    }

    _checkState1() {
        let borders = this._player1.getBorders();
        return (borders.xMin >= 0 &&
            borders.xMax <= this._width &&
            borders.yMin >= 0 &&
            borders.yMax <= this._height);
    }
    _checkState2() {
        let borders = this._player2.getBorders();
        return (borders.xMin >= 0 &&
            borders.xMax <= this._width &&
            borders.yMin >= 0 &&
            borders.yMax <= this._height);
    }

    _playLose() {
        this._ctx.beginPath();
        this._ctx.font = '30px arial';
        this._ctx.fillStyle = 'black';
        this._ctx.fillText("You suck!", this._width / 2, this._height / 2);
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
