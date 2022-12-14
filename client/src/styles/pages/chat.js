import styled from "styled-components";

export const Home = styled.div`
  width: ${props => props.isInTestView && "80%"};
  box-shadow: ${props => props.isInTestView && "4px 1px 16px -7px rgba(0,0,0,0.6)"};
  height: ${(props) => props.height};
  z-index: 3;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  position: relative;

  @media (max-width: 950px) {
    width: ${props => props.isInTestView && "100%"};
  }
`;

export const SidebarContainer = styled.div`
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
  overflow-x: hidden;
  z-index: 1;
  display: ${props => props.showSide ? "block" : "none"};

  @media (max-width: 1080px) {
    min-width: 100%;
    max-width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 45px;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;

  @media (max-width: 1080px) {
      flex-direction: column;
      height: auto;
    }
  .logo {
    font-weight: bold;

  }

  .username{
    @media (max-width: 1564px) {
      display: none;
    }
  }
  .user {
    display: flex;
    gap: 10px;

    button {
      background-color: #5d5b8d;
      color: #ddddf7;
      font-size: 10px;
      border: none;
      cursor: pointer;
      @media (max-width: 768px) {
        position: absolute;
        bottom: 10px;
      }
    }
  }
`;

export const ChatsContainer = styled.div`
  height: calc(100% - 50px);
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;
    width: 100%;

    &>div:first-child{
      min-width: 50px;
    }
    &:hover {
      background-color: #2f2d52;
    }

    .userChatInfo {
      span {
        font-size: 18px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        color: lightgray;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const ChatComContainer = styled.div`
  width: ${(props) => (props.showSide ? "calc(100% - 350px)" : "100%")};

  .chatInfo {
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;
    height: 45px;
  }

  .chatIcons {
    display: flex;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
      z-index: 2;
    }
  }

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

export const MessagesContainer = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 95px);
  overflow-y: scroll;
`;

export const MessageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
  }
  
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: white;
      padding: 10px 20px;
      border-radius: 0px 10px 10px 10px;
    }

    img {
      width: 50%;
    }
  }

  &.owner {
    flex-direction: row-reverse;

    .messageContent {
      align-items: flex-end;

      p {
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
      }
    }
  }
`;

export const InputComp = styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: lightgray;
    }
  }
  .send {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
    }

    button {
      border: none;
      padding: 10px 15px;
      color: white;
      background-color: #8da4f1;
      cursor: pointer;
    }
  }
`;