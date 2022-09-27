import { SwitchLabel } from '../../styles/ToggleSwitchStyle';

type LabelTypes = {
  title: string;
  id: string;
  onChange: (val: string) => void;
};

function ClickableLabel({ title, onChange, id }: LabelTypes) {
  return (
    <SwitchLabel onClick={() => onChange(title)} className={id}>
      {title}
    </SwitchLabel>
  );
}

export default ClickableLabel;
