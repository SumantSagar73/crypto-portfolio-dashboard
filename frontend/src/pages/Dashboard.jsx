import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import API from '../api/axios';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import AssetForm from '../components/AssetForm';

const Dashboard = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('All');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    // Delete Confirmation states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await API.get('/api/portfolio');
            setAssets(res.data);
        } catch (err) {
            toast.error('Failed to fetch assets');
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdateAsset = async (formData) => {
        setFormLoading(true);
        try {
            if (editingAsset) {
                await API.put(`/api/portfolio/${editingAsset._id}`, formData);
                toast.success('Asset updated!');
            } else {
                await API.post('/api/portfolio', formData);
                toast.success('Asset added to portfolio!');
            }
            fetchAssets();
            setIsModalOpen(false);
            setEditingAsset(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Action failed');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteClick = (asset) => {
        setAssetToDelete(asset);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!assetToDelete) return;
        setDeleteLoading(true);
        try {
            await API.delete(`/api/portfolio/${assetToDelete._id}`);
            setAssets(assets.filter(a => a._id !== assetToDelete._id));
            toast.success(`${assetToDelete.name} removed from portfolio`);
            setIsDeleteModalOpen(false);
            setAssetToDelete(null);
        } catch (err) {
            toast.error('Failed to delete asset');
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSymbol = selectedSymbol === 'All' || asset.symbol === selectedSymbol;
        return matchesSearch && matchesSymbol;
    });

    const uniqueSymbols = ['All', ...new Set(assets.map(a => a.symbol))];

    const totalInvested = assets.reduce((acc, curr) => acc + (curr.buyPrice * curr.quantity), 0);
    const assetCount = assets.length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Portfolio Overview</h1>
                    <p className="text-text-secondary">Track and manage your crypto assets in one place.</p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/10 active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add New Asset</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-xl glass">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-xl text-accent">
                            <DollarSign size={24} />
                        </div>
                        <p className="text-text-secondary font-medium uppercase text-xs tracking-wider">Total Invested</p>
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                </div>

                <div className="bg-surface p-6 rounded-2xl border border-border shadow-xl glass">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                            <PieChart size={24} />
                        </div>
                        <p className="text-text-secondary font-medium uppercase text-xs tracking-wider">Total Assets</p>
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">{assetCount}</h2>
                </div>

                <div className="bg-surface p-6 rounded-2xl border border-border shadow-xl glass">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-text-secondary font-medium uppercase text-xs tracking-wider">Portfolio Health</p>
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">Active</h2>
                </div>
            </div>

            {/* Main Table Section */}
            <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-2xl glass">
                <div className="p-6 border-b border-border bg-background/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-bold text-text-primary">Your Holdings</h3>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={18} />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-text-primary"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                            <select
                                value={selectedSymbol}
                                onChange={(e) => setSelectedSymbol(e.target.value)}
                                className="bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-text-secondary"
                            >
                                {uniqueSymbols.map(sym => (
                                    <option key={sym} value={sym}>{sym}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 flex justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredAssets.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-background/80 text-text-secondary text-xs uppercase tracking-widest font-bold">
                                    <th className="px-6 py-4 border-b border-border">Asset</th>
                                    <th className="px-6 py-4 border-b border-border">Quantity</th>
                                    <th className="px-6 py-4 border-b border-border">Buy Price</th>
                                    <th className="px-6 py-4 border-b border-border">Total Value</th>
                                    <th className="px-6 py-4 border-b border-border">Purchase Date</th>
                                    <th className="px-6 py-4 border-b border-border text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {filteredAssets.map((asset) => (
                                    <tr key={asset._id} className="hover:bg-primary/5 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                                    {asset.symbol[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-text-primary">{asset.name}</div>
                                                    <div className="text-xs text-text-secondary font-medium">{asset.symbol}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-medium text-text-primary">{asset.quantity}</td>
                                        <td className="px-6 py-5 font-medium text-text-secondary">${asset.buyPrice.toLocaleString()}</td>
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-primary">${(asset.quantity * asset.buyPrice).toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-5 text-text-secondary text-sm italic">
                                            {new Date(asset.purchaseDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => { setEditingAsset(asset); setIsModalOpen(true); }}
                                                    className="p-2 hover:bg-surface rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(asset)}
                                                    className="p-2 hover:bg-error/20 rounded-lg text-text-secondary hover:text-error transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-20 text-center">
                            <div className="inline-flex p-6 bg-background rounded-full mb-4 text-text-secondary border border-border">
                                <PieChart size={48} />
                            </div>
                            <h4 className="text-xl font-bold text-text-primary mb-2">No assets found</h4>
                            <p className="text-text-secondary max-w-xs mx-auto mb-8">Start adding your crypto holdings to build your dashboard.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-primary hover:text-primary/80 font-bold border-2 border-primary/30 hover:border-primary px-6 py-2 rounded-xl transition-all"
                            >
                                Add Your First Asset
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Asset Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAsset ? 'Edit Asset' : 'Add New Asset'}
            >
                <AssetForm
                    onSubmit={handleAddOrUpdateAsset}
                    initialData={editingAsset}
                    isLoading={formLoading}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Remove Asset"
                message={`Are you sure you want to remove ${assetToDelete?.name} from your portfolio? This action cannot be undone.`}
                isLoading={deleteLoading}
            />
        </div>
    );
};

export default Dashboard;
