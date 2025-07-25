import inputStyles from './TextInputStyle';


interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
}

const TextInput = ({ value, onChange, onKeyDown, autoFocus, placeholder  }: TextInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      style={inputStyles.textInput as React.CSSProperties}
    />
  );
};

export default TextInput;
