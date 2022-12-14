import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

export const TestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1020px) {
    justify-content: space-around;
  }
`;

export const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
  padding-left: 10px;
`;

export const DivNothing = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
`;

// TEST CARD

export const Container = styled.div`
  width: 322px;
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const H2 = styled.h2`
  height: 60px;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const P = styled.p`
  height: 72px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Span = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 3px;
`;

export const ContainerIcon = styled.div`
  color: #d9d9d9;
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    width: 25px;
    text-align: center;
  }
`;

export const ContainerImg = styled.div`
  height: 43px;
  display: flex;
  align-items: center;
`;

export const CardButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// MODALS

export const DivModal = styled.div`
  background-color: #F4F4F4;
  max-width: 400px;
  height: 150px;
  max-height: 250px;
  padding: 10px;
  border-radius: 10px;
  overflow: scroll;
  overflow-x: hidden;
`;

export const DivPersonas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const DivPersona = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #ADA7A7;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 1px 5px;
  background-color: #FFFFFF;
`;

export const ModalDivButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const DivCenter = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;