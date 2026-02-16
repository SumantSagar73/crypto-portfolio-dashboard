import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Modal from './Modal';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-error/5 border border-error/20 rounded-xl text-error">
                    <div className="p-2 bg-error/10 rounded-lg shrink-0">
                        <FiAlertTriangle size={20} />
                    </div>
                    <p className="font-medium text-sm leading-relaxed">{message}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 rounded-xl font-bold transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-error hover:bg-error/90 text-background font-bold py-2.5 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? 'Processing...' : 'Delete Asset'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
