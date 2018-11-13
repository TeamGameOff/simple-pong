var ARROW_MAP = {
    40: 'up',
    38: 'down'
};

class Player2 {
    constructor(ctx, width, height) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._x = 600 - this._width;
        this._y = 0;
        this._speed = 5; //set default player speed
        document.addEventListener('keydown', this.keydown.bind(this)) //
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.rect(this._x, this._y, this._width, this._height);
        this._ctx.fillStyle = 'black';
        this._ctx.fill();
    }

    getBorders() {
        return {
            xMin: this._x,
            xMax: this._x + this._width,
            yMin: this._y,
            yMax: this._y + this._height,
        }
    }

    keydown(e) {
        let arrow = ARROW_MAP[e.keyCode];

        if (arrow === 'up') {
            this._y += this._speed;
        }
        if (arrow === 'down') {
            this._y -= this._speed;
        }
    }
}

export { Player2 }
