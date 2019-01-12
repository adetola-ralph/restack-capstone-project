import Boom from 'boom';

import CategoryitemModel from '../model/Category';
import InstructionModel from '../model/Instruction';

class CategoryItemController {
  static find() {

  }

  static *getAll() {
    const items = yield CategoryitemModel.find().exec();
    return items.map(item => item.toObject());
  }

  static *create(categoryItem) {
    if (!categoryItem.title) {
      throw Boom.badData('Title is missing');
    }

    const { instructions } = categoryItem;
    delete categoryItem.instructions;
    const newCategoryItem = new CategoryitemModel(categoryItem);
    let newInstructions;

    if (instructions && instructions.length > 0) {
      // check if all instructions are valid
      const isValidInstruction = instructions.every((instruction) => {
        return (
          instruction.title &&
          instruction.title !== '' &&
          instruction.command &&
          instruction.command !== ''
        );
      });

      if (isValidInstruction) {
        newInstructions = yield InstructionModel.create(instruction);
        newCategoryItem.instructions = newInstructions.map(instruction => instruction._id);
      } else {
        throw Boom.badData('Wrong format for instructions');
      }
    }

    return yield newCategoryItem.save();
  }

  static update() {

  }

  static delete() {

  }
}

export { CategoryItemController };
