import styled from 'styled-components';

export const Switch = styled.div`
  font-family: 'Lucida Grande', Tahoma, Verdana, sans-serif;
  position: relative;
  height: 1.625px;
  width: 8.5rem;
  background-color: #e4e4e4;
  border-radius: 0.2rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px rgba(255, 255, 255, 0.1);
`;

export const SwitchRadio = styled.input`
  display: none;
`;

export const SwitchSelection = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 2.8rem;
  height: 1.625rem;
  background: #216ba5;
  border-radius: 0.2rem;
  transition: left 0.25s ease-out;
`;

export const SwitchLabel = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: 2.8rem;
  line-height: 1.625rem;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;

  ${SwitchRadio}:checked + & {
    transition: 0.15s ease-out;
    color: #fff;
  }
`;
