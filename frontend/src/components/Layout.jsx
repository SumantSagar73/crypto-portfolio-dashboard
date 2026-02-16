import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiLogOut, FiPieChart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Assets', icon: <FiHome size={18} /> },
        { path: '/profile', label: 'Settings', icon: <FiUser size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} p-4`}
            >
                <div className={`h-full bg-surface/80 backdrop-blur-md rounded-2xl flex flex-col border border-border shadow-lg relative transition-all duration-300 ${!isSidebarOpen && 'items-center'}`}>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="absolute right-0 top-12 bg-surface border border-border text-text-primary p-1 rounded-md shadow-md hover:bg-border transition-all hidden lg:flex items-center justify-center z-[60] translate-x-1/2"
                    >
                        {isSidebarOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
                    </button>

                    {/* Logo Section */}
                    <div className={`flex items-center justify-center transition-all duration-300 ${isSidebarOpen ? 'p-6 min-h-[80px] justify-start' : 'p-4 min-h-[70px]'}`}>
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background shrink-0 shadow-lg shadow-primary/20">
                            <FiPieChart size={18} />
                        </div>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="text-lg font-bold tracking-tight text-white ml-3 truncate overflow-hidden"
                                >
                                    CryptoDash
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 space-y-2 transition-all duration-300 ${isSidebarOpen ? 'px-3 py-4' : 'px-2 py-4'}`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center rounded-xl transition-all duration-200 ${isSidebarOpen ? 'px-4 py-3' : 'p-3'} ${location.pathname === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                                    }`}
                                title={!isSidebarOpen ? item.label : ''}
                            >
                                <span className="shrink-0 leading-none">
                                    {item.icon}
                                </span>
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="font-medium text-sm ml-3 whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Summary */}
                    <div className={`mt-auto border-t border-border/50 transition-all duration-300 ${isSidebarOpen ? 'p-3' : 'px-2 py-4'}`}>
                        <div
                            className={`flex items-center rounded-xl bg-white/5 transition-all duration-200 ${isSidebarOpen ? 'p-2' : 'p-2.5'}`}
                            title={!isSidebarOpen ? user?.name : ''}
                        >
                            <div className="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary font-bold text-[10px] shrink-0 leading-none">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                            {isSidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex-1 min-w-0 ml-3 overflow-hidden"
                                >
                                    <p className="text-[11px] font-bold text-white truncate">{user?.name}</p>
                                    <p className="text-[10px] text-text-secondary truncate">Member</p>
                                </motion.div>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`w-full mt-3 flex items-center text-text-secondary hover:text-error hover:bg-error/5 rounded-xl transition-all duration-200 ${isSidebarOpen ? 'px-4 py-3' : 'p-3'}`}
                            title={!isSidebarOpen ? 'Logout' : 'Sign Out'}
                        >
                            <span className="shrink-0 leading-none"><FiLogOut size={18} /></span>
                            {isSidebarOpen && (
                                <span className="font-medium text-xs ml-3 whitespace-nowrap leading-none">Sign Out</span>
                            )}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-200 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8 min-h-screen`}>
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
