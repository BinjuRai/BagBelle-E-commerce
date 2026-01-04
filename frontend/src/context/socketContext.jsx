

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    console.warn('useSocket must be used within a SocketProvider');
    return {
      socket: null,
      notifications: [],
      unreadCount: 0,
      isConnected: false,
      markAsRead: () => {},
      setNotifications: () => {},
      setUnreadCount: () => {}
    };
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Use your backend URL - update this to match your setup
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050';
      
      const newSocket = io(API_URL, {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Socket connected ✅');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected ❌');
        setIsConnected(false);
      });

      // Listen for notifications
      newSocket.on('notification', ({ notification }) => {
        console.log('New notification received:', notification);
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show toast notification with PlantNest theme
        toast.success(notification.title, {
          duration: 4000,
          icon: '🔔',
          style: {
            background: '#538767',
            color: '#fff',
          },
        });
      });

      newSocket.on('notification_marked_read', ({ notificationId }) => {
        setNotifications(prev =>
          prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, []);

  const markAsRead = (notificationId) => {
    if (socket) {
      socket.emit('mark_notification_read', notificationId);
    }
  };

  const value = {
    socket,
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    setNotifications,
    setUnreadCount
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};