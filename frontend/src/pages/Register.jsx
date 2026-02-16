import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, AlertCircle } from 'lucide-react';
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
    path: ["confirmPassword"]
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
            toast.success('Account created! Welcome.');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-surface w-full max-w-md rounded-3xl border border-border shadow-2xl overflow-hidden glass animate-in fade-in zoom-in duration-500">
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                        <TrendingUp size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">Join CryptoDash</h2>
                    <p className="text-text-secondary mt-2">Start tracking your assets today</p>
                </div>

                <form className="p-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Full Name</label>
                            <input
                                {...register('name')}
                                type="text"
                                className={`w-full bg-background border ${errors.name ? 'border-error' : 'border-border'} rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600`}
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="text-error text-xs mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    <AlertCircle size={12} /> {errors.name.message}
                                </p>
                            )}
                        </div>
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
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Confirm Password</label>
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                className={`w-full bg-background border ${errors.confirmPassword ? 'border-error' : 'border-border'} rounded-xl px-4 py-3 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <p className="text-error text-xs mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    <AlertCircle size={12} /> {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/10 active:scale-95 disabled:opacity-50 mt-4"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <p className="text-center text-text-secondary text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
