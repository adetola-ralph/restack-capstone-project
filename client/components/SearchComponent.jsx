import React from 'react';
// import PropTypes from 'prop-types';

import { Search, SearchInput, SearchIcon, SearchLabel } from './styled';

const SearchComponent = ({}) => {
  return (
    <Search>
      <SearchLabel>
        <SearchInput placeholder="Search..."/>
        <SearchIcon />
      </SearchLabel>
    </Search>
  );
};

// SearchComponent.propTypes = {
// };

export default SearchComponent;
