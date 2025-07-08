import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddTodoModal from '../components/AddTodoModal';
import AddHabitModal from '../components/AddHabitModal';
import { useTodoStore } from '../../../store/todoStore';
import { useHabitStore } from '../../../store/habitStore';

function AddButton() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'todo' | 'habit' | null>(null);
  const [hideButton, setHideButton] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const lastVisibleTime = useRef(Date.now());

  const { addTodo } = useTodoStore();
  const { addHabit } = useHabitStore();

  const handleAddTodo = (text: string, date?: string) => {
    addTodo(text, date);
  };

  const handleAddHabit = (name: string, color: string, icon: string) => {
    addHabit(name, color, icon);
  };

  const handleClose = useCallback(() => {
    if (!open) return;

    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 200);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, handleClose]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const diff = scrollTop - lastScrollTop.current;

      if (diff > 10) {
        handleClose();
        setHideButton(true);
        lastVisibleTime.current = Date.now();
      } else if (diff < -15 && Date.now() - lastVisibleTime.current > 300) {
        setHideButton(false);
      }

      lastScrollTop.current = Math.max(scrollTop, 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleClose]);

  return (
    <>
      {modalType === 'todo' && (
        <AddTodoModal onClose={() => setModalType(null)} onAdd={handleAddTodo} />
      )}
      {modalType === 'habit' && (
        <AddHabitModal onClose={() => setModalType(null)} onAdd={handleAddHabit} />
      )}

      <motion.div
        ref={containerRef}
        className="fixed bottom-20 right-4 z-40 flex items-end gap-2"
        animate={{
          x: hideButton ? 100 : 0,
          opacity: hideButton ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="buttons"
              initial={{ width: 44 }}
              animate={{ width: 'max-content' }}
              exit={{ width: 44 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2 p-2 overflow-hidden"
            >
              <button
                onClick={() => {
                  handleClose();
                  setModalType('todo');
                }}
                className="px-4 py-2 bg-[#6563ff] text-white rounded text-base shadow h-[40px]"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isClosing ? 0 : 1,
                    transition: { 
                      opacity: { 
                        delay: isClosing ? 0 : 0.3,
                        duration: 0.2 
                      } 
                    }
                  }}
                >
                  Добавить задачу
                </motion.span>          
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setModalType('habit');
                }}
                className="px-4 py-2 bg-green-500 text-white rounded text-base shadow h-[40px]"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isClosing ? 0 : 1,
                    transition: { 
                      opacity: { 
                        delay: isClosing ? 0 : 0.3,
                        duration: 0.2 
                      } 
                    }
                  }}
                >
                  Добавить привычку
                </motion.span>
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="plus"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(true)}
              className="w-12 h-12 rounded-full bg-[#6563ff] flex items-center justify-center shadow-lg"
            >
              <img src="img/plus.png" className="h-6 w-6"></img>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default AddButton;