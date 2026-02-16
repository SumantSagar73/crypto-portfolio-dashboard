import React, { useState, useEffect } from 'react';

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

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Asset Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                        placeholder="e.g. Bitcoin"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Symbol</label>
                    <input
                        type="text"
                        name="symbol"
                        value={formData.symbol}
                        onChange={onChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none uppercase transition-all placeholder:text-gray-600"
                        placeholder="e.g. BTC"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Quantity</label>
                    <input
                        type="number"
                        step="any"
                        name="quantity"
                        value={formData.quantity}
                        onChange={onChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Buy Price ($)</label>
                    <input
                        type="number"
                        step="any"
                        name="buyPrice"
                        value={formData.buyPrice}
                        onChange={onChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Purchase Date</label>
                <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={onChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Notes (Optional)</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={onChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none resize-none transition-all placeholder:text-gray-600"
                    rows="3"
                    placeholder="Add some details..."
                ></textarea>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-background font-bold py-2 rounded-lg transition-all disabled:opacity-50 shadow-lg shadow-primary/10 active:scale-95"
                >
                    {isLoading ? 'Saving...' : initialData ? 'Update Asset' : 'Add Asset'}
                </button>
            </div>
        </form>
    );
};

export default AssetForm;
