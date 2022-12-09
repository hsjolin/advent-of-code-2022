"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringReader = /** @class */ (function () {
    function StringReader(string) {
        this.string = "";
        this.position = 0;
        this.resetPosition = function () {
            this.position = 0;
        };
        this.isEOL = function () {
            return this.position >= this.string.length;
        };
        this.read = function (len) {
            if (this.isEOL()) {
                return null;
            }
            var str = this.string.substring(this.position, this.position + len);
            this.position += len;
            return str;
        };
        this.delete = function (len) {
            this.string =
                this.string.substring(0, this.position) +
                    this.string.substring(this.position + len);
        };
        this.write = function (string) {
            this.string =
                this.string.substring(0, this.position) +
                    string +
                    this.string.substring(this.position);
            this.read(string.length);
        };
        this.peek = function () {
            if (this.isEOL()) {
                return null;
            }
            return this.string[this.position];
        };
        this.readUntil = function (charFunc) {
            if (this.isEOL()) {
                return null;
            }
            var string = "";
            var char = this.peek();
            while (!charFunc(char) && !this.isEOL()) {
                this.read(1);
                string += char;
                char = this.peek();
            }
            return string;
        };
        this.searchLeft = function (searchFunc) {
            var position = this.position;
            while (position > -1 && !searchFunc(this.string[--position])) { }
            return position;
        };
        this.searchRight = function (searchFunc) {
            var position = this.position;
            while (position < this.string.length &&
                !searchFunc(this.string[++position])) { }
            if (position >= this.string.length) {
                return -1;
            }
            return position;
        };
        this.string = string;
    }
    return StringReader;
}());
exports.default = StringReader;
