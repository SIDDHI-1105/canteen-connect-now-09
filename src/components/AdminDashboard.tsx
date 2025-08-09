import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Plus, Edit, Trash2, Clock, CheckCircle, LogOut, Eye, QrCode, Settings, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  user: { name: string; role: 'student' | 'admin' };
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [showScreenshotDialog, setShowScreenshotDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [qrSettings, setQrSettings] = useState({
    upiId: 'canteen@college.edu',
    merchantName: 'Campus Canteen',
    qrCode: 'QR_CODE_PLACEHOLDER'
  });
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Veg Thali', price: 60, category: 'Main Course', available: true, image: '🍛' },
    { id: '2', name: 'Chicken Biryani', price: 100, category: 'Main Course', available: true, image: '🍗' },
    { id: '3', name: 'Paneer Butter Masala', price: 80, category: 'Main Course', available: true, image: '🧈' },
    { id: '4', name: 'Dal Makhani', price: 50, category: 'Main Course', available: false, image: '🍲' },
    { id: '5', name: 'Masala Dosa', price: 45, category: 'South Indian', available: true, image: '🥞' },
    { id: '6', name: 'Idli Sambar', price: 35, category: 'South Indian', available: true, image: '🍘' },
    { id: '7', name: 'Uttapam', price: 40, category: 'South Indian', available: true, image: '🥘' },
    { id: '8', name: 'Vada Pav', price: 20, category: 'Snacks', available: true, image: '🥙' },
    { id: '9', name: 'Samosa', price: 15, category: 'Snacks', available: true, image: '🥟' },
    { id: '10', name: 'Pav Bhaji', price: 55, category: 'Street Food', available: true, image: '🍞' },
    { id: '11', name: 'Chole Bhature', price: 65, category: 'North Indian', available: true, image: '🫓' },
    { id: '12', name: 'Tea', price: 10, category: 'Beverages', available: true, image: '🍵' },
    { id: '13', name: 'Coffee', price: 15, category: 'Beverages', available: true, image: '☕' },
    { id: '14', name: 'Lassi', price: 25, category: 'Beverages', available: true, image: '🥤' },
    { id: '15', name: 'Fresh Juice', price: 30, category: 'Beverages', available: true, image: '🧃' }
  ]);

  const [orders, setOrders] = useState([
    {
      id: '1',
      studentName: 'Rahul Sharma',
      items: [{ name: 'Veg Thali', quantity: 1, price: 60 }, { name: 'Lassi', quantity: 1, price: 25 }],
      total: 85,
      status: 'pending' as const,
      orderTime: '12:30 PM',
      paymentScreenshot: 'uploaded',
      paymentVerified: false
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      items: [{ name: 'Chicken Biryani', quantity: 2, price: 100 }],
      total: 200,
      status: 'preparing' as const,
      orderTime: '12:45 PM',
      paymentScreenshot: 'uploaded',
      paymentVerified: true
    },
    {
      id: '3',
      studentName: 'Amit Kumar',
      items: [{ name: 'Paneer Butter Masala', quantity: 1, price: 80 }, { name: 'Tea', quantity: 2, price: 10 }],
      total: 100,
      status: 'ready' as const,
      orderTime: '1:00 PM',
      paymentScreenshot: 'uploaded',
      paymentVerified: true
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Main Course',
    image: '🍽️'
  });

  const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready') => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      const item = {
        id: Date.now().toString(),
        name: newItem.name,
        price: parseInt(newItem.price),
        category: newItem.category,
        available: true,
        image: newItem.image
      };
      setMenuItems(prev => [...prev, item]);
      setNewItem({ name: '', price: '', category: 'Main Course', image: '🍽️' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPendingOrdersCount = () => orders.filter(o => o.status === 'pending').length;
  const getPreparingOrdersCount = () => orders.filter(o => o.status === 'preparing').length;

  const handleViewScreenshot = (orderId: string) => {
    setSelectedOrder(orderId);
    setShowScreenshotDialog(true);
  };

  const handleEditItem = (itemId: string) => {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
      setEditingItem({ ...item });
      setShowEditDialog(true);
    }
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setShowEditDialog(false);
      setEditingItem(null);
      toast({
        title: "Item Updated",
        description: "Menu item has been updated successfully.",
      });
    }
  };

  const handleUpdateQRSettings = () => {
    // In a real app, this would save to backend/Supabase
    setShowQRDialog(false);
    toast({
      title: "QR Code Updated",
      description: "Payment QR code settings have been updated successfully.",
    });
  };

  const handleVerifyPayment = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, paymentVerified: true } : order
    ));
    toast({
      title: "Payment Verified",
      description: "Payment has been marked as verified successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-red-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="warm-gradient-coral p-2 rounded-full">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{user.name}</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex space-x-1 sm:space-x-2">
                <Badge className="bg-amber-100 text-amber-800 text-xs">
                  {getPendingOrdersCount()} Pending
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 text-xs">
                  {getPreparingOrdersCount()} Preparing
                </Badge>
              </div>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="mobile-tap-target flex items-center space-x-2 text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-12 mb-6">
            <TabsTrigger value="orders" className="text-sm font-medium">Live Orders</TabsTrigger>
            <TabsTrigger value="menu" className="text-sm font-medium">Manage Menu</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow mobile-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription className="text-base">
                          {order.studentName} • {order.orderTime}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        {order.paymentVerified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Verified
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="mobile-tap-target text-xs"
                          onClick={() => handleViewScreenshot(order.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Screenshot
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <strong>Items:</strong>
                        <ul className="mt-2 space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 flex justify-between">
                              <span>{item.name} × {item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t flex-wrap gap-3">
                        <span className="font-bold text-lg">Total: ₹{order.total}</span>
                        <div className="flex space-x-2 flex-wrap gap-2">
                          {!order.paymentVerified && (
                            <Button
                              size="sm"
                              onClick={() => handleVerifyPayment(order.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white mobile-tap-target"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Verify Payment
                            </Button>
                          )}
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="warm-gradient-orange text-white border-0 hover:opacity-90 mobile-tap-target"
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Start Preparing
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="bg-green-500 hover:bg-green-600 text-white mobile-tap-target"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Ready
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            {/* Add New Item Form */}
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Plus className="h-5 w-5" />
                  <span>Add New Menu Item</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter item name"
                      className="mobile-tap-target text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                      className="mobile-tap-target text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base">Category</Label>
                    <select
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md mobile-tap-target text-base"
                    >
                      <option value="Main Course">Main Course</option>
                      <option value="South Indian">South Indian</option>
                      <option value="North Indian">North Indian</option>
                      <option value="Street Food">Street Food</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={addMenuItem} 
                      className="w-full bg-green-500 hover:bg-green-600 text-white mobile-tap-target"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className={`mobile-card ${!item.available ? 'opacity-60 bg-gray-50' : ''}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-center">{item.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="text-xl font-bold text-green-600">₹{item.price}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between space-x-2">
                      <Button
                        size="sm"
                        variant={item.available ? "default" : "secondary"}
                        onClick={() => toggleItemAvailability(item.id)}
                        className="flex-1 mobile-tap-target text-sm"
                      >
                        {item.available ? 'Available' : 'Sold Out'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mobile-tap-target"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 mobile-tap-target">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Settings className="h-5 w-5" />
                  <span>Payment Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage QR code and payment configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">Current QR Code Settings</h3>
                      <Button
                        size="sm"
                        onClick={() => setShowQRDialog(true)}
                        className="warm-gradient-coral text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Update QR
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>UPI ID:</strong> {qrSettings.upiId}</p>
                      <p><strong>Merchant Name:</strong> {qrSettings.merchantName}</p>
                      <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Payment Instructions</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Students scan QR code to make payments</li>
                      <li>• Upload payment screenshot for verification</li>
                      <li>• Update QR code if payment issues occur</li>
                      <li>• View payment screenshots in order details</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Screenshot Dialog */}
      <Dialog open={showScreenshotDialog} onOpenChange={setShowScreenshotDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Screenshot</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder} - Payment verification screenshot
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <div className="w-64 h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-2" />
                <p>Payment Screenshot</p>
                <p className="text-sm">Screenshot would display here</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details of this menu item
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Main Course">Main Course</option>
                  <option value="South Indian">South Indian</option>
                  <option value="North Indian">North Indian</option>
                  <option value="Street Food">Street Food</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateItem}
                  className="flex-1"
                >
                  Update Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* QR Settings Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>Update QR Code Settings</span>
            </DialogTitle>
            <DialogDescription>
              Update payment QR code and UPI details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                value={qrSettings.upiId}
                onChange={(e) => setQrSettings(prev => ({ ...prev, upiId: e.target.value }))}
                placeholder="Enter UPI ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchant-name">Merchant Name</Label>
              <Input
                id="merchant-name"
                value={qrSettings.merchantName}
                onChange={(e) => setQrSettings(prev => ({ ...prev, merchantName: e.target.value }))}
                placeholder="Enter merchant name"
              />
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> After updating, students will see the new QR code for future payments.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowQRDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateQRSettings}
                className="flex-1 warm-gradient-coral text-white"
              >
                <QrCode className="h-4 w-4 mr-1" />
                Update QR Code
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
