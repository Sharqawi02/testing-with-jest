const stack = require('../src/stack');

beforeEach(() => {
  // Rensa stacken mellan varje test
  let item;
  while ((item = stack.pop()) !== undefined) {}
});
test('clear() tömmer stacken helt', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();                // <-- clear() finns inte än
    expect(stack.peek()).toBeUndefined();
    expect(stack.pop()).toBeUndefined();
  });

test('pop tar bort och returnerar sista elementet (LIFO)', () => {
  stack.push('första');
  stack.push('andra');
  stack.push('tredje');

  expect(stack.pop()).toBe('tredje');
  expect(stack.pop()).toBe('andra');
  expect(stack.pop()).toBe('första');
  // När stacken är tom ska pop() returnera undefined
  expect(stack.pop()).toBeUndefined();
});

test('peek ändrar inte stackens storlek', () => {
  stack.push(100);
  expect(stack.peek()).toBe(100);
  // peek() ska bara titta, inte ta bort
  expect(stack.peek()).toBe(100);
  // Efter två peek är det fortfarande bara ett element
  expect(stack.pop()).toBe(100);
  expect(stack.pop()).toBeUndefined();
});
