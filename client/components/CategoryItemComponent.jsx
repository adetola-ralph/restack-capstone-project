import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Category, Instruction, CategoryHeaderActions, CategoryHeaderActionsIcons, StyledIcon } from './styled';

const CategoryItemComponent = ({ category }) => {
  return (
    <Category>
      <header>
        {category.title}
        <CategoryHeaderActions>
          <CategoryHeaderActionsIcons className="far fa-clone" />
          <CategoryHeaderActionsIcons className="fas fa-trash-alt" color="#f0533c" />
        </CategoryHeaderActions>
      </header>
      <article>
        {
          category.instructions.map(instruction => (
            <Instruction key={instruction._id}>
              <div>{instruction.title}</div>
              <div>{instruction.command} <StyledIcon className="fas fa-info-circle" /></div>
            </Instruction>
          ))
        }
      </article>
    </Category>
  );
};

CategoryItemComponent.propTypes = {
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
};

export default CategoryItemComponent;
