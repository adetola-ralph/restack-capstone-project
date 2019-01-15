import React from 'react';
import PropTypes from 'prop-types';

import { Search, SearchInput, SearchIcon, SearchLabel } from './styled';

import SearchService from '../service/search';

// const SearchComponent = ({ onChange }) => {
//   return (
//     <Search>
//       <SearchLabel>
//         <SearchInput placeholder="Search..."/>
//         <SearchIcon />
//       </SearchLabel>
//     </Search>
//   );
// };

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(searchValue) {
    this.setState({
      searchValue,
    }, () => {
      const ty = SearchService.search(this.state.searchValue);
      console.log(ty);
      // console.log(SearchService)
    });


  }

  render() {
    return (
      <Search>
        <SearchLabel>
          <SearchInput placeholder="Search..." value={this.state.searchValue} onChange={(e) => this.onChange(e.target.value)} />
          <SearchIcon />
        </SearchLabel>
      </Search>
    )
  }
}

SearchComponent.propTypes = {
  // onChange: PropTypes.func.isRequired,
};

export default SearchComponent;
