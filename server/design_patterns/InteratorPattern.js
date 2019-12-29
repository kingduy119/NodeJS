
// Implement #1:
const items = [1, "devsage", false, 1.24];

function Iterator() {
  this.items = items;
  this.index = this.items.length - 1;
}

Iterator.prototype = {
  hasNext: function() {
    return this.index >= 0;
  },
  next: function() {
    return this.items[this.index--];
  }
}

const iter = new Iterator(items);
while(iter.hasNext())
  console.log(iter.next());


// Implement #2:
class IteratorClass {
  constructor(data) {
    this._index = 0;
    this._data = data;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if(this._index < this.data.length) {
          return {value: this.data[this._index++], done: false};
        } else {
          this._index = 0;
          return {done: true};
        }
      }
    }
  }
}

function* iteratorUsingGenerator(collection) {
  let nextIndex = 0;
  while(nextIndex < collection.length) {
    yield collection[nextIndex++];
  }
}

const gen = iteratorUsingGenerator(['Hi', 'Hello', 'Bye']);

console.log(gen.next().value); // 'Hi'
console.log(gen.next().value); // 'Hello'
console.log(gen.next().value); // 'Bye'













