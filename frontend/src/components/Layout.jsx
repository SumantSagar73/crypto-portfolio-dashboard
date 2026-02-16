import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, User, Wallet } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col">
            {/* Navbar */}
            <nav className="bg-surface/80 border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                    <Wallet className="text-primary w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight text-text-primary">CryptoDash</span>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                            <LayoutDashboard size={18} />
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                            <User size={18} />
                            <span className="text-sm font-medium">Profile</span>
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-border"></div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Logged in as</span>
                            <span className="text-sm font-semibold text-secondary">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2.5 bg-error/10 hover:bg-error/20 text-error rounded-xl transition-all border border-error/20"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-border py-6 text-center text-text-secondary text-sm">
                &copy; {new Date().getFullYear()} Crypto Portfolio Dashboard. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
