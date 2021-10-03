const markov = require('./markov');

let mm;

beforeAll(function() {
    console.log('Starting tests.');
    mm = new markov.MarkovMachine('the cat in the hat');
});

afterAll(function() {
    console.log('Completed tests execution.');
});

describe('makeChains function', function() {
    test('makeChains should create chains that are not null', function() {
        expect(mm.chains).toBeTruthy();
    });

    test('makeChains should create chains with expected keys', function() {
        expect(mm.chains.has('cat')).toEqual(true);
        expect(mm.chains.has('hat')).toEqual(true);
        expect(mm.chains.has('in')).toEqual(true);
        expect(mm.chains.has('the')).toEqual(true);
    });
});

describe('makeText function', function() {
    test('makeText should return a string', function() {
        expect(mm.makeText()).toBeTruthy();
        expect(mm.makeText()).toEqual(expect.any(String));
    });
});