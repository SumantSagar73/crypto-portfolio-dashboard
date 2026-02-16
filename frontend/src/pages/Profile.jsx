import React, { useState } from 'react';
import { User, Mail, Calendar, Save, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.put('/api/users/profile', { name });
            setUser({ ...user, name: res.data.name });
            toast.success('Profile updated!');
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
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">User Profile</h1>
                <p className="text-text-secondary">View and manage your account information securely.</p>
            </div>

            <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-2xl glass">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 border-b border-border">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-background text-4xl font-bold shadow-lg shadow-primary/20">
                            {user.name[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">{user.name}</h2>
                            <p className="text-secondary font-medium">{user.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                                <User size={16} /> Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                                <Mail size={16} /> Email Address (Read-only)
                            </label>
                            <input
                                type="text"
                                value={user.email}
                                disabled
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-secondary cursor-not-allowed outline-none opacity-50"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-background/50 rounded-2xl border border-border/50 flex items-center gap-4 text-text-secondary text-sm">
                        <Calendar size={18} className="text-primary" />
                        <span>Member since: <b className="text-text-primary ml-1">{formattedDate}</b></span>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading || name === user.name}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-gray-700 disabled:text-gray-500 text-background font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-95"
                        >
                            <Save size={20} />
                            <span>{loading ? 'Saving Changes...' : 'Save Profile'}</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-primary mb-2">Security Note</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                    Your profile data is encrypted and stored securely. We do not share your personal information with third parties. Email address changes are currently disabled for security reasons.
                </p>
            </div>
        </div>
    );
};

export default Profile;
