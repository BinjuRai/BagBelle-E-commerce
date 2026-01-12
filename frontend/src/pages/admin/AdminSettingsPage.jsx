import React, { useState, useEffect } from 'react';
import { Settings, Save, Upload, Bell, Shield, Database, Mail } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: 'Bagbelle',
    storeEmail: 'info@bagbelle.com',
    storePhone: '+977 1234567890',
    storeAddress: 'Kathmandu, Nepal',
    currency: 'NPR',
    taxRate: 13,
    shippingFee: 150,
    freeShippingThreshold: 2000,
    notifications: {
      orderPlaced: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true
    }
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      await axios.put(
        `${API_URL}/admin/settings`,
        settings,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="min-h-screen bg-gray-50 py-8">
  //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //       {/* Header */}
  //       <div className="mb-8">
  //         <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
  //           <Settings size={32} />
  //           Store Settings
  //         </h1>
  //         <p className="text-gray-600 mt-2">Configure your store preferences</p>
  //       </div>

  //       {/* Store Information */}
  //       <div className="bg-white rounded-lg shadow p-6 mb-6">
  //         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
  //           <Database size={20} />
  //           Store Information
  //         </h2>
  //         <div className="space-y-4">
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Store Name</label>
  //             <input
  //               type="text"
  //               value={settings.storeName}
  //               onChange={(e) => setSettings({...settings, storeName: e.target.value})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Store Email</label>
  //             <input
  //               type="email"
  //               value={settings.storeEmail}
  //               onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Store Phone</label>
  //             <input
  //               type="tel"
  //               value={settings.storePhone}
  //               onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Store Address</label>
  //             <textarea
  //               value={settings.storeAddress}
  //               onChange={(e) => setSettings({...settings, storeAddress: e.target.value})}
  //               rows={3}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Pricing & Shipping */}
  //       <div className="bg-white rounded-lg shadow p-6 mb-6">
  //         <h2 className="text-xl font-semibold mb-4">Pricing & Shipping</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Currency</label>
  //             <select
  //               value={settings.currency}
  //               onChange={(e) => setSettings({...settings, currency: e.target.value})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             >
  //               <option value="NPR">NPR (Nepalese Rupee)</option>
  //               <option value="USD">USD (US Dollar)</option>
  //               <option value="EUR">EUR (Euro)</option>
  //             </select>
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
  //             <input
  //               type="number"
  //               value={settings.taxRate}
  //               onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Shipping Fee (Rs.)</label>
  //             <input
  //               type="number"
  //               value={settings.shippingFee}
  //               onChange={(e) => setSettings({...settings, shippingFee: parseFloat(e.target.value)})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium mb-1">Free Shipping Threshold (Rs.)</label>
  //             <input
  //               type="number"
  //               value={settings.freeShippingThreshold}
  //               onChange={(e) => setSettings({...settings, freeShippingThreshold: parseFloat(e.target.value)})}
  //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Notifications */}
  //       <div className="bg-white rounded-lg shadow p-6 mb-6">
  //         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
  //           <Bell size={20} />
  //           Notification Preferences
  //         </h2>
  //         <div className="space-y-3">
  //           <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
  //             <input
  //               type="checkbox"
  //               checked={settings.notifications.orderPlaced}
  //               onChange={(e) => setSettings({
  //                 ...settings,
  //                 notifications: {...settings.notifications, orderPlaced: e.target.checked}
  //               })}
  //               className="w-5 h-5"
  //             />
  //             <div>
  //               <p className="font-medium">Order Placed</p>
  //               <p className="text-sm text-gray-500">Send notifications when new orders are placed</p>
  //             </div>
  //           </label>
  //           <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
  //             <input
  //               type="checkbox"
  //               checked={settings.notifications.orderShipped}
  //               onChange={(e) => setSettings({
  //                 ...settings,
  //                 notifications: {...settings.notifications, orderShipped: e.target.checked}
  //               })}
  //               className="w-5 h-5"
  //             />
  //             <div>
  //               <p className="font-medium">Order Shipped</p>
  //               <p className="text-sm text-gray-500">Send notifications when orders are shipped</p>
  //             </div>
  //           </label>
  //           <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
  //             <input
  //               type="checkbox"
  //               checked={settings.notifications.orderDelivered}
  //               onChange={(e) => setSettings({
  //                 ...settings,
  //                 notifications: {...settings.notifications, orderDelivered: e.target.checked}
  //               })}
  //               className="w-5 h-5"
  //             />
  //             <div>
  //               <p className="font-medium">Order Delivered</p>
  //               <p className="text-sm text-gray-500">Send notifications when orders are delivered</p>
  //             </div>
  //           </label>
  //           <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
  //             <input
  //               type="checkbox"
  //               checked={settings.notifications.lowStock}
  //               onChange={(e) => setSettings({
  //                 ...settings,
  //                 notifications: {...settings.notifications, lowStock: e.target.checked}
  //               })}
  //               className="w-5 h-5"
  //             />
  //             <div>
  //               <p className="font-medium">Low Stock Alerts</p>
  //               <p className="text-sm text-gray-500">Get notified when products are running low</p>
  //             </div>
  //           </label>
  //         </div>
  //       </div>

  //       {/* Save Button */}
  //       <button
  //         onClick={handleSave}
  //         disabled={loading}
  //         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
  //       >
  //         <Save size={20} />
  //         {loading ? 'Saving...' : 'Save Settings'}
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-primary">
            Store Settings
          </h1>
          <p className="text-muted mt-1">
            Manage store preferences and system behavior
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-text">Store Information</h2>
          <input className="input" value={settings.storeName} />
          <input className="input" value={settings.storeEmail} />
          <input className="input" value={settings.storePhone} />
          <textarea className="input resize-none" rows={3} value={settings.storeAddress} />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 grid grid-cols-2 gap-4">
          <input className="input" type="number" value={settings.taxRate} />
          <input className="input" type="number" value={settings.shippingFee} />
          <input className="input" type="number" value={settings.freeShippingThreshold} />
          <select className="input" value={settings.currency}>
            <option value="NPR">NPR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-text">Notifications</h2>
          {Object.entries(settings.notifications).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3">
              <input type="checkbox" checked={value} />
              <span className="text-sm text-text">{key}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );


};

export default AdminSettingsPage;