import assert from 'assert';

/**
 * Represents an iterable range of numbers
 * @class
 */
export class Range {

    /**
     * Create the range
     * @param {Integer} start
     * @param {Integer=} end
     * @param {Integer=1} step
     */
    constructor(_start, _end, step = 1) {
        const start = _end === undefined ? 0 : _start;
        const end = _end === undefined ? _start : _end;

        assert(Number.isInteger(start), 'start must be an integer');
        assert(Number.isInteger(end, 'end must be an integer'));
        assert(Number.isInteger(step, 'step must be an integer'));
        assert(step !== 0, 'step must be nonzero');

        this.start = start;
        this.end = end;
        this.step = step;
    }

    /**
     * Converts the range into an array
     * @return {Array}
     */
    toArray() {
        return Array.from(this);
    }

    /**
     * Converts range to JSON
     * @override
     * @return {Array}
     */
    toJSON() {
        return this.toArray();
    }

    /**
     * Allow lazy iteration
     */
    *[Symbol.iterator]() {
        const ascending = this.step > 0;

        for (let i = this.start; ascending ? i < this.end : i > this.end; i += this.step) {
            yield i;
        }
    }

    /**
     * Expose a length field
     * @return {Integer}
     */
    get length() {
        return Math.floor((this.end - this.start) / this.step);
    }


    //
    // Array-like functions
    //

    /**
     * Map the range to an array
     * @param {Function} callback
     * @return {Array}
     */
    map(callback) {
        let i = 0;
        const a = [];

        for (const v of this) {
            a.push(callback(v, i++));
        }

        return a;
    }

    /**
     * Reduce the range to a single value
     * @param {Function} callback
     * @param {*=} memo
     * @return {*}
     */
    reduce(callback, _memo) {
        let memo = _memo;
        let i = 0;

        for (const v of this) {
            memo = callback(memo, v, i++);
        }

        return memo;
    }

    /**
     * Iterate over each value in the range
     * @param {Function} callback
     */
    forEach(callback) {
        let i = 0;

        for (const v of this) {
            callback(v, i++);
        }
    }

    /**
     * Alias for forEach
     */
    each(callback) {
        return this.forEach(callback);
    }
}

export function range(start, end, step) {
    return new Range(start, end, step);
}

export default range;
