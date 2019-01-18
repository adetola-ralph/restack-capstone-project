import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { CategoriesCollection } from './styled';
import CategoryItemComponent from './CategoryItemComponent';

import { deleteCategoryAction } from '../store/actions/categoryActions';
import { openEditCategoryModal as openEditCategoryModalAction } from '../store/actions/addEditCategoryAction';

const CategoryCollectionComponent = ({
  categoryItems,
  isAuthenticated,
  deleteCategory,
  openEditCategoryModal,
}) => (
  <CategoriesCollection>
    {
      categoryItems.map(categoryItem => (
        <CategoryItemComponent
          category={categoryItem}
          key={categoryItem._id}
          deleteCategory={deleteCategory}
          editCategory={openEditCategoryModal}
          isAuthenticated={isAuthenticated}
        />
      ))
    }
  </CategoriesCollection>
);

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
        }),
      ),
    }),
  ).isRequired,
  deleteCategory: PropTypes.func.isRequired,
  openEditCategoryModal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ categoryItems, search, auth }) => {
  let filteredCategoryItems;
  const { searchIndexResult, searchValue } = search;
  const { isAuthenticated } = auth;

  if (searchValue) {
    filteredCategoryItems = categoryItems.filter(item => searchIndexResult.includes(item._id));
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

const mapDispatchToProps = dispatch => ({
  deleteCategory: categoryId => dispatch(deleteCategoryAction(categoryId)),
  openEditCategoryModal: categoryId => dispatch(openEditCategoryModalAction(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollectionComponent);
