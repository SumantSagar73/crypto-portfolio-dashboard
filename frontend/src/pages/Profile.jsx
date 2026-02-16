import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiSave, FiSettings } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.put('/api/users/profile', { name });
            setUser({ ...user, name: res.data.name });
            toast.success('Profile updated');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Loading...';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-xl border border-border">
                    <FiSettings size={24} className="text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                    <p className="text-text-secondary text-sm font-medium">Manage your profile and account details</p>
                </div>
            </div>

            <div className="bg-surface/50 rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                        <div className="w-24 h-24 rounded-2xl bg-background border border-border flex items-center justify-center text-primary text-4xl font-bold shadow-inner">
                            {user.name[0].toUpperCase()}
                        </div>
                        <div className="text-center md:text-left pt-2">
                            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                            <p className="text-text-secondary font-medium">{user.email}</p>
                            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                Active Account
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-background/50 border border-border rounded-xl px-11 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                    Email Address
                                </label>
                                <div className="relative opacity-60">
                                    <FiMail className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        type="text"
                                        value={user.email}
                                        disabled
                                        className="w-full bg-background/30 border border-border/50 rounded-xl px-11 py-3 text-text-secondary cursor-not-allowed outline-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-background/50 rounded-xl border border-border flex items-center justify-between">
                            <div className="flex items-center gap-3 text-text-secondary text-sm font-medium">
                                <FiCalendar size={18} className="text-primary" />
                                <span>Member since: <span className="text-white ml-0.5 mono-numbers">{formattedDate}</span></span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading || name === user.name}
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-background font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSave size={18} />
                                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-surface/30 border border-border p-6 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Account Information</h4>
                <p className="text-text-secondary text-sm font-medium leading-relaxed">
                    Identity details are synchronized with the primary database. For security reasons, email addresses cannot be changed through this interface. Contact support for significant account modifications.
                </p>
            </div>
        </motion.div>
    );
};

export default Profile;
