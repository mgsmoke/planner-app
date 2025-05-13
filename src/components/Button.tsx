type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  };
  
  function Button({ children, onClick, className = '' }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
      >
        {children}
      </button>
    );
  }
  
  export default Button;