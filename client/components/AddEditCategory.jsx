import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryModal from './CategoryModal';

import {
  addCategory as addCategoryAction,
  editCategory as editCategoryAction,
  addInstruction as addInstructionAction,
  removeInstruction as removeInstructionAction,
  closeCategoryModal as closeCategoryModalAction,
  setInstructionField as setInstructionFieldAction,
  setCategoryTitleField as setCategoryTitleFieldAction,
} from '../store/actions/addEditCategoryAction';

const AddEditCategoryModal = ({
  addInstruction,
  category,
  removeInstruction,
  isModalOpen,
  isNew,
  closeCategoryModal,
  setInstructionField,
  setCategoryTitleField,
  addCategory,
  editCategory,
}) => (
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
      }),
    ),
  }).isRequired,
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
    isNew,
  };
};

const mapDispatchToProp = dispatch => ({
  addInstruction: () => dispatch(addInstructionAction()),
  removeInstruction: index => dispatch(removeInstructionAction(index)),
  closeCategoryModal: () => dispatch(closeCategoryModalAction()),
  setInstructionField: (index, field, value) => dispatch(setInstructionFieldAction(
    index, field, value,
  )),
  setCategoryTitleField: value => dispatch(setCategoryTitleFieldAction(value)),
  addCategory: () => dispatch(addCategoryAction()),
  editCategory: () => dispatch(editCategoryAction()),
});

export default connect(mapStateToProps, mapDispatchToProp)(AddEditCategoryModal);
