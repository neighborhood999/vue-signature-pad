import { checkSaveType } from '../';

describe('checkSaveType', () => {
  it('should return true when given valid type', () => {
    const validType1 = 'image/png';
    const validType2 = 'image/jpeg';
    const validType3 = 'image/svg+xml';

    expect(checkSaveType(validType1)).toBe(true);
    expect(checkSaveType(validType2)).toBe(true);
    expect(checkSaveType(validType3)).toBe(true);
  });

  it('should return false when given invalid type', () => {
    const invalidType = 'text/plain';
    expect(checkSaveType(invalidType)).toBe(false);
  });
});
