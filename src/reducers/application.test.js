import reducer from 'reducers/application';

describe('Application reducer function', () => {
  it('throws and error with an unsupported type', () => {
    expect(() => reducer({}, { type: 'null' })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
