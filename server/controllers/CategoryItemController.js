import Boom from 'boom';

import CategoryitemModel from '../model/Category';

class CategoryItemController {
  static* find(categoryItemId) {
    const item = yield CategoryitemModel.findById(categoryItemId);

    if (!item) {
      throw Boom.notFound('Category item not found');
    }

    return item;
  }

  static* getAll() {
    const items = yield CategoryitemModel.find().exec();
    return items.map(item => item.toObject());
  }

  static* create(categoryItem) {
    if (!categoryItem.title) {
      throw Boom.badData('Title is missing');
    }

    const { instructions } = categoryItem;
    const newCategoryItem = new CategoryitemModel(categoryItem);

    if (instructions && instructions.length > 0) {
      // check if all instructions are valid
      const isValidInstruction = instructions.every(instruction => (
        instruction.title
          && instruction.title !== ''
          && instruction.command
          && instruction.command !== ''
      ));

      if (!isValidInstruction) {
        throw Boom.badData('Wrong format for instructions');
      }
    }

    return yield newCategoryItem.save();
  }

  static* update(categoryItemId, categoryItem) {
    const categoryItemToUpdate = yield CategoryItemController.find(categoryItemId);

    if (!categoryItemToUpdate) {
      throw Boom.notFound();
    }

    const keys = Object.keys(categoryItem);
    for (const key of keys) {
      if (key !== '_id') {
        categoryItemToUpdate[key] = categoryItem[key];
      }
    }

    return yield categoryItemToUpdate.save();
  }

  static* delete(categoryItemId) {
    const categoryItemToDelete = yield CategoryItemController.find(categoryItemId);

    if (!categoryItemToDelete) {
      throw Boom.notFound();
    }

    yield categoryItemToDelete.remove();
  }
}

export { CategoryItemController };
