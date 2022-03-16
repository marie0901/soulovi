import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  inset: 0px;
  z-index: 70;
  opacity: 0;
  height: 0px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.15);
  transition: opacity 0.4s;

  & > span {
    display: none !important;
  }
`;

export const FileContainer = styled.div`
  &:hover {
    ${Overlay} {
      opacity: 1;
      height: 100%;
      & > span {
        display: inline-block !important;
      }
    }
  }
`;
export const StyledContainer = styled.div`
  &::hover {
    ${Overlay} {
      z-index: 10;
    }
  }
`;
