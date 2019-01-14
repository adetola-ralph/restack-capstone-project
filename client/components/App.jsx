import React, { Fragment } from 'react';

import BodyComponent from './BodyComponent';

import { GlobalStyle, Header, Container, Brand, AuthDetails, Avatar, TitleHeader, AddButton } from './styled';

const App = () => {
  return(
    <Fragment>
      <GlobalStyle />
      <Header>
        <Container>
          <Brand>a cheat sheet</Brand>
          <AuthDetails>
            <span>
              <a href="">Login</a>
            </span>
            <span>/</span>
            <span>
              <a href="">Register</a>
            </span>
            <span>Oreofeoluwapo Olutola</span>
            <Avatar></Avatar>
          </AuthDetails>
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
