import styled, { createGlobalStyle } from 'styled-components';

import searchSvgIcon from '../../assets/search.svg';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Source+Sans+Pro:300,400|Inconsolata');

  :root {
    --pale-grey: #f1f3f5;
    --dark-grey-blue: #334455;
    --cool-grey: #9eaab6;
    --white: #ffffff;
    --iris: #745fb5;
    --pale-grey-two: #f9fbfd;
    --pale-red: #f0533c;
    --deep-lavender: #9066b8;
  }

  body {
    width: 100%;
    min-height: 100%;
    background-color: var(--pale-grey);
    font-family: 'Open Sans', sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
  }
`;

export const Header = styled.header`
  position: relative;
  height: 64px;
`;

export const Brand = styled.div`
  text-transform: uppercase;
  color: var(--dark-grey-blue);
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  height: 64px;
  line-height: 64px;
`;

export const AuthDetails = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  top: 12px;

  span {
    font-size: 13px;
    color: var(--cool-grey);
    margin-right: 5px;

    a {
      text-decoration: none;
      color: var(--cool-grey);
    }
  }
`;

export const Avatar = styled.div`
  height: 40px;
  width: 40px;
  background-color: var(--white);
  border-radius: 50%;
`;

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  height: 100%;
`;

export const TitleHeader = styled.div`
  height: 58px;

  h1 {
    font-size: 49px;
    color: var(--dark-grey-blue);
    font-weight: 300;
    text-align: center;
    margin: 0;

    em {
      color: var(--cool-grey);
      font-style: normal;
    }
  }
`;

export const Body = styled.div`
  p {
    font-size: 14px;
    color: var(--cool-grey);
    text-align: center;
    line-height: 17px;
    font-weight: 300;
    margin-top: 44px;
  }
`;

export const Search = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 72px;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const SearchLabel = styled.label`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 714px;
  height: 64px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 6px 8px 0 rgba(102, 119, 136, 0.16);
  background-color: var(--white);
  border: 0;
  position: relative;
  font-size: 19px;
  margin: 0 auto;
  display: block;
  position: relative;

  ::placeholder {
    color: var(--cool-grey);
    font-weight: 300;
  }

  :active, :focus {
    outline: none;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  background-image: url(${searchSvgIcon});
  height: 40px;
  width: 40px;
  background-position: center;
  background-size: contain;
  top: 11px;
  right: 15px;
`;

export const AddButton = styled.button`
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.16);
  background-image: linear-gradient(194deg, var(--iris), var(--deep-lavender));
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: fixed;
  right: 50px;
  border: 0;
  bottom: 10px;
  cursor: pointer;
  color: var(--white);
  transition: .4s transform;

  :hover {
    transform: scale(1.05);
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(0.9);
  }
`;

export const CategoriesCollection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  border-top: 4px solid var(--iris);
  width: calc(25% - 15px);
  min-height: 350px;
  background-color: var(--pale-grey-two);
  margin-right: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;

  header {
    height: 40px;
    background-color: var(--white);
    color: var(--iris);
    font-weight: 300;
    font-size: 16px;
    text-transform: capitalize;
    line-height: 40px;
    padding-left: 10px;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  article {
    padding: 9px;
    box-sizing: border-box;
  }
`;

export const CategoryHeaderActions = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  display: flex;
  align-items: center;
  height: 40px;
  padding-right: 10px;
  background-color: var(--white);
`;

export const Instruction = styled.div`
  font-size: 15px;
  font-weight: 300;
  color: var(--dark-grey-blue);

  div:nth-child(1) {
    font-size: 15px;
    font-weight: 300;
    color: var(--dark-grey-blue);
  }

  div:nth-child(2) {
    margin-top: 10px;
    margin-bottom: 18px;
    font-family: 'Inconsolata', monospace;
    font-size: 12px;
    color: var(--cool-grey);
    cursor: pointer;

    :before {
      content: '$';
      margin-right: 5px;
    }
  }
`;

export const StyledIcon = styled.i`
  font-size: ${props => props.fontSize || '9px'};
`;

export const CategoryHeaderActionsIcons = styled(StyledIcon)`
  font-size: ${props => props.fontSize || '13px'};
  margin-left: 10px;
  color: ${props => props.color || 'var(--iris)'};
`;
