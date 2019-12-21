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