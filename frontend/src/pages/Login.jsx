import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
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

                <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full bg-background border ${errors.email ? 'border-error' : 'border-border'} rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600`}
                                placeholder="name@example.com"
                            />
                            {errors.email && (
                                <p className="text-error text-xs mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    <AlertCircle size={12} /> {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Password</label>
                            <input
                                {...register('password')}
                                type="password"
                                className={`w-full bg-background border ${errors.password ? 'border-error' : 'border-border'} rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-error text-xs mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    <AlertCircle size={12} /> {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-95 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
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
