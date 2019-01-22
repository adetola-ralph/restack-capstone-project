import configureStore from '../../store';
import rootReducer from '../../store/reducer';

jest.mock('../../store/reducer');
rootReducer.mockImplementation(() => ({
  course: {},
}));

describe('Configure store', () => {
  test('store creation', () => {
    const store = configureStore();
    expect(rootReducer).toHaveBeenCalled();
    expect(store.getState()).toEqual({ course: {} });
  });
});
