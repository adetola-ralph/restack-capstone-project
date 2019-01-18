import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryModal from './CategoryModal';

import { addInstruction, removeInstruction, closeCategoryModal } from '../store/actions/AddEditCategoryAction';

const AddEditCategoryModal = ({ addInstruction, category, removeInstruction, isModalOpen, isNew, closeCategoryModal }) => {
  return (
    <CategoryModal
      isOpen={isModalOpen}
      category={category}
      isNew={isNew}
      addInstruction={addInstruction}
      removeInstruction={removeInstruction}
      closeCategoryModal={closeCategoryModal}
    />
  );
};

AddEditCategoryModal.propTypes = {
  addInstruction: PropTypes.func.isRequired,
  removeInstruction: PropTypes.func.isRequired,
  closeCategoryModal: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        command: PropTypes.string,
      })
    ),
  }),
  isModalOpen: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ addEditCategory }) => {
  const { newCategory, isNew, isModalOpen } = addEditCategory;
  return {
    category: newCategory,
    isModalOpen,
    isNew
  };
};

const mapDispatchToProp = (dispatch) => ({
  addInstruction: () => dispatch(addInstruction()),
  removeInstruction: (index) => dispatch(removeInstruction(index)),
  closeCategoryModal: () => dispatch(closeCategoryModal()),
});

export default connect(mapStateToProps, mapDispatchToProp)(AddEditCategoryModal);

