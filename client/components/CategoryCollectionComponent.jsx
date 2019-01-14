import shortid from 'shortid';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CategoriesCollection } from './styled';
import CategoryItemComponent from './CategoryItemComponent';

class CategoryCollectionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryItems: [
        {
          _id: shortid.generate(),
          title: 'Configuration',
          instructions: [
            {
              _id: shortid.generate(),
              title: 'Install git on macOS with Homebrew',
              command: 'brew install git',
            },
            {
              _id: shortid.generate(),
              title: 'Install git on Debian-based linux',
              command: 'sudo apt-get install git',
            }
          ],
        },
        {
          _id: shortid.generate(),
          title: 'installing git',
          instructions: [
            {
              _id: shortid.generate(),
              title: 'Install git on macOS with Homebrew',
              command: 'brew install git',
            },
            {
              _id: shortid.generate(),
              title: 'Install git on Debian-based linux',
              command: 'sudo apt-get install git',
            },
            {
              _id: shortid.generate(),
              title: 'Install git on Windows with Chocolatey',
              command: 'choco install git',
            },
          ],
        },
      ],
    };
  }

  render() {
    const { categoryItems } = this.state;

    return (
      <CategoriesCollection>
        {
          categoryItems.map(categoryItem => (
            <CategoryItemComponent category={categoryItem} key={categoryItem._id} />
          ))
        }
      </CategoriesCollection>
    );
  }
}
// CategoryCollectionComponent.propTypes = {
// };

export default CategoryCollectionComponent;
