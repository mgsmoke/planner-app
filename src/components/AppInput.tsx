type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
};

function AppInput({ value, onChange, placeholder = '', className = '', type = 'text' }: Props) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default AppInput;
