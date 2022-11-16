import { useAppDispatch } from 'src/store/hooks';
import { setThemeState } from 'src/store/themeSlice';
import {
  Switch,
  SwitchSelection,
} from '../../styles/ToggleSwitchStyle';
import ClickableLabel from './ClickableLabel';
import ConcealedRadio from './ConcealedRadio';
import { ToggleProps } from '../../types';

// parent component of ConcealedRadio and ClickableLabel
function ToggleSwitch({ vals, curSelect }: ToggleProps) {
  const dispatch = useAppDispatch();
  const handleChange = (val: string) => {
    dispatch(setThemeState(val));
  };
  const selectionStyle = () => {
    return {
      left: `${(vals.indexOf(curSelect) / 3) * 100}%`,
    };
  };
  return (
    <Switch aria-label="toggle_switch_container">
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
