import {expect} from 'chai';
import {
  isPost
} from './';

describe('graffiti util', () => {
  describe('isPost()', () => {
    it('should return true for POST', () => {
      const request = {
        method: 'POST'
      };

      const post = isPost(request);
      expect(post).to.be.ok; // eslint-disable-line
    });

    it('returns false for not GETs', () => {
      const request = {
        method: 'GET'
      };

      const get = isPost(request);
      expect(get).not.to.be.ok; // eslint-disable-line
    });
  });
});
