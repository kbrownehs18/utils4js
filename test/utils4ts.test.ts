import { md5, authcode, Logger } from '../src';

describe('secure', () => {
  it('md5', () => {
    const md5str = md5('123456');
    expect(md5str).toEqual('e10adc3949ba59abbe56e057f20f883e');
  });
  it('authcode', () => {
    const name = 'Robbie';
    const encodeName = authcode(name, false);
    expect(name).toEqual(authcode(encodeName, true));
  });
  it('log', () => {
    const logger = new Logger('warn');
    logger.info('INOF');
    logger.warn('WARN');
    logger.error('ERROR');
  });
});
