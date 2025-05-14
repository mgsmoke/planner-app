import { useState } from 'react';

interface AddModalProps {
  onClose: () => void;
  onAdd: (input: string) => void;
  title: string;
  placeholder: string;
  buttonLabel: string;
}

export default function AddModal({
  onClose,
  onAdd,
  title,
  placeholder,
  buttonLabel,
}: AddModalProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      onAdd(input.trim());
      setInput('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {buttonLabel}
        </button>
        <button
          onClick={onClose}
          className="text-gray-500 mt-2 w-full text-center"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
