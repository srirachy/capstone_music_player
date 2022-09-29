import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const VolumeWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
`;
