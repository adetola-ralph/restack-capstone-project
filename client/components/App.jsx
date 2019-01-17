import React, { Fragment } from 'react';

import BodyComponent from './BodyComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import SidebarComponent from './SidebarComponent';

import { GlobalStyle, Header, Container, Brand, SidebarContainer, Avatar, TitleHeader, AddButton } from './styled';

const App = () => {
  return(
    <Fragment>
      <GlobalStyle />
      <SidebarComponent>
        <SidebarContainer>
          <Fragment>
            <Avatar size="200px"></Avatar>
            <p style={{'marginTop': '20px'}}>Hello Name!</p>
          </Fragment>
          <LoginComponent />
          <RegisterComponent />
        </SidebarContainer>
      </SidebarComponent>
      <Header>
        <Container>
          <Brand>a cheat sheet</Brand>
        </Container>
      </Header>
      <TitleHeader>
        <h1>
          Git <em>cheatsheet</em>
        </h1>
      </TitleHeader>
      <BodyComponent />
      <AddButton>
        <i className="fas fa-plus"></i>
      </AddButton>
    </Fragment>
  );
};

export default App;
