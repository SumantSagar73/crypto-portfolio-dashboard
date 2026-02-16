import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHexagon, FiHash, FiLayers, FiDollarSign, FiCalendar, FiEdit3, FiX, FiCheck } from 'react-icons/fi';

const AssetForm = ({ onSubmit, initialData, isLoading, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        quantity: '',
        buyPrice: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        notes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                purchaseDate: initialData.purchaseDate ? new Date(initialData.purchaseDate).toISOString().split('T')[0] : ''
            });
        }
    }, [initialData]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClasses = "w-full bg-background border border-white/10 rounded-2xl px-12 py-3.5 text-white font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-700 font-sans";
    const labelClasses = "block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-2.5 ml-1 flex items-center gap-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <label className={labelClasses}><FiHexagon size={12} className="text-primary" /> Asset Name</label>
                    <div className="relative">
                        <FiEdit3 className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            className={inputClasses}
                            placeholder="e.g. Bitcoin"
                        />
                    </div>
                </div>
                <div className="relative group">
                    <label className={labelClasses}><FiHash size={12} className="text-secondary" /> Symbol</label>
                    <div className="relative">
                        <FiLayers className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary group-focus-within:text-secondary transition-colors" size={18} />
                        <input
                            type="text"
                            name="symbol"
                            value={formData.symbol}
                            onChange={onChange}
                            required
                            className={`${inputClasses} uppercase`}
                            placeholder="BTC"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <label className={labelClasses}><FiLayers size={12} className="text-accent" /> Quantity</label>
                    <div className="relative">
                        <FiLayers className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="number"
                            step="any"
                            name="quantity"
                            value={formData.quantity}
                            onChange={onChange}
                            required
                            className={`${inputClasses} mono-numbers`}
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div className="relative group">
                    <label className={labelClasses}><FiDollarSign size={12} className="text-primary" /> Execution Price ($)</label>
                    <div className="relative">
                        <FiDollarSign className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="number"
                            step="any"
                            name="buyPrice"
                            value={formData.buyPrice}
                            onChange={onChange}
                            required
                            className={`${inputClasses} mono-numbers`}
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            <div className="relative group">
                <label className={labelClasses}><FiCalendar size={12} className="text-secondary" /> Purchase Date</label>
                <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary group-focus-within:text-secondary transition-colors" size={18} />
                    <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={onChange}
                        required
                        className={`${inputClasses} mono-numbers [color-scheme:dark]`}
                    />
                </div>
            </div>

            <div className="relative group">
                <label className={labelClasses}><FiEdit3 size={12} className="text-accent" /> Strategic Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={onChange}
                    className="w-full bg-background border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:ring-2 focus:ring-accent outline-none resize-none transition-all placeholder:text-gray-700 min-h-[100px]"
                    placeholder="Capture essential market context..."
                ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 rounded-2xl font-bold transition-all group"
                >
                    <FiX size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Abort</span>
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 group"
                >
                    <FiCheck size={20} className="group-hover:scale-110 transition-transform" />
                    <span>{isLoading ? 'Transmitting...' : initialData ? 'Commit Update' : 'Initialize Asset'}</span>
                </button>
            </div>
        </form>
    );
};

export default AssetForm;
