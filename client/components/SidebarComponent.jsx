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
      showSidebar: value || !showSidebar,
    });
  }

  render() {
    const { showSidebar } = this.state;
    const { children } = this.props;
    return (
      <Fragment>
        <SideBar isOpen={showSidebar}>
          {
            !showSidebar
            && (
              <OpenIcon
                className="fas fa-chevron-right"
                font-size="12px"
                onClick={this.toggleSidebar}
              />
            )
          }
          {children}
        </SideBar>
        <Mask
          className="mask"
          isShowMask={showSidebar}
          onClick={() => this.toggleSidebar(false)}
        />
      </Fragment>
    );
  }
}
SidebarComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarComponent;
