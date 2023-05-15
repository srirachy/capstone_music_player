import { SwitchRadio } from 'src/common/styles/ToggleSwitchStyle';
import { RadioProps } from 'src/common/models';

// passes the selected readable data
function ConcealedRadio({ value, selected }: RadioProps) {
  return <SwitchRadio type='radio' name='switch' checked={selected === value} readOnly aria-label='switch_radio' />;
}

export default ConcealedRadio;
