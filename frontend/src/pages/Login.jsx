import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-surface w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden glass animate-in fade-in zoom-in duration-500">
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                        <TrendingUp size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">Welcome Back</h2>
                    <p className="text-text-secondary mt-2">Manage your assets with ease</p>
                </div>

                <form className="p-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>

                    <p className="text-center text-text-secondary text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-primary/80 font-bold transition-colors">
                            Create account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
