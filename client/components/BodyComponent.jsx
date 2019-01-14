import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, Body } from './styled';

import SearchComponent from './SearchComponent';
import CategoryCollectionComponent from './CategoryCollectionComponent';

const BodyComponent = ({}) => {
  return (
    <Body>
      <Container>
        <p>
          This is a collection of git cheats and tips I’ve gathered. I’ll add more as time goes by
        </p>
        <SearchComponent />
        <CategoryCollectionComponent />
      </Container>
    </Body>
  );
};

// BodyComponent.propTypes = {
// };

export default BodyComponent;
