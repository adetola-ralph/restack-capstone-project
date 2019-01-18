import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { SideBar, Mask, OpenIcon } from './styled';

class SidebarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar(value) {
    const { showSidebar } = this.state;
    this.setState({
      showSidebar: value ? value : !showSidebar,
    });
  }

  render() {
    return (
      <Fragment>
        <SideBar isOpen={this.state.showSidebar}>
          {!this.state.showSidebar && <OpenIcon
            className="fas fa-chevron-right"
            font-size="12px" onClick={this.toggleSidebar} />}
          {this.props.children}
        </SideBar>
        <Mask
          isShowMask={this.state.showSidebar}
          onClick={() => this.toggleSidebar(false)}/>
      </Fragment>
    );
  }
}
SidebarComponent.propTypes = {
  children: PropTypes.node,
};

export default SidebarComponent;
