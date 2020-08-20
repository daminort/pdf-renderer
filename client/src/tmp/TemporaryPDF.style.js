import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    padding: 8px 0;
  }
  
  .switcher, .change {
    margin-bottom: 8px;
  }
  
  .buttons {
    margin-top: 8px;
    .ant-btn {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  
  .sheet {
    position: relative;
    max-width: 800px;
    padding: 24px 32px;
    box-shadow: 0 0 8px #a9a9a9;
    border-radius: 4px;
    margin-bottom: 16px;
    align-self: center;
  }
`;
