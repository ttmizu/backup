function ColorCode() {}
ColorCode.prototype = {
	getR			: function() { return this.r; },
	getG			: function() { return this.g; },
	getB			: function() { return this.b; },
	getHue			: function() { return this.hue; },
	getSaturation	: function() { return this.saturation; },
	getValue		: function() { return this.value; },
	getComplementary: function() {
		//--------
		//  補色
		//--------
		var max = Math.max(this.r, this.g, this.b);
		var min = Math.min(this.r, this.g, this.b);
		return new RgbCode((max - this.r + min), (max - this.g + min), (max - this.b + min));
	},
	getRgbCode		: function(pre) {
		//-------------------------------
		// RGB値(#000000 - #ffffff) を返す
		//-------------------------------
		var code = ('0' + this.r.toString(16)).slice(-2) + 
				   ('0' + this.g.toString(16)).slice(-2) + 
				   ('0' + this.b.toString(16)).slice(-2);

		if (pre) {
			return '#' + code;
		}
		else {
			return code;
		}
	}
}

function RgbCode(r, g, b) {
	if (!(this instanceof RgbCode)) {
		return new RgbCode(r, g, b);
	}

	if (arguments.length == 1) {
		var param = arguments[0];
		if (typeof param == 'number') {
			param = String(param);
		}
		var rgb;
		if (param.substr(0,1) == '#') {
			rgb = param.substr(1);
		}
		else {
			rgb = param;
		}
		r = parseInt(rgb.substr(0,2), 16);
		g = parseInt(rgb.substr(2,2), 16);
		b = parseInt(rgb.substr(4,2), 16);
	}

	if (typeof r == 'string') {
		r = Number(r);
	}
	if (typeof g == 'string') {
		g = Number(g);
	}
	if (typeof b == 'string') {
		b = Number(b);
	}

	this.r = r;
	this.g = g;
	this.b = b;

	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);

	//------------------
	// 色相
	//------------------
	if ((r == g) && (r == b)) {
		// r = g = b
		this.hue = 0;
	}
	else if ((r >= g) && (r >= b)) {
		// r が最大
		this.hue = 60 * (g - b) / (max - min);
	}
	else if ((g >= r) && (g >= b)) {
		// g が最大
		this.hue = 60 * (b - r) / (max - min) + 120;
	}
	else if ((b >= r) && (b >= g)) {
		// b が最大
		this.hue = 60 * (r - g) / (max - min) + 240;
	}

	if (this.hue < 0) {
		this.hue += 360;
	}
	this.hue = Math.round(this.hue);

	//------------------
	// 彩度
	//------------------
	if (max === 0) {
		this.saturation = 0;
	}
	else {
		this.saturation = Math.round(100 * (max - min) / max);
	}

	//------------------
	// 明度
	//------------------
	this.value = Math.round(max * 100 / 255);

}
RgbCode.prototype = new ColorCode();

function HsvCode(hue, saturation, value) {
	// hue は 0 ～ 360
	// saturation, value は 0 ～ 100

	if (!(this instanceof HsvCode)) {
		return new HsvCode(hue, saturation, value);
	}

	if (typeof hue == 'string') {
		hue = Number(hue);
	}
	if (typeof saturation == 'string') {
		saturation = Number(saturation);
	}
	if (typeof value == 'string') {
		value = Number(value);
	}

	this.hue 		= hue;
	this.saturation = saturation;
	this.value 		= value;

	var max = value * 255 / 100;
	var min = max - ((saturation / 100) * max);

	if (hue < 60) {
		this.r = max;
		this.g = (hue / 60) * (max - min) + min;
		this.b = min;
	}
	else if (hue < 120) {
		this.r = ((120 - hue) / 60) * (max - min) + min;
		this.g = max;
		this.b = min;
	} 
	else if (hue < 180) {
		this.r = min;
		this.g = max;
		this.b = ((hue - 120) / 60) * (max - min) + min;
	} 
	else if (hue < 240) {
		this.r = min;
		this.g = ((240 - hue) / 60) * (max - min) + min;
		this.b = max;
	}
	else if (hue < 300) {
		this.r = ((hue - 240) / 60) * (max - min) + min;
		this.g = min;
		this.b = max;
	} 
	else {
		this.r = max;
		this.g = min;
		this.b = ((360 - hue) / 60) * (max - min) + min;
	}

	this.r = Math.round(this.r);
	this.g = Math.round(this.g);
	this.b = Math.round(this.b);
}
HsvCode.prototype = new ColorCode();
