import {expect} from 'chai';
import r, {Range, range} from '../src/index.js';

describe('lazyrange module', function() {

    describe('importing', function() {

        it('should export the range function by default', function() {
            expect(r.name).to.equal('range');
        });

        it('should export the class and alias for object dereferencing', function() {
            expect(range.name).to.equal('range');
            expect(Range.name).to.equal('Range');
        });
    });

    describe('construction', function() {

        it('should throw if a non-integer start is passed', function() {
            expect(range.bind(null, .5)).to.throw;
        });

        it('should throw if a non-integer end is passed', function() {
            expect(range.bind(null, 0, .5)).to.throw;
        });

        it('should throw if a non-integer step is passed', function() {
            expect(range.bind(null, 0, 5, .5)).to.throw;
        });

        it('should throw if a step of zero is passed', function() {
            expect(range.bind(null, 0, 5, 0)).to.throw;
        });

        it('should create a range when valid arguments are provided', function() {
            let r = range(0, 5, 2);
            expect(r).to.be.instanceof(Range);
            expect(r.start).to.equal(0);
            expect(r.end).to.equal(5);
            expect(r.step).to.equal(2);
        });

        it('should default step to 1', function() {
            let r = range(0, 5);
            expect(r.start).to.equal(0);
            expect(r.end).to.equal(5);
            expect(r.step).to.equal(1);
        });

        it('should use first argument as end when only one argument is passed', function() {
            let r = range(5);
            expect(r.start).to.equal(0);
            expect(r.end).to.equal(5);
            expect(r.step).to.equal(1);
        });
    });

    describe('iteration', function() {

        it('should be iterable with a for-of loop', function() {
            let r = range(5),
                count = 0;

            for (let i of r) {
                count++;
            }

            expect(count).to.equal(5);
        });

        it('should iterate by steps', function() {
            let r = range(0, 5, 2),
                count = 0;

            for (let i of r) {
                count++;
            }

            expect(count).to.equal(3);
        });

        it('should be able to iterate in reverse', function() {
            let r = range(5, 0, -1),
                count = 0,
                last;

            for (let i of r) {
                count++;
                last = i;
            }

            expect(last).to.equal(1);
            expect(count).to.equal(5);
        });

    });

    describe('methods', function() {

        describe('toArray/toJSON', function() {

            it('should return an array', function() {
                expect(range(0, 5).toArray()).to.deep.equal([0, 1, 2, 3, 4]);
            });

            it('should behave the same between toArray and toJSON', function() {
                let r = range(0, 5);
                expect(r.toArray()).to.deep.equal(r.toJSON());
                expect(r.toArray()).to.not.equal(r.toJSON());
            });

            // https://docs.python.org/2/library/functions.html#range
            it('should match the python examples', function() {
                expect(range(10).toArray()).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                expect(range(1, 11).toArray()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                expect(range(0, 30, 5).toArray()).to.deep.equal([0, 5, 10, 15, 20, 25]);
                expect(range(0, 10, 3).toArray()).to.deep.equal([0, 3, 6, 9]);
                expect(range(0, -10, -1).toArray()).to.deep.equal([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
                expect(range(0).toArray()).to.deep.equal([]);
                expect(range(1, 0).toArray()).to.deep.equal([]);
            });
        });

        describe('length getter', function() {

        });

        describe('map', function() {

            it('should pass the value and index to the callback', function() {
                function check(v, i) {
                    expect(v).to.equal(5);
                    expect(i).to.equal(0);
                }

                range(5, 6).map(check);
            });

            it('should return a mapped array', function() {
                function square(n) { return Math.pow(n, 2); }
                expect(range(5).map(square)).to.deep.equal([0, 1, 4, 9, 16]);
            });
        });

        describe('reduce', function() {

            it('should pass the memo, value, and index to the callback', function() {
                function check(m, v, i) {
                    expect(m).to.equal(1);
                    expect(v).to.equal(5);
                    expect(i).to.equal(0);
                }

                expect(range(5, 6).reduce(check, 1));
            });

            it('should reduce a range to a single value', function() {
                function sum(m, n) { return m + n; }
                expect(range(5).reduce(sum, 0)).to.equal(10);
            });
        });

        describe('each/forEach', function() {

            it('should pass the value and index to the callback', function() {
                function check(v, i) {
                    expect(v).to.equal(5);
                    expect(i).to.equal(0);
                }

                range(5, 6).map(check);
            });

            it('should return nothing', function() {
                expect(range(5).each(function(){})).to.equal(undefined);
            });

        });
    });
});
