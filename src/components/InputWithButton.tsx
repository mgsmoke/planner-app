function InputWithButton({ value, onChange, onClick, placeholder }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  placeholder?: string;
}) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        className="bg-green-500 text-white px-4 rounded"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}

export default InputWithButton;
