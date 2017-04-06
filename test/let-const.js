import { expect,assert } from 'chai';

describe('let', function () {
  {
    let a = 10;
    var b = 1;
  };
  it('let 的作用域 a 取值不到 ', function () {
      try {
          expect(a).to.equal(10);
          assert.fail();
      } catch (error) {
        if (error instanceof ReferenceError) {

        } else {
            throw error
        }
      }
  });
  it('let 的作用域 b 外部可以使用', function () {
    expect(b).to.equal(1);
  });
});
