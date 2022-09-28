import { SwitchRadio } from '../../styles/ToggleSwitchStyle';
import { RadioProps } from '../../types';

function ConcealedRadio({ value, selected }: RadioProps) {
  return (
    <SwitchRadio
      type="radio"
      name="switch"
      checked={selected === value}
      readOnly
      aria-label="switch_radio"
    />
  );
}

export default ConcealedRadio;
