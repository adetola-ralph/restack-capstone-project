import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { CategoriesCollection } from './styled';
import CategoryItemComponent from './CategoryItemComponent';

class CategoryCollectionComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categoryItems } = this.props;

    return (
      <CategoriesCollection>
        {
          categoryItems.map(categoryItem => (
            <CategoryItemComponent category={categoryItem} key={categoryItem._id} />
          ))
        }
      </CategoriesCollection>
    );
  }
}
CategoryCollectionComponent.propTypes = {
  categoryItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      instructions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          command: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

const mapStateToProps = ({ categoryItems, search }) => {
  let filteredCategoryItems;
  const { searchIndexResult, searchValue } = search;

  if (searchValue) {
    filteredCategoryItems = categoryItems.filter(item =>  searchIndexResult.includes(item._id))
      // the arrangement of some the results are wrong
      // .sort((a, b) => {
      //   return searchIndexResult.indexOf(a._id) - searchIndexResult.indexOf(b._id);
      // });
  }


  return {
    categoryItems: filteredCategoryItems || categoryItems,
  };
};

export default connect(mapStateToProps)(CategoryCollectionComponent);
