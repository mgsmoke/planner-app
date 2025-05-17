import { motion, useMotionValue, useAnimation } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SwipeableItem({ children, onEdit, onDelete }: Props) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const SNAP_POINT = -120; // ширина кнопок

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;

    if (offset < SNAP_POINT / 2) {
      // свайпнули достаточно — открываем
      await controls.start({ x: SNAP_POINT, transition: { duration: 0.2 } });
    } else {
      // не дотянули — откатываем
      await controls.start({ x: 0, transition: { duration: 0.2 } });
    }
  };

  return (
    <div className="relative w-full h-[64px] overflow-hidden rounded bg-white">
      {/* Кнопки сзади */}
      <div className="absolute inset-0 flex justify-end items-center gap-2 z-0">
        <button onClick={onEdit} className="w-12 h-12 bg-yellow-400 text-white rounded-full">✏️</button>
        <button onClick={onDelete} className="w-12 h-12 bg-red-500 text-white rounded-full">🗑️</button>
      </div>

      {/* Контент, который двигается */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center bg-white"
        drag="x"
        dragConstraints={{ left: SNAP_POINT, right: 0 }}
        dragElastic={0}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}
