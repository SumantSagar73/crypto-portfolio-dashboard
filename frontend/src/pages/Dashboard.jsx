import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiTrendingUp, FiPieChart, FiDollarSign } from 'react-icons/fi';
import {
    SiBitcoin, SiEthereum, SiSolana, SiCardano, SiBinance, SiXrp, SiPolkadot, SiDogecoin, SiTether
} from 'react-icons/si';
import API from '../api/axios';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import AssetForm from '../components/AssetForm';

const getCoinIcon = (symbol) => {
    const sym = symbol.toLowerCase();
    switch (sym) {
        case 'btc': return <SiBitcoin className="text-[#F7931A]" />;
        case 'eth': return <SiEthereum className="text-[#627EEA]" />;
        case 'sol': return <SiSolana className="text-[#14F195]" />;
        case 'ada': return <SiCardano className="text-[#0033AD]" />;
        case 'bnb': return <SiBinance className="text-[#F3BA2F]" />;
        case 'xrp': return <SiXrp className="text-[#23292F]" />;
        case 'dot': return <SiPolkadot className="text-[#E6007A]" />;
        case 'doge': return <SiDogecoin className="text-[#C2A633]" />;
        case 'usdt': return <SiTether className="text-[#26A17B]" />;
        default: return <FiDollarSign />;
    }
};

const Dashboard = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('All');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

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
                toast.success('Asset updated');
            } else {
                await API.post('/api/portfolio', formData);
                toast.success('Asset added');
            }
            fetchAssets();
            setIsModalOpen(false);
            setEditingAsset(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error saving asset');
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
            toast.success(`${assetToDelete.name} removed`);
            setIsDeleteModalOpen(false);
            setAssetToDelete(null);
        } catch (err) {
            toast.error('Deletion failed');
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Portfolio Overview</h1>
                    <p className="text-text-secondary text-sm font-medium">Manage and track your crypto investments</p>
                </div>
                <button
                    onClick={() => { setEditingAsset(null); setIsModalOpen(true); }}
                    className="bg-primary hover:bg-primary/90 text-background px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-[0.98] flex items-center gap-2"
                >
                    <FiPlus size={18} />
                    <span>Add Asset</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Invested', value: `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: <FiDollarSign size={20} />, color: 'primary' },
                    { label: 'Total Assets', value: assets.length, icon: <FiPieChart size={20} />, color: 'secondary' },
                    { label: 'Portfolio Status', value: 'Active', icon: <FiTrendingUp size={20} />, color: 'primary' }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-surface/50 p-6 rounded-2xl border border-border transition-colors hover:border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 hidden sm:block bg-${stat.color}/10 rounded-lg text-${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mono-numbers truncate">{stat.value}</h2>
                    </div>
                ))}
            </div>

            {/* Assets Table */}
            <div className="bg-surface/30 rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-bold text-white">Your Assets</h3>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-600 font-medium"
                            />
                        </div>

                        <div className="relative">
                            <FiFilter className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={14} />
                            <select
                                value={selectedSymbol}
                                onChange={(e) => setSelectedSymbol(e.target.value)}
                                className="bg-background/50 border border-border rounded-xl pl-9 pr-8 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer text-text-secondary font-semibold"
                            >
                                {uniqueSymbols.map(sym => (
                                    <option key={sym} value={sym} className="bg-surface">{sym}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-text-secondary text-sm font-medium">Loading portfolio...</p>
                        </div>
                    ) : filteredAssets.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-text-secondary text-[11px] uppercase tracking-wider font-bold border-b border-border bg-white/5">
                                    <th className="px-6 py-4">Asset</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Total Value</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <AnimatePresence initial={false}>
                                    {filteredAssets.map((asset) => (
                                        <motion.tr
                                            key={asset._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/5 group-hover:border-primary/20 transition-all">
                                                        {getCoinIcon(asset.symbol)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-base">{asset.name}</div>
                                                        <div className="text-[11px] text-text-secondary font-bold uppercase">{asset.symbol}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 mono-numbers text-text-primary font-semibold">{asset.quantity}</td>
                                            <td className="px-6 py-5 mono-numbers text-text-secondary font-medium">
                                                ${asset.buyPrice.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="mono-numbers text-primary font-bold">
                                                        ${(asset.quantity * asset.buyPrice).toLocaleString()}
                                                    </span>
                                                    <span className="text-[10px] text-text-secondary font-medium">
                                                        {new Date(asset.purchaseDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => { setEditingAsset(asset); setIsModalOpen(true); }}
                                                        className="p-2 bg-white/5 hover:bg-primary/20 text-text-secondary hover:text-primary rounded-lg transition-colors border border-border"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(asset)}
                                                        className="p-2 bg-white/5 hover:bg-error/20 text-text-secondary hover:text-error rounded-lg transition-colors border border-border"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-20 text-center">
                            <FiPieChart size={48} className="mx-auto text-border mb-4" />
                            <h4 className="text-xl font-bold text-white mb-1">Portfolio Empty</h4>
                            <p className="text-text-secondary text-sm mb-6 max-w-xs mx-auto">No assets added yet. Start by tracking your first position.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-white text-background hover:bg-primary font-bold px-8 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                            >
                                Add Your First Asset
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
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

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Remove Asset"
                message={`Are you sure you want to remove ${assetToDelete?.name} from your portfolio?`}
                isLoading={deleteLoading}
            />
        </motion.div>
    );
};

export default Dashboard;
