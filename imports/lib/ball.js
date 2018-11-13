import { Game } from './game.js'

class Ball {

	constructor (ctx, radius, dx, dy) {
		this._ctx = ctx;
        this._radius = radius;
        this._x = 300;
        this._y = 150;
        this._dx = dx;
        this._dy = dy;
	}

	draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._x, this._y, this._radius, 0, 6);
        this._ctx.fillStyle = 'black';
        this._ctx.fill();
        
        
        //reflects ball top & bottom
        if(this._y + this._dy < this._radius || this._y + this._dy > 300 - this._radius) {
            this._dy = -this._dy;
        }

        this._x += this._dx;
        this._y += this._dy;

    }


    getBorders() {
        return {
            xMin: this._x - this._radius,
            xMax: this._x + this._radius,
            yMin: this._y - this._radius,
            yMax: this._y + this._radius,
        }
    }

}

export { Ball }