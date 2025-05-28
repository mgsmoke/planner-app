import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  enableSwipeRight: boolean;
};

export default function SwipeableItem({ children, onEdit, onDelete, enableSwipeRight = true, onComplete}: Props) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const SNAP_POINT_LEFT = -110; // ширина свайпа влево
  const SNAP_POINT_RIGHT = 60; // ширина свайпа вправо
  const maxSwipeDistance = SNAP_POINT_RIGHT; // Максимальное расстояние свайпа для 100% заполнения
  const fillProgress = useTransform(x, [0, maxSwipeDistance], [0, 100]); // Преобразуем смещение в процент (от 0 до 100)
  const [isCompleting, setIsCompleting] = useState(false);

  const handleDragEnd = async (_: any) => {
    const currentX = x.get();

    if (currentX < SNAP_POINT_LEFT / 2) {
      // свайпнули достаточно влево — открываем
      await controls.start({ x: SNAP_POINT_LEFT, transition: { duration: 0.2 } });
    } 
    else if (enableSwipeRight && currentX >= 59) {
      // свайпнули достаточно вправо — открываем
      setIsCompleting(true);
      await controls.start({ x: SNAP_POINT_RIGHT, transition: { duration: 0.2 } });
      await controls.start({ x: 400, transition: { duration: 0.4 } });
      onComplete?.();
      await controls.start({ x: 0, transition: { duration: 0 } });
      setIsCompleting(false);
    }
    else
    {
      // иначе закрываем
      await controls.start({ x: 0, transition: { duration: 0.2 } });
    }
  };

  return (
    <div className="relative w-full h-[48px] overflow-hidden">
        {!isCompleting && (
          <div className="absolute inset-0 flex justify-end items-center gap-3">
            <button onClick={onEdit} className="w-11 h-11 bg-yellow-400 text-white rounded-full">✏️</button>
            <button onClick={onDelete} className="w-11 h-11 bg-red-500 text-white rounded-full">🗑️</button>
          </div>
        )}
        {enableSwipeRight && (
          <div className="absolute inset-0 flex justify-start items-center w-11">
            <svg width="44" height="44" className=''>
              <motion.circle
                cx="2"
                cy="21"
                r="19"
                stroke="#4CAF50"
                strokeWidth="4"
                strokeDasharray="119.32" // 2πr (2 * 3.14 * 19)
                strokeDashoffset={useTransform(fillProgress, (p) => 119.32 - (1.1932 * p))}
                transform="rotate(-90 12 12)"
                fill="none"
              />
            </svg>
          </div>
        )}

      {/* Контент, который двигается */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center bg-white rounded-full overflow-hidden"
        drag="x"
        dragConstraints={{ 
          left: SNAP_POINT_LEFT, 
          right: enableSwipeRight ? SNAP_POINT_RIGHT : 0 }}
        dragElastic={0}
        style={{ x, touchAction: 'pan-y' }}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}
