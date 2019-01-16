import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Search, SearchInput, SearchIcon, SearchLabel } from './styled';

import { searchWithValue } from '../store/actions/searchActions';

const SearchComponent = ({ onChange, searchValue }) => {
  return (
    <Search>
      <SearchLabel>
      <SearchInput placeholder="Search..." value={searchValue} onChange={(e) => onChange(e.target.value)} />
        <SearchIcon />
      </SearchLabel>
    </Search>
  );
};

SearchComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

const mapStateToProps = ({ search }) => {
  const { searchValue } = search;
  return {
    searchValue,
  };
};

const  mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value) => dispatch(searchWithValue(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
