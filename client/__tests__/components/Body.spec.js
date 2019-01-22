import BodyComponent from '../../components/BodyComponent';

const { shallow } = Enzyme;

let wrapper;

describe('BodyComponent', () => {
  beforeAll(() => {
    wrapper = shallow(<BodyComponent />);
  });

  it('should render an input field for search', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
