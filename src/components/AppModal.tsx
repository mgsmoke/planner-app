type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function AppModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default AppModal;
