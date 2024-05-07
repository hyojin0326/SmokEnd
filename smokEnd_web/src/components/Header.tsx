import React from 'react';
import styled from 'styled-components';

const Aeader = styled.div`
  width: 100vw;
  height:83px;
  background-color: rgba(52, 152, 219, 0.5);
  position: fixed;
  z-index: 9999;
`;

const H1 = styled.p`
  color: white;
  font-size: 30px;
`;
function Header() {
  return (
    <div>
      <Aeader>
       <H1>헤더입니다.</H1>
      </Aeader>
    </div>
  );
}

export default Header; //다른 JS파일에서 불러올 수 있도록 내보내주기