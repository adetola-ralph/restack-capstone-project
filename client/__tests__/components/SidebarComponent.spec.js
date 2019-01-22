import SidebarComponent from '../../components/SidebarComponent';

const { mount } = Enzyme;

const defaultProps = {
  children: ''
};

let wrapper;

describe('SidebarComponent', () => {
  beforeAll(() => {
    wrapper = mount(<SidebarComponent {...defaultProps} />);
  });

  it('showSidebar should be false by default', () => {
    expect(wrapper.state().showSidebar).toEqual(false);
  });

  it('toggleSidebar should set showSidebar to true', () => {
    wrapper.instance().toggleSidebar();

    expect(wrapper.state().showSidebar).toEqual(true);
  });

  it('should set showSidebar to false if ask is clicked on', () => {
    const masks = wrapper.find('.mask');

    // this is a bug with enzyme, it is returning 3 instaces instead of 1
    const mask = masks.at(0);

    mask.simulate('click');

    expect(wrapper.state().showSidebar).toEqual(false);
  })
});
