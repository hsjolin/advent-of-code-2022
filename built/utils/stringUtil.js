var stringUtil = {
    string: '',
    position: 0,
    setString: function (string) {
        this.string = string;
        this.resetPosition();
    },
    resetPosition: function () {
        this.position = 0;
    },
    isEOL: function () {
        return this.position >= this.string.length;
    },
    read: function (len) {
        if (this.isEOL()) {
            return null;
        }
        var str = this.string.substring(this.position, this.position + len);
        this.position += len;
        return str;
    },
    delete: function (len) {
        this.string = this.string.substring(0, this.position)
            + this.string.substring(this.position + len);
    },
    write: function (string) {
        this.string = this.string.substring(0, this.position)
            + string + this.string.substring(this.position);
        this.read(string.length);
    },
    peek: function () {
        if (this.isEOL()) {
            return null;
        }
        return this.string[this.position];
    },
    readUntil: function (charFunc) {
        if (this.isEOL()) {
            return null;
        }
        var string = '';
        var char = this.peek();
        while (!charFunc(char) && !this.isEOL()) {
            this.read(1);
            string += char;
            char = this.peek();
        }
        return string;
    },
    searchLeft: function (searchFunc) {
        var position = this.position;
        while (position > -1 && !searchFunc(this.string[--position])) {
        }
        return position;
    },
    searchRight: function (searchFunc) {
        var position = this.position;
        while (position < this.string.length && !searchFunc(this.string[++position])) {
        }
        if (position >= this.string.length) {
            return -1;
        }
        return position;
    }
};
module.exports = stringUtil;
