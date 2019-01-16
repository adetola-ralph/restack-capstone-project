import lunr from 'lunr';

class SearchService {
  constructor() {
    this.index;
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
  }

  init(array = []) {
    const docs = this.getDocToIndex(array);

    // this in the callback function is the lunr instance
    this.index = lunr(function () {
      // this.field('title');
      this.field('command');
      // this.field('categoryTitle');
      this.ref('categoryid');

      docs.forEach(doc => {
        this.add(doc);
      }, this);
    });
  }

  getDocToIndex(doc) {
    return doc.reduce((prev, curr) => {
      const instructions = curr.instructions.map(instruction =>
        ({ ...instruction, categoryid: curr._id, categoryTitle: curr.title }));
      return prev.concat(instructions);
    }, []);
  }

  search(value = '') {
    if (value) {
      try {
        return this.index.search(`${value}^2 ${value}*^1`);
      } catch (err) {
        console.error(err);
      }
    }

    return this.index.search('');
  }
}

// only one isntace should exist
const SearchServiceFactory = () => {
  let instance;

  if (!instance) {
    instance = new SearchService();
  }

  return instance;
};

export default SearchServiceFactory();
