import { SwitchLabel } from 'src/common/styles/ToggleSwitchStyle';
import { LabelTypes } from 'src/common/models';

// allows user to interact w/ label
function ClickableLabel({ title, onChange, id }: LabelTypes) {
  return (
    <SwitchLabel onClick={() => onChange(title)} className={id} aria-label='switch_label'>
      {title}
    </SwitchLabel>
  );
}

export default ClickableLabel;
