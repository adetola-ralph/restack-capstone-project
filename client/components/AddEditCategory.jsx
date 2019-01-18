import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryModal from './CategoryModal';

import {
  addCategory,
  editCategory,
  addInstruction,
  removeInstruction,
  closeCategoryModal,
  setInstructionField,
  setCategoryTitleField,
} from '../store/actions/addEditCategoryAction';

const AddEditCategoryModal = ({ addInstruction, category, removeInstruction, isModalOpen, isNew, closeCategoryModal, setInstructionField, setCategoryTitleField, addCategory, editCategory }) => {
  return (
    <CategoryModal
      isOpen={isModalOpen}
      category={category}
      isNew={isNew}
      addInstruction={addInstruction}
      removeInstruction={removeInstruction}
      closeCategoryModal={closeCategoryModal}
      setInstructionField={setInstructionField}
      setCategoryTitleField={setCategoryTitleField}
      addCategory={addCategory}
      editCategory={editCategory}
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
  setInstructionField: PropTypes.func.isRequired,
  setCategoryTitleField: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
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
  setInstructionField: (index, field, value) => dispatch(setInstructionField(index, field, value)),
  setCategoryTitleField: (value) => dispatch(setCategoryTitleField(value)),
  addCategory: () => dispatch(addCategory()),
  editCategory: () => dispatch(editCategory()),
});

export default connect(mapStateToProps, mapDispatchToProp)(AddEditCategoryModal);

