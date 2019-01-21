import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  SET_INSTRUCTION_FIELD,
  CLOSE_CATEGORY_MODAL,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL,
  SET_CATEGORY_TITLE_FIELD,
  EDIT_CATEGORY_SUCCESSFUL,
  ADD_NEW_CATEGORY_SUCCESSFUL,
} from '../constants';


export const getNewInstruction = () => ({
  title: '',
  command: '',
});

export const defaultState = {
  newCategory: {
    title: '',
    instructions: [getNewInstruction()],
  },
  isModalOpen: false,
  isNew: false,
};

const AddEditCategoryReducer = (state = defaultState, action) => {
  const { type } = action;

  switch (type) {
    case (ADD_INSTRUCTION): {
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          instructions: [
            ...state.newCategory.instructions,
            getNewInstruction(),
          ],
        },
      };
    }
    case (REMOVE_INSTRUCTION): {
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          instructions: [
            ...state.newCategory.instructions.slice(0, action.index),
            ...state.newCategory.instructions.slice(action.index + 1),
          ],
        },
      };
    }
    case (OPEN_ADD_CATEGORY_MODAL): {
      return {
        ...state,
        isNew: true,
        isModalOpen: true,
      };
    }
    case (OPEN_EDIT_CATEGORY_MODAL): {
      return {
        ...state,
        newCategory: action.categoryItem,
        isNew: false,
        isModalOpen: true,
      };
    }
    case (CLOSE_CATEGORY_MODAL): {
      return {
        ...defaultState,
      };
    }
    case (SET_INSTRUCTION_FIELD): {
      const { index, field, value } = action;

      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          instructions: state.newCategory.instructions.map((instruction, _index) => {
            if (index === _index) {
              const newInstruction = { ...instruction };
              newInstruction[field] = value;
              return newInstruction;
            }

            return instruction;
          }),
        },
      };
    }
    case (SET_CATEGORY_TITLE_FIELD): {
      const { value } = action;

      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          title: value,
        },
      };
    }
    case (EDIT_CATEGORY_SUCCESSFUL):
    case (ADD_NEW_CATEGORY_SUCCESSFUL): {
      return defaultState;
    }
    default:
      return state;
  }
};

export default AddEditCategoryReducer;
