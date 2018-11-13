var ARROW_MAP = {
    37: 'left',
    39: 'right'
};

class PlayerRightLeft {
    constructor(ctx, width, height) {
        this._ctx = ctx;
        this._width = width;
        this._height = height;
        this._x = 0;
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

        if (arrow === 'left') {
            this._x -= this._speed;
        }
        if (arrow === 'right') {
            this._x += this._speed;
        }
    }
}

export { PlayerRightLeft }
