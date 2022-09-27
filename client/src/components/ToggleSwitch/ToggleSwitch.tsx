import { useState } from 'react';
import {
  Switch,
  SwitchSelection,
} from '../../styles/ToggleSwitchStyle';
import ClickableLabel from './ClickableLabel';
import ConcealedRadio from './ConcealedRadio';

type ToggleProps = {
  vals: string[];
  curSelect: string;
};

function ToggleSwitch({ vals, curSelect }: ToggleProps) {
  const [selectState, setSelectState] = useState<string>('');
  const handleChange = (val: string) => {
    setSelectState(val);
    console.log(val);
  };
  const selectionStyle = () => {
    return {
      left: `${(vals.indexOf(selectState) / 3) * 100}%`,
    };
  };
  return (
    <Switch>
      {vals &&
        vals.map((value) => {
          return (
            <span key={value}>
              <ConcealedRadio value={value} selected={curSelect} />
              <ClickableLabel
                title={value}
                id={value}
                onChange={handleChange}
              />
            </span>
          );
        })}
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
}

export default ToggleSwitch;
