interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  label: string;
  className: string;
}

function AppButton({ onClick, label, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default AppButton;
