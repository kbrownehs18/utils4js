import { secure, log } from '../src';

describe('secure', () => {
  it('md5', () => {
    const md5str = secure.md5('123456');
    expect(md5str).toEqual('e10adc3949ba59abbe56e057f20f883e');
  });
  it('authcode', () => {
    const name = 'Robbie';
    const encodeName = secure.authcode(name, false);
    expect(name).toEqual(secure.authcode(encodeName, true));
  });
  it('log', () => {
    const logger = new log.Logger('warn');
    logger.info('INOF');
    logger.warn('WARN');
    logger.error('ERROR');
  });
});
