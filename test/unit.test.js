import { expect } from 'chai';

import { FlashMessage } from '../'

describe('FlashMessage Unit Test', () => {
  let flashMessage;
  let ctx;
  beforeEach('Init FlashMessage', function () {
    ctx = {
      session: {}
    }
    flashMessage = new FlashMessage(ctx);
  });

  describe('_saveMessage', () => {
    it('shoud save message success', () => {
      flashMessage._saveMessage('danger', 'test message');
      expect(flashMessage._flashMessage)
        .to.deep.equal({ danger: 'test message' });
      expect(flashMessage._session.flashMessage)
        .to.deep.equal({ danger: 'test message' });
    });

    it('shoud save message success if session is null', () => {
      flashMessage._session = null;
      flashMessage._saveMessage('danger', 'test message');
      expect(flashMessage._flashMessage)
        .to.deep.equal({ danger: 'test message' });
    });
  });

  describe('_getMessage', () => {
    it('shoud get message success', () => {
      flashMessage._flashMessage = { danger: 'test message' };
      flashMessage._session.flashMessage = { danger: 'test message' };
      const result = flashMessage._getMessage('danger');
      expect(flashMessage._flashMessage)
        .to.deep.equal({});
      expect(flashMessage._session.flashMessage)
        .to.deep.equal({});
      expect(result)
        .to.deep.equal('test message');
    });

    it('shoud get message success if session is null', () => {
      flashMessage._session = null;
      flashMessage._flashMessage = { danger: 'test message' };
      flashMessage._saveMessage('danger', 'test message');
      const result = flashMessage._getMessage('danger');
      expect(flashMessage._flashMessage)
        .to.deep.equal({});
      expect(result)
        .to.deep.equal('test message');
    });
  });

  describe('set success', () => {
    it('shoud save success message success', () => {
      flashMessage.success = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ success: 'test message' });
      expect(flashMessage._session.flashMessage)
        .to.deep.equal({ success: 'test message' });
    });

    it('shoud save message success if session is null', () => {
      flashMessage._session = null;
      flashMessage.success = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ success: 'test message' });
    });
  });

  describe('get success', () => {
    it('shoud get success message success', () => {
      flashMessage._flashMessage.success = 'test message';
      expect(flashMessage.success)
        .to.equal('test message');
      expect(flashMessage._flashMessage.success)
        .to.equal(undefined);
    });

    it('shoud get undefined if success message not exist', () => {
      flashMessage._flashMessage = {};
      expect(flashMessage.success)
        .to.equal(undefined);
    });
  });

  describe('set notice', () => {
    it('shoud save notice message success', () => {
      flashMessage.notice = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ info: 'test message' });
      expect(flashMessage._session.flashMessage)
        .to.deep.equal({ info: 'test message' });
    });

    it('shoud save message success if session is null', () => {
      flashMessage._session = null;
      flashMessage.notice = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ info: 'test message' });
    });
  });

  describe('get notice', () => {
    it('shoud get notice message success', () => {
      flashMessage._flashMessage.info = 'test message';
      expect(flashMessage.notice)
        .to.equal('test message');
      expect(flashMessage._flashMessage.info)
        .to.equal(undefined);
    });

    it('shoud get undefined if notice message not exist', () => {
      flashMessage._flashMessage = {};
      expect(flashMessage.notice)
        .to.equal(undefined);
    });
  });

  describe('set danger', () => {
    it('shoud save danger message success', () => {
      flashMessage.danger = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ danger: 'test message' });
      expect(flashMessage._session.flashMessage)
        .to.deep.equal({ danger: 'test message' });
    });

    it('shoud save message success if session is null', () => {
      flashMessage._session = null;
      flashMessage.danger = 'test message';
      expect(flashMessage._flashMessage)
        .to.deep.equal({ danger: 'test message' });
    });
  });

  describe('get danger', () => {
    it('shoud get danger message success', () => {
      flashMessage._flashMessage.danger = 'test message';
      expect(flashMessage.danger)
        .to.equal('test message');
      expect(flashMessage._flashMessage.danger)
        .to.equal(undefined);
    });

    it('shoud get undefined if danger message not exist', () => {
      flashMessage._flashMessage = {};
      expect(flashMessage.danger)
        .to.equal(undefined);
    });
  });

  describe('get warning', () => {
    it('shoud get warning message success', () => {
      flashMessage._flashMessage.warning = 'test message';
      expect(flashMessage.warning)
        .to.equal('test message');
      expect(flashMessage._flashMessage.warning)
        .to.equal(undefined);
    });

    it('shoud get undefined if warning message not exist', () => {
      flashMessage._flashMessage = {};
      expect(flashMessage.warning)
        .to.equal(undefined);
    });
  });

  describe('get messages', () => {
    it('shoud get messages success', () => {
      flashMessage._flashMessage.warning = 'test warning message';
      flashMessage._flashMessage.danger = 'test danger message';
      expect(flashMessage.messages)
        .to.deep.equal({
          warning: 'test warning message',
          danger: 'test danger message',
        });
      expect(flashMessage._session.flashMessage)
        .to.deep.equal(null);
    });

    it('shoud get empty messages', () => {
      flashMessage._flashMessage = {};
      expect(flashMessage.messages)
        .to.deep.equal({});
    });

    it('shoud get messages when _session is null', () => {
      flashMessage._flashMessage.warning = 'test warning message';
      flashMessage._flashMessage.danger = 'test danger message';
      flashMessage._session = null
      expect(flashMessage.messages)
        .to.deep.equal({
          warning: 'test warning message',
          danger: 'test danger message',
        });
    });
  });
});
