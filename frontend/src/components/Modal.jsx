import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative bg-surface w-full max-w-xl rounded-2xl shadow-xl overflow-hidden border border-border"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
