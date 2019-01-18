import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  CLOSE_CATEGORY_MODAL,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL,
} from '../constants';

import { sl } from 'react-redux';

const instruction = () => ({
  title: '',
  command: '',
});

const defaultState = {
  newCategory: {
    title: '',
    instructions: [instruction()],
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
            instruction(),
          ],
        }
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
      console.log(state.categoryItems);
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
    default:
      return state;
  }
};

export default AddEditCategoryReducer;
