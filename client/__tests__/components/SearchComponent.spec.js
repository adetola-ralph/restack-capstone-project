import thunk from 'redux-thunk';
import reduxMockStore from 'redux-mock-store';

import ConnectedSearchComponent, { SearchComponent, mapDispatchToProps, mapStateToProps } from '../../components/SearchComponent';

const { mount } = Enzyme;

const onChange = jest.fn(x => x);

const defaultProps = {
  searchValue: '',
  onChange,
};

let wrapper;

describe('SearchComponent', () => {
  beforeAll(() => {
    wrapper = mount(<SearchComponent {...defaultProps} />);
  });

  it('should render an input field for search', () => {
    const inputFields = wrapper.find('input');
    expect(inputFields.length).toBe(1);
  });

  it('should onChange event when the value of the search input field is changed', () => {
    const searchInputField = wrapper.find('input');

    searchInputField.simulate('change', {
      target: {
        value: 'oreofe',
      },
    });

    expect(onChange).toHaveBeenCalled();
    onChange.mockClear();
  });

  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChange('oreofe');
    expect(dispatch).toHaveBeenCalled();
  });

  test('mapDispatchToProps', () => {
    const search = {
      searchValue: 'oreofe',
    };

    mapStateToProps({ search });
    expect(mapStateToProps({ search })).toEqual({
      searchValue: 'oreofe',
    });
  });
});
