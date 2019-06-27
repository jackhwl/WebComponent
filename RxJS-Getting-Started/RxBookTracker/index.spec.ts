import { TestScheduler } from 'rxjs/testing';
import { expect } from 'chai';

describe('RxBookTracker Tests', () => {
    let scheduler;

    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        expect(actual).deep.equal(expected);
      });
    });

    it('test 1', () => {

    });

    it('test 2', () => {

    });

    it('test 3', () => {

    });
});