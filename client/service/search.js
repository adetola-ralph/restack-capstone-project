import lunr from 'lunr';

class SearchService {
  constructor() {
    this.index = null;
    this.builder = null;
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
  }

  init(array = []) {
    const docs = SearchService.getDocToIndex(array);
    const self = this;

    // this in the callback function is the lunr instance
    this.index = lunr(function buiderInitialiser() {
      // self.builder = this;
      this.field('command');
      this.ref('categoryid');
    });

    docs.forEach((doc) => {
      this.index.add(doc);
    });
  }

  static getDocToIndex(doc) {
    return doc.reduce((prev, curr) => {
      const instructions = curr.instructions.map(instruction => ({
        ...instruction,
        categoryid: curr._id,
        categoryTitle: curr.title,
      }));
      return prev.concat(instructions);
    }, []);
  }

  search(value = '') {
    if (value) {
      try {
        console.log(this.index)
        return this.index.search(`${value} ${value}* *${value}`);
      } catch (err) {
        console.error(err);
      }
    }

    return this.index.search('');
  }

  addDocumentToIndex(document) {
    const docs = SearchService.getDocToIndex(document);

    docs.forEach((doc) => {
      this.index.add(doc);
    });
  }

  removeDocumentFromIndex(document) {
    if (!document._id) {
      return;
    }

    const documentToRemove = {
      categoryid: document._id,
    };

    this.index.remove(documentToRemove);
  }

  updateDocumentInIndex(document) {
    const docs = SearchService.getDocToIndex(document);
    this.index.update(docs[0]);
  }
}


// only one instance should exist
const SearchServiceFactory = () => {
  let instance;

  if (!instance) {
    instance = new SearchService();
  }

  return instance;
};

export default SearchServiceFactory();
