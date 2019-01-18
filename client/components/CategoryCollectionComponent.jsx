import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { CategoriesCollection } from './styled';
import CategoryItemComponent from './CategoryItemComponent';

import { editCategoryAction, deleteCategoryAction } from '../store/actions/categoryActions';

class CategoryCollectionComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categoryItems, isAuthenticated, deleteCategory, editCategory } = this.props;

    return (
      <CategoriesCollection>
        {
          categoryItems.map(categoryItem => (
            <CategoryItemComponent
              category={categoryItem}
              key={categoryItem._id}
              deleteCategory={deleteCategory}
              editCategory={editCategory}
              isAuthenticated={isAuthenticated} />
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
  deleteCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categoryItems, search, auth }) => {
  let filteredCategoryItems;
  const { searchIndexResult, searchValue } = search;
  const { isAuthenticated } = auth;

  if (searchValue) {
    filteredCategoryItems = categoryItems.filter(item =>  searchIndexResult.includes(item._id))
      // the arrangement of some the results are wrong
      // .sort((a, b) => {
      //   return searchIndexResult.indexOf(a._id) - searchIndexResult.indexOf(b._id);
      // });
  }


  return {
    categoryItems: filteredCategoryItems || categoryItems,
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteCategory: categoryId => dispatch(deleteCategoryAction(categoryId)),
  editCategory: categoryId => dispatch(editCategoryAction(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollectionComponent);
