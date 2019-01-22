import CategoryModal from '../../components/CategoryModal';

const { mount } = Enzyme;

const addInstruction = jest.fn();
const removeInstruction = jest.fn();
const closeCategoryModal = jest.fn();
const setInstructionField = jest.fn();
const setCategoryTitleField = jest.fn();
const addCategory = jest.fn();
const editCategory = jest.fn();

const defaultProps = {
  isNew: false,
  isOpen: true,
  addInstruction,
  removeInstruction,
  closeCategoryModal,
  setInstructionField,
  setCategoryTitleField,
  addCategory,
  editCategory,
  category: {
    instructions: [{}]
  },
};

let wrapper;

describe('CategoryModal', () => {
  beforeAll(() => {
    wrapper = mount(<CategoryModal {...defaultProps} />);
  });

  it('should render 3 input fields', () => {
    const inputFields = wrapper.find('input');
    expect(inputFields.length).toBe(3);
  });

  it('should trigger editCategory if isNew is false', () => {
    wrapper.setProps({ isNew: false });

    const form = wrapper.find('form');

    form.simulate('submit', { preventDefault: jest.fn() });

    expect(editCategory).toHaveBeenCalled();
  });

  it('should trigger addCategory if isNew is true', () => {
    wrapper.setProps({ isNew: true });

    const form = wrapper.find('form');

    form.simulate('submit', { preventDefault: jest.fn() });

    expect(addCategory).toHaveBeenCalled();
  });

  it('should trigger removeInstruction when the delete icons is clicked', () => {
    const instructionDeleteIcons = wrapper.find('.fas.fa-trash-alt');
    const instructionDelete = instructionDeleteIcons.at(0);

    instructionDelete.simulate('click');

    expect(removeInstruction).toHaveBeenCalled();
    expect(removeInstruction).toHaveBeenCalledWith(0);
  });

  it('should render nothing if isOpen is false', () => {
    wrapper.setProps({ isOpen: false });

    expect(wrapper.children()).toHaveLength(0);
  });
});
