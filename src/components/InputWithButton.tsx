type InputWithButtonProps = {
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  placeholder?: string;
  buttonLabel?: string;
};

function InputWithButton({
  value,
  onChange,
  onClick,
  placeholder = '',
  buttonLabel = '+',
}: InputWithButtonProps) {
  return (
    <div className="flex gap-2 w-full">
      <input
        className="border p-2 flex-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button className="bg-green-500 text-white px-4 rounded" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default InputWithButton;