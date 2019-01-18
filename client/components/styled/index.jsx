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
    --white-49: rgba(255, 255, 255, 0.49);
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
  height: ${props => props.size || '40px'};
  width: ${props => props.size || '40px'};
  background-color: var(--white);
  border-radius: 50%;
  cursor: pointer;
  border: 5px solid transparent;

  :hover {
    border: 5px solid #d6d6d6;
  }
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
  background-color: var(--pale-grey-two);
  margin-right: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);

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
  cursor: pointer;
`;

export const SideBar = styled.div`
  position: fixed;
  top: 0;
  background-color: var(--pale-grey);
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.16);
  width: 400px;
  left: ${props => props.isOpen ? '0' : '-400px'};
  z-index: 99999;
  transition: left 0.3s;
  min-height: 100vh;
`;

export const OpenIcon = styled(StyledIcon)`
  font-size: ${props => props.fontSize || '14px'};
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50px;
  right: -30px;
  padding: 5px;
  background-color: var(--pale-grey);
  box-shadow: 1px 0px 6px 0 rgba(0,0,0,0.16);
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SideBarMask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--white-49);
  z-index: 99997;
  cursor: pointer;
  display: ${props => props.isShowMask ? 'block' : 'none'};
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 25px 15px;
  min-height: 100vh;
  overflow-y: scroll;
`;

export const AuthContainer = styled.div`
  width: 90%;
  background-color: var(--white-49);
  min-height: 200px;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 21px 22px;
`;

export const AuthContainerTitle = styled.p`
  font-size: 26px;
  font-weight: 300;
  color: var(--iris);
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
`;

export const FormControl = styled.div`
  :not(:nth-child(1)) {
    margin-top: 25px;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: var(--pale-grey);
  padding: 16px;
  box-sizing: border-box;
  border: ${props => props.hasError ? 'var(--pale-red) 1px solid' : 0};
  font-size: 15px;

  :active, :focus {
    outline: none;
  }

  ::placeholder {
    color: var(--cool-grey);
    font-weight: 300;
  }
`;

export const FormSwitch = styled.div`
  display: block;
  width: 100%;
  margin: 15px 0 5px;
  text-align: center;
  text-decoration: none;
  color: var(--iris);
  font-weight: 300;
  font-size: 12px;
  cursor: pointer;
`;

export const FormAction = styled.div`
  margin-top: 20px;
  display: flex;
  // justify-content: flex-end;
`;

export const FormButton = styled.button`
  background-color: var(--iris);
  background-image: linear-gradient(194deg, var(--iris), var(--deep-lavender));
  color: var(--white);
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 0;
  transition: .4s transform;
  cursor: pointer;
  font-size: 15px;

  :hover {
    -webkit-transform: scale(1.01);
            transform: scale(1.01);
  }

  :focus {
    outline: none;
  }

  :active {
    -webkit-transform: scale(0.9);
            transform: scale(0.9);
  }
`;

export const LogoutButton = styled(FormButton)`
  width: ${props => props.width || '100%'};
  border: var(--iris) 2px solid;
  background-color: transparent;
  color: var(--iris);
  background-image: none;
`;

export const AuthUserName = styled.p`
  margin: 20px 0;
  text-transform: capitalize;
`;


export const ErrorMessage = styled.p`
  text-align: center;
  color: var(--pale-red);
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
