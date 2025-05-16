import { motion, useMotionValue, useTransform } from 'framer-motion';

type Props = {
  onDelete: () => void;
  onEdit: () => void;
  children: React.ReactNode;
};

export default function SwipeableItem({ onDelete, onEdit, children }: Props) {
  const x = useMotionValue(0);
  const backgroundX = useTransform(x, latestX => Math.max(-120, Math.min(0, latestX)));

  return (
    <div className="relative w-full h-[64px] overflow-hidden rounded">
      {/* Кнопки — ниже основного слоя, невидимы пока не свайпнешь */}
      <div className="absolute top-0 right-0 h-full flex items-center z-0 pr-2 pointer-events-none">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-[50px] h-[50px] bg-yellow-400 text-white rounded pointer-events-auto"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="w-[50px] h-[50px] bg-red-500 text-white rounded pointer-events-auto"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Сам элемент, который свайпается */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        onDragEnd={(_, info) => {
            if (info.offset.x < -60) {
                backgroundX.set(-120); // полностью открываем
            } else {
                backgroundX.set(0); // возвращаем обратно
            }
        }}
        style={{ x: backgroundX }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0 left-0 w-full h-full bg-white z-10 flex items-center px-4"
       >
       {children}
      </motion.div>
    </div>
  );
}
