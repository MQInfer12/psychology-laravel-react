import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const CenterContainer = styled.div`
  margin-left: 263px;
  background-color: #F4F4F4;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 47px 40px 31px 40px;
  height: 157px;
`;

const UpbarText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActualPage = styled.span`
  margin-top: 7px;
  font-weight: 300;
  font-size: 16px;
  color: #ADA7A7;
`;

const TitlePage = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
`;

const OutletContainer = styled.div`
  min-height: calc(100vh - 157px);
  padding: 0px 40px 40px 40px;
`;

const CenterScreen = ({ titlePage }) => {
  return (
    <CenterContainer>
      <UpbarContainer>
        <UpbarText>
          <ActualPage>Admin / Creación Tests</ActualPage>
          <TitlePage>{ titlePage }</TitlePage>
        </UpbarText>
      </UpbarContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </CenterContainer>
  )
}

export default CenterScreen;