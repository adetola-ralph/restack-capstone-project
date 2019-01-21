import {
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  SET_INSTRUCTION_FIELD,
  CLOSE_CATEGORY_MODAL,
  OPEN_ADD_CATEGORY_MODAL,
  OPEN_EDIT_CATEGORY_MODAL,
  SET_CATEGORY_TITLE_FIELD,
  ADD_NEW_CATEGORY_SUCCESSFUL,
} from '../../../store/constants';

import AddEditCategoryReducer, { defaultState, getNewInstruction } from '../../../store/reducer/addEditCategoryReducer';

describe('AddEditCategoryReducer', () => {
  test('getNewInstruction should return new instruction', () => {
    expect(getNewInstruction()).toEqual({
      title: '',
      command: '',
    });
  });

  it('should return the default state', () => {
    const state = AddEditCategoryReducer(undefined, { type: '' });

    expect(state).toEqual(defaultState);
    expect(state).toHaveProperty('isModalOpen', false);
    expect(state).toHaveProperty('isNew', false);
    expect(state).toHaveProperty('newCategory', defaultState.newCategory);
  });

  it('should add new instruction to the newCategory instruction array', () => {
    const action = {
      type: ADD_INSTRUCTION,
    };

    const state = AddEditCategoryReducer(defaultState, action);

    expect(state.newCategory.instructions).toHaveLength(2);
  });

  it('should remove instruction from the newCategory instruction array', () => {
    const action = {
      type: REMOVE_INSTRUCTION,
      index: 0,
    };

    const state = AddEditCategoryReducer(defaultState, action);

    expect(state.newCategory.instructions).toHaveLength(0);
  });

  it('should set isModalOpen and isNew to be true for new category', () => {
    const action = {
      type: OPEN_ADD_CATEGORY_MODAL,
    };

    const state = AddEditCategoryReducer(defaultState, action);

    expect(state.isNew).toEqual(true);
    expect(state.isModalOpen).toEqual(true);
  });

  it('should set isModalOpen to true and isNew to false for existing category', () => {
    const action = {
      type: OPEN_EDIT_CATEGORY_MODAL,
    };

    const state = AddEditCategoryReducer(defaultState, action);

    expect(state.isNew).toEqual(false);
    expect(state.isModalOpen).toEqual(true);
  });

  it('should set isModalOpen to false and reset default state', () => {
    const initialAction = {
      type: OPEN_EDIT_CATEGORY_MODAL,
    };

    const initialState = AddEditCategoryReducer(defaultState, initialAction);

    const newAction = {
      type: CLOSE_CATEGORY_MODAL,
    };

    const newState = AddEditCategoryReducer(initialState, newAction);

    expect(newState.isModalOpen).toEqual(false);
    expect(newState).toEqual(defaultState);
  });

  test('setting instruction fields', () => {
    const initialaction = {
      type: ADD_INSTRUCTION,
    };

    const initialState = AddEditCategoryReducer(defaultState, initialaction);

    const newAction = {
      type: SET_INSTRUCTION_FIELD,
      index: 1,
      field: 'title',
      value: 'Installing Git',
    };

    const newState = AddEditCategoryReducer(initialState, newAction);

    expect(newState.newCategory.instructions[1]).toHaveProperty('title', 'Installing Git');
  });

  test('setting category title fields', () => {
    const action = {
      type: SET_CATEGORY_TITLE_FIELD,
      value: 'Value here',
    };

    const state = AddEditCategoryReducer(defaultState, action);

    expect(state.newCategory).toHaveProperty('title', 'Value here');
  });

  it('should revert to default state once edit or add new category is successful', () => {
    const initialAction = {
      type: SET_CATEGORY_TITLE_FIELD,
      value: 'Value here',
    };

    const initialState = AddEditCategoryReducer(defaultState, initialAction);

    expect(initialState).not.toEqual(defaultState);

    const newAction = {
      type: ADD_NEW_CATEGORY_SUCCESSFUL,
    };

    const newState = AddEditCategoryReducer(initialState, newAction);

    expect(newState).toEqual(defaultState);
  });
});
