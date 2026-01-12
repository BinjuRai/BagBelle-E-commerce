import React, { useState, useEffect } from 'react';
import { Bell, Trash2, CheckCheck } from 'lucide-react';
import { useSocket } from '../context/socketContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const NotificationsPage = () => {
  const { notifications, unreadCount, markAsRead, setNotifications, setUnreadCount } = useSocket();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      const { data } = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      markAsRead(notificationId);
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      await axios.put(
        `${API_URL}/notifications/mark-all-read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      await axios.delete(`${API_URL}/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order_placed: '📦',
      order_confirmed: '✅',
      order_shipped: '🚚',
      order_delivered: '🎉',
      order_cancelled: '❌',
      payment_success: '💳',
      payment_failed: '⚠️'
    };
    return icons[type] || '🔔';
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#538767]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#274E36] flex items-center gap-3">
                <Bell size={32} />
                Notifications
              </h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your plant orders
                {unreadCount > 0 && (
                  <span className="ml-2 text-[#538767] font-semibold">
                    ({unreadCount} unread)
                  </span>
                )}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={loading}
                className="bg-[#538767] text-white px-4 py-2 rounded-lg hover:bg-[#274E36] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCheck size={18} />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[#538767] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                filter === 'unread'
                  ? 'bg-[#538767] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                filter === 'read'
                  ? 'bg-[#538767] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bell size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? "You're all caught up! 🎉" 
                : "We'll notify you when something happens"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-[#538767]' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-4xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-sm text-gray-400">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true
                          })}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-[#538767] hover:text-[#274E36] transition-colors p-2"
                            title="Mark as read"
                          >
                            <CheckCheck size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-2"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#538767]">
                          <div className="w-2 h-2 bg-[#538767] rounded-full animate-pulse" />
                          Unread
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;