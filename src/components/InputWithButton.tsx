import { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  placeholder?: string;
};

function InputWithButton({ value, onChange, onClick, placeholder }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border p-2 flex-1"
        placeholder={placeholder}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}

export default InputWithButton;
