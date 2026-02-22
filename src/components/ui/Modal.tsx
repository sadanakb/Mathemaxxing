'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className={[
            'w-full rounded-[var(--card-radius)] p-0 shadow-2xl',
            'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
            sizeClasses[size],
          ].join(' ')}
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="modal-title"
                className="text-xl font-bold text-gray-900 font-[family-name:var(--font-heading)]"
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Schließen"
              >
                <Icon name="x" size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
