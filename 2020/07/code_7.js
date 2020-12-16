const { group } = require('console');
const { readFile } = require('fs/promises');
const path = require('path').join(__dirname, 'input.txt');
(async function main() {
  const sampleData = `
  light red bags contain 1 bright white bag, 2 muted yellow bags.
  dark orange bags contain 3 bright white bags, 4 muted yellow bags.
  bright white bags contain 1 shiny gold bag.
  muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
  shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
  dark olive bags contain 3 faded blue bags, 4 dotted black bags.
  vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
  faded blue bags contain no other bags.
  dotted black bags contain no other bags.`;
  const puzzleInput = await readFile(path, {
    encoding: 'utf-8',
  });
  const responseText = sampleData.trim().split('\n');
  /* 
    1 ) represent the graph in the form of an object of objects
  
    2 ) find the transpose of this graph
  */
  const bagGraph = {};
  for (const rule of responseText) {
    const re = /(.+) bags contain (.+)\./;
    const [_, outerBag, innerBagList] = rule.match(re);
    const innerBags = {};
    // loop again
    if (innerBagList !== 'no other bags') {
      for (const innerBag of innerBagList.split(',')) {
        const [_, numString, innerColor] = innerBag.match(/(\d+) (.+) bag/);
        console.log({ numString, innerColor });
      }
    }
    bagGraph[outerBag] = innerBags;
  }
})();
