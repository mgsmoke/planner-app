import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const AiButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const lastVisibleTime = useRef(Date.now());

  const SCROLL_UP_THRESHOLD = 15;

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const diff = scrollTop - lastScrollTop.current;

    if (!isInputFocused) {
      if (diff > 10) {
        setIsExpanded(false);
        setHideButton(true);
        lastVisibleTime.current = Date.now();
      } else if (
        diff < -SCROLL_UP_THRESHOLD &&
        Date.now() - lastVisibleTime.current > 300
      ) {
        setHideButton(false);
      }
    }

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputFocused]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-24 right-[4%] z-40"
      animate={{
        x: hideButton ? 100 : 0,
        opacity: hideButton ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="input"
            initial={{ width: 44 }}
            animate={{ width: '92vw' }}
            exit={{ width: 44 }}
            transition={{ duration: 0.3 }}
            className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border"
          >
            <input
              autoFocus
              type="text"
              placeholder="Введите запрос..."
              className="flex-1 p-3 pl-4 outline-none"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-full bg-[#6563ff] flex items-center justify-center shadow-lg"
          >
            <img src="img/search.png" className="h-6 w-6"></img>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AiButton;
