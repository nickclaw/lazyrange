'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = range;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/**
 * Represents an iterable range of numbers
 * @class
 */

var Range = (function () {

    /**
     * Create the range
     * @param {Integer} start
     * @param {Integer=} end
     * @param {Integer=1} step
     */

    function Range(start, end) {
        var step = arguments[2] === undefined ? 1 : arguments[2];

        _classCallCheck(this, Range);

        if (end === undefined) {
            ;

            var _ref = [0, start];
            start = _ref[0];
            end = _ref[1];
        }(0, _assert2['default'])(Number.isInteger(start), 'start must be an integer');
        (0, _assert2['default'])(Number.isInteger(end, 'end must be an integer'));
        (0, _assert2['default'])(Number.isInteger(step, 'step must be an integer'));
        (0, _assert2['default'])(step !== 0, 'step must be nonzero');

        this.start = start;
        this.end = end;
        this.step = step;
    }

    _createClass(Range, [{
        key: 'toArray',

        /**
         * Converts the range into an array
         * @return {Array}
         */
        value: function toArray() {
            return Array.from(this);
        }
    }, {
        key: 'toJSON',

        /**
         * Converts range to JSON
         * @override
         * @return {Array}
         */
        value: function toJSON() {
            return this.toArray();
        }
    }, {
        key: Symbol.iterator,

        /**
         * Allow lazy iteration
         */
        value: regeneratorRuntime.mark(function value() {
            var ascending, i;
            return regeneratorRuntime.wrap(function value$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        ascending = this.step > 0;
                        i = this.start;

                    case 2:
                        if (!(ascending ? i < this.end : i > this.end)) {
                            context$2$0.next = 8;
                            break;
                        }

                        context$2$0.next = 5;
                        return i;

                    case 5:
                        i += this.step;
                        context$2$0.next = 2;
                        break;

                    case 8:
                    case 'end':
                        return context$2$0.stop();
                }
            }, value, this);
        })
    }, {
        key: 'map',

        //
        // Array-like functions
        //

        /**
         * Map the range to an array
         * @param {Function} callback
         * @return {Array}
         */
        value: function map(callback) {
            var i = 0,
                a = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    a.push(callback(v, i++));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return a;
        }
    }, {
        key: 'reduce',

        /**
         * Reduce the range to a single value
         * @param {Function} callback
         * @param {*=} memo
         * @return {*}
         */
        value: function reduce(callback, memo) {
            var i = 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var v = _step2.value;

                    memo = callback(memo, v, i++);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return memo;
        }
    }, {
        key: 'forEach',

        /**
         * Iterate over each value in the range
         * @param {Function} callback
         */
        value: function forEach(callback) {
            var i = 0;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var v = _step3.value;

                    callback(v, i++);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'each',

        /**
         * Alias for forEach
         */
        value: function each(callback) {
            return this.forEach(callback);
        }
    }, {
        key: 'length',

        /**
         * Expose a length field
         * @return {Integer}
         */
        get: function get() {
            return Math.floor((this.end - this.start) / this.step);
        }
    }]);

    return Range;
})();

function range(start, end, step) {
    return new Range(start, end, step);
}

// export class and alias for dereferencing
// e.g. {range, Range} = require('lazyrange');
range.Range = Range;
range.range = range;
module.exports = exports['default'];
