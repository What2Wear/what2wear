(function () {
    var TIMER, convert, convert_lt100, convert_lt1000, convert_lt_max, convert_max, is_lt20, lt20, max, readText, scales, split_rl, tens, trim_zeros, with_scale;
    TIMER = void 0;
    window.onload = function () {
        return readText(':)Hi, I am SentBot, nice to meet you.');
    };
    $('#text').keyup(function (e) {
        if (e.keyCode === 13) {
            return readText(this.value);
        }
    });
    lt20 = [
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fifteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen'
    ];
    tens = [
        '',
        'ten',
        'twenty',
        'thirty',
        'fourty',
        'fifty',
        'sixty',
        'seventy',
        'eightty',
        'ninety'
    ];
    scales = [
        '',
        'thousand',
        'million',
        'billion',
        'trillion',
        'quadrillion',
        'quintillion',
        'sextillion',
        'septillion',
        'octillion',
        'nonillion',
        'decillion'
    ];
    max = scales.length * 3;
    readText = function (text) {
        var loc, read, time, txt;
        loc = 0;
        time = void 0;
        txt = void 0;
        clearTimeout(TIMER);
        txt = text.replace(/([0-9]+?)*/g, function (String) {
            return convert(String);
        });
        txt = txt.replace(/(:D)|(:\))|(\(:)/g, '}');
        txt = txt.replace(/(D:)|(:\()|(\):)/g, '{');
        txt = txt.replace(/(:\|)/g, '`');
        $('.eye').removeClass('happy sad');
        $('#mouth').removeClass('sad');
        $('#output').html('');
        read = function () {
            var symbol, t;
            $('#mouth').removeClass('rest O W AIE L');
            if (loc < txt.length) {
                t = txt.charAt(loc).toLowerCase();
                time = 80;
                symbol = false;
                if (t === 'o') {
                    $('#mouth').addClass('O');
                } else if (t === 'w' || t === 'q' || t === 'u') {
                    $('#mouth').addClass('W');
                } else if (t === 'a' || t === 'i' || t === 'e') {
                    $('#mouth').addClass('AIE');
                } else if (t.match(/\w/)) {
                    $('#mouth').addClass('L');
                } else {
                    $('#mouth').addClass('rest');
                    switch (t) {
                    case ',':
                        time = 400;
                        break;
                    case '}':
                        $('.eye').addClass('happy');
                        $('.eye').removeClass('sad');
                        $('#mouth').removeClass('sad');
                        symbol = true;
                        break;
                    case '{':
                        $('.eye').removeClass('happy');
                        $('#mouth').removeClass('happy');
                        $('.eye').addClass('sad');
                        $('#mouth').addClass('sad');
                        symbol = true;
                        break;
                    case '`':
                        $('.eye').removeClass('happy sad');
                        $('#mouth').removeClass('sad');
                        symbol = true;
                        break;
                    case '~':
                        time = 400;
                        symbol = true;
                    }
                }
                if (!symbol) {
                    $('#output').html($('#output').html() + txt.charAt(loc));
                }
                loc++;
                return TIMER = setTimeout(read, time);
            } else {
                return $('#mouth').addClass('rest');
            }
        };
        return TIMER = setTimeout(read, time);
    };
    convert = function (val) {
        var len;
        len = void 0;
        if (val[0] === '-') {
            return 'negative ' + convert(val.slice(1));
        }
        if (val === '0') {
            return 'zero';
        }
        val = trim_zeros(val);
        len = val.length;
        if (len < max) {
            return convert_lt_max(val);
        }
        if (len >= max) {
            return convert_max(val);
        }
    };
    convert_max = function (val) {
        return split_rl(val, max).map(function (val, i, arr) {
            if (i < arr.length - 1) {
                return convert_lt_max(val) + ' ' + scales.slice(-1);
            }
            return convert_lt_max(val);
        }).join(' ');
    };
    convert_lt_max = function (val) {
        var l;
        l = val.length;
        if (l < 4) {
            return convert_lt1000(val).trim();
        } else {
            return split_rl(val, 3).map(convert_lt1000).reverse().map(with_scale).reverse().join(' ').trim();
        }
    };
    convert_lt1000 = function (val) {
        var l, rem;
        rem = void 0;
        l = void 0;
        val = trim_zeros(val);
        l = val.length;
        if (l === 0) {
            return '';
        }
        if (l < 3) {
            return convert_lt100(val);
        }
        if (l === 3) {
            rem = val.slice(1);
            if (rem) {
                return lt20[val[0]] + ' hundred ' + convert_lt1000(rem);
            } else {
                return lt20[val[0]] + ' hundred';
            }
        }
    };
    convert_lt100 = function (val) {
        if (is_lt20(val)) {
            return lt20[val];
        } else if (val[1] === '0') {
            return tens[val[0]];
        } else {
            return tens[val[0]] + '-' + lt20[val[1]];
        }
    };
    split_rl = function (str, n) {
        if (str) {
            return Array.prototype.concat.apply(split_rl(str.slice(0, -n), n), [str.slice(-n)]);
        } else {
            return [];
        }
    };
    with_scale = function (str, i) {
        var scale;
        scale = void 0;
        if (str && i > -1) {
            scale = scales[i];
            if (scale !== undefined) {
                return str.trim() + ' ' + scale;
            } else {
                return convert(str.trim());
            }
        } else {
            return '';
        }
    };
    trim_zeros = function (val) {
        return val.replace(/^0*/, '');
    };
    is_lt20 = function (val) {
        return parseInt(val, 10) < 20;
    };
}.call(this));