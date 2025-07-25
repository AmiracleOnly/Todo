import inputStyles from './CheckBoxStyle';

interface CheckboxInputProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput = ({ checked, onChange }: CheckboxInputProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={inputStyles.checkbox as React.CSSProperties}
    />
  );
};

export default CheckboxInput;
