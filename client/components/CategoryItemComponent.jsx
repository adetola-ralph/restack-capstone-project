import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Clipboard from 'clipboard';

import { Category, Instruction, CategoryHeaderActions, CategoryHeaderActionsIcons, StyledIcon } from './styled';

const clipboard = new Clipboard('.instruction-copy');
clipboard.on('success', () => console.info('copied'));

const CategoryItemComponent = ({ category, isAuthenticated, deleteCategory, editCategory }) => {
  return (
    <Category>
      <header>
        {category.title}
        {
          isAuthenticated &&
          <CategoryHeaderActions>
            <CategoryHeaderActionsIcons className="far fa-clone" onClick={() => editCategory(category._id)} />
            <CategoryHeaderActionsIcons className="fas fa-trash-alt" color="#f0533c" onClick={() => deleteCategory(category._id)} />
          </CategoryHeaderActions>
        }
      </header>
      <article>
        {
          category.instructions.map(instruction => (
            <Instruction key={instruction._id}>
              <div>{instruction.title}</div>
              <div data-clipboard-text={instruction.command} className="instruction-copy">
                {instruction.command} <StyledIcon className="fas fa-info-circle" />
              </div>
            </Instruction>
          ))
        }
      </article>
    </Category>
  );
};

CategoryItemComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        command: PropTypes.string.isRequired,
      })
    ),
  }),
  deleteCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

export default CategoryItemComponent;
