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

  const handleDelete = async () => {
    await controls.start({ x: 0, transition: { duration: 0 } });
    onDelete();
  };

  return (
    <div className="relative w-full h-[48px] overflow-hidden bg-white">
      {/* Кнопки сзади */}
      <div className="absolute inset-0 overflow-hidden rounded-full z-0">
        <div className="absolute inset-0 flex justify-end items-center gap-4 pr-2">
          <button onClick={onEdit} className="w-10 h-10 bg-yellow-400 text-white rounded-full">✏️</button>
          <button onClick={handleDelete} className="w-10 h-10 bg-red-500 text-white rounded-full">🗑️</button>
        </div>
      </div>

      {/* Контент, который двигается */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center bg-white rounded-full overflow-hidden"
        drag="x"
        dragConstraints={{ left: SNAP_POINT, right: 0 }}
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
