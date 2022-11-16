import { SwitchLabel } from '../../styles/ToggleSwitchStyle';
import { LabelTypes } from '../../types';

// allows user to interact w/ label
function ClickableLabel({ title, onChange, id }: LabelTypes) {
  return (
    <SwitchLabel
      onClick={() => onChange(title)}
      className={id}
      aria-label="switch_label"
    >
      {title}
    </SwitchLabel>
  );
}

export default ClickableLabel;
