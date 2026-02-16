import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiPieChart, FiAlertCircle, FiChevronRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Register = () => {
    const { register: registerAuth } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        try {
            await registerAuth({
                name: data.name,
                email: data.email,
                password: data.password
            });
            toast.success('Account Created');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-surface/50 w-full max-w-[460px] rounded-2xl border border-border shadow-2xl relative z-10 overflow-hidden"
            >
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-background mx-auto mb-6 shadow-lg shadow-primary/20">
                        <FiPieChart size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-text-secondary mt-2 text-sm font-medium">Join us to start tracking your assets</p>
                </div>

                <form className="p-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    {...register('name')}
                                    type="text"
                                    className={`w-full bg-background/50 border ${errors.name ? 'border-error' : 'border-border'} rounded-xl px-11 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-700`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-error text-[10px] font-bold mt-1.5 flex items-center gap-1 ml-1">
                                    <FiAlertCircle size={12} /> {errors.name.message}
                                </p>
                            )}
                        </div>

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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        {...register('password')}
                                        type="password"
                                        className={`w-full bg-background/50 border ${errors.password ? 'border-error' : 'border-border'} rounded-xl px-11 sm:px-4 sm:pl-10 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-700`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 ml-1">
                                    Confirm
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -transform -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        {...register('confirmPassword')}
                                        type="password"
                                        className={`w-full bg-background/50 border ${errors.confirmPassword ? 'border-error' : 'border-border'} rounded-xl px-11 sm:px-4 sm:pl-10 py-3 text-white font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-700`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                        {(errors.password || errors.confirmPassword) && (
                            <p className="text-error text-[10px] font-bold mt-1.5 flex items-center gap-1 ml-1">
                                <FiAlertCircle size={12} /> {errors.password?.message || errors.confirmPassword?.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group mt-2"
                    >
                        <span>{isSubmitting ? 'Creating...' : 'Sign Up'}</span>
                        <FiChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-text-secondary text-xs font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white hover:text-primary font-bold transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
