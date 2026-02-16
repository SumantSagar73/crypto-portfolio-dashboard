import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-error/10 border border-error/20 rounded-2xl text-error">
                    <div className="p-2 bg-error/20 rounded-full">
                        <AlertTriangle size={24} />
                    </div>
                    <p className="font-medium">{message}</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-border text-text-secondary rounded-xl hover:bg-surface transition-colors font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-error hover:bg-error/90 text-background font-bold py-3 rounded-xl transition-all shadow-lg shadow-error/10 active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
