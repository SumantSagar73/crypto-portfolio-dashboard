import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiPieChart, FiAlertCircle, FiChevronRight } from 'react-icons/fi';
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
            toast.success('Access Granted');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-surface/50 w-full max-w-[420px] rounded-2xl border border-border shadow-2xl relative z-10 overflow-hidden"
            >
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-background mx-auto mb-6 shadow-lg shadow-primary/20">
                        <FiPieChart size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-text-secondary mt-2 text-sm font-medium">Log in to manage your portfolio</p>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={`w-full bg-background/50 border ${errors.email ? 'border-error' : 'border-border'} rounded-xl px-11 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-700`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-error text-[10px] font-bold mt-1.5 flex items-center gap-1 ml-1">
                                    <FiAlertCircle size={12} /> {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    {...register('password')}
                                    type="password"
                                    className={`w-full bg-background/50 border ${errors.password ? 'border-error' : 'border-border'} rounded-xl px-11 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-700`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-error text-[10px] font-bold mt-1.5 flex items-center gap-1 ml-1">
                                    <FiAlertCircle size={12} /> {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                        <span>{isSubmitting ? 'Verifying...' : 'Sign In'}</span>
                        <FiChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-text-secondary text-xs font-medium">
                            Need an account?{' '}
                            <Link to="/register" className="text-white hover:text-primary font-bold transition-colors">
                                Create one here
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
