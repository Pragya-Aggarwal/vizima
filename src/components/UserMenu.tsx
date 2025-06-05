import React from 'react';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
    userName: string;
}

export const UserMenu = ({ userName }: UserMenuProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored user data/session
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-green" />
                </div>
                <span className="text-sm font-medium hidden md:inline-block">
                    {userName}
                </span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
            >
                <LogOut className="h-5 w-5" />
                <span className="ml-2 hidden md:inline-block">Logout</span>
            </Button>
        </div>
    );
}; 