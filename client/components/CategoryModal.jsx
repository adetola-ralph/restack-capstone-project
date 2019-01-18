import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Mask,
  Modal,
  FormInput,
  FormButton,
  FormAction,
  FormControl,
  ModalContainer,
  InstructionHeader,
  AuthContainerTitle,
  AddInstructionAnchor,
  InstructionFormControl,
  CategoryHeaderActionsIcons,
} from './styled';

const CategoryModal = ({
  isOpen,
  isNew,
  category,
  addInstruction,
  removeInstruction,
  closeCategoryModal,
  setInstructionField,
  setCategoryTitleField,
  addCategory,
  editCategory,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    if (isNew) {
      addCategory();
    } else {
      editCategory();
    }
  };
  return (
    <Fragment>
      {
        isOpen
        && (
          <Fragment>
            <ModalContainer>
              <Mask isShowMask={isOpen} onClick={closeCategoryModal} />
              <Modal>
                <AuthContainerTitle>
                  {
                    isNew ? 'Add new Category' : 'Edit Category'
                  }
                </AuthContainerTitle>
                <form onSubmit={onSubmit}>
                  <FormControl>
                    <FormInput
                      onChange={e => setCategoryTitleField(e.target.value)}
                      name="title"
                      placeholder="Category Title"
                      value={category.title}
                    />
                  </FormControl>
                  <AddInstructionAnchor onClick={addInstruction}>
                    + Add Instructions
                  </AddInstructionAnchor>
                  {
                    category.instructions
                    && category.instructions.map((instruction, index) => (
                      <Fragment key={instruction._id || index}>
                        <InstructionHeader>
                          Remove instruction
                          <CategoryHeaderActionsIcons
                            className="fas fa-trash-alt"
                            color="#f0533c"
                            fontSize="13px"
                            onClick={() => removeInstruction(index)}
                          />
                        </InstructionHeader>
                        <InstructionFormControl>
                          <FormInput
                            name="title"
                            placeholder="Instruction Title"
                            value={instruction.title}
                            onChange={e => setInstructionField(
                              index, e.target.name, e.target.value,
                            )}
                          />
                        </InstructionFormControl>
                        <InstructionFormControl>
                          <FormInput
                            name="command"
                            placeholder="Instruction Command"
                            value={instruction.command}
                            onChange={e => setInstructionField(
                              index, e.target.name, e.target.value,
                            )}
                          />
                        </InstructionFormControl>
                      </Fragment>
                    ))
                  }
                  <FormAction>
                    <FormButton type="submit">
                      {isNew ? 'Add' : 'Edit'}
                    </FormButton>
                  </FormAction>
                </form>
              </Modal>
            </ModalContainer>
          </Fragment>
        )
      }
    </Fragment>
  );
};

CategoryModal.propTypes = {
  isNew: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
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
  addInstruction: PropTypes.func.isRequired,
  removeInstruction: PropTypes.func.isRequired,
  closeCategoryModal: PropTypes.func.isRequired,
  setInstructionField: PropTypes.func.isRequired,
  setCategoryTitleField: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoryModal;
