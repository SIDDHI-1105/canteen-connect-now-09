import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Clock, Star, Plus, Minus, Upload, QrCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import MobileLayout from './MobileLayout';
import MobileCard from './MobileCard';
import MobileButton from './MobileButton';

interface StudentDashboardProps {
  user: { name: string; role: 'student' | 'admin' };
  onLogout: () => void;
}

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready';
  date: string;
  paymentStatus: string;
}

const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
  const dashboardTitle = user.role === 'student' ? 'Student Dashboard' : 'Staff Dashboard';
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      items: ['Veg Thali', 'Lassi'],
      total: 85,
      status: 'ready',
      date: '2024-01-15',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      items: ['Chicken Biryani', 'Raita'],
      total: 120,
      status: 'preparing',
      date: '2024-01-15',
      paymentStatus: 'paid'
    }
  ]);

  const menuItems = [
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
  ];

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(i => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePaymentScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  const handleSubmitOrder = async () => {
    if (!paymentScreenshot) {
      toast({
        title: "Payment Screenshot Required",
        description: "Please upload a screenshot of your UPI payment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingOrder(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: (orders.length + 1).toString(),
        items: Object.entries(cart).map(([itemId, quantity]) => {
          const item = menuItems.find(i => i.id === itemId);
          return `${item?.name} (${quantity})`;
        }),
        total: getCartTotal(),
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'paid'
      };

      setOrders(prev => [newOrder, ...prev]);
      setCart({});
      setPaymentScreenshot(null);
      setShowPaymentDialog(false);
      setIsSubmittingOrder(false);

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been submitted and payment is being verified.",
      });
    }, 2000);
  };

  return (
    <MobileLayout
      title={user.name}
      subtitle={dashboardTitle}
      userType="student"
      onLogout={onLogout}
    >
      <div className="px-4">
        <Tabs defaultValue="menu" className="space-y-4">
          <div className="sticky top-[73px] z-40 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-2">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-white/80 backdrop-blur-sm border border-orange-200">
              <TabsTrigger value="menu" className="text-base font-medium">Menu</TabsTrigger>
              <TabsTrigger value="orders" className="text-base font-medium">Orders</TabsTrigger>
              <TabsTrigger value="cart" className="text-base font-medium">
                Cart ({Object.keys(cart).length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="menu" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 gap-4">
              {menuItems.map((item) => (
                <MobileCard key={item.id} hoverable={item.available} className={!item.available ? 'opacity-60' : ''}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                        <Badge variant={item.available ? "default" : "secondary"} className="ml-2 flex-shrink-0">
                          {item.available ? 'Available' : 'Sold Out'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">₹{item.price}</span>
                        {item.available && (
                          <div className="flex items-center space-x-2">
                            {cart[item.id] ? (
                              <div className="flex items-center space-x-3">
                                <MobileButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-10 h-10 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </MobileButton>
                                <span className="font-semibold text-lg w-8 text-center">{cart[item.id]}</span>
                                <MobileButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addToCart(item.id)}
                                  className="w-10 h-10 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </MobileButton>
                              </div>
                            ) : (
                              <MobileButton
                                variant="secondary"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                                icon={Plus}
                              >
                                Add
                              </MobileButton>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </MobileCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-6">
            {orders.map((order) => (
              <MobileCard key={order.id}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    <p className="text-base mb-1">{order.date} • Total: ₹{order.total}</p>
                    <p className="text-sm"><strong>Items:</strong> {order.items.join(', ')}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">Payment: {order.paymentStatus}</span>
                  </div>
                </div>
              </MobileCard>
            ))}
          </TabsContent>

          <TabsContent value="cart" className="space-y-4 mt-6">
            {Object.keys(cart).length === 0 ? (
              <MobileCard className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500">Add some delicious items from the menu!</p>
              </MobileCard>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const item = menuItems.find(i => i.id === itemId);
                  if (!item) return null;
                  
                  return (
                    <MobileCard key={itemId}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-600">₹{item.price} each</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <MobileButton
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(itemId)}
                              className="w-10 h-10 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </MobileButton>
                            <span className="font-semibold w-8 text-center text-lg">{quantity}</span>
                            <MobileButton
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(itemId)}
                              className="w-10 h-10 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </MobileButton>
                          </div>
                          <span className="font-bold text-green-600 w-20 text-right text-lg">
                            ₹{item.price * quantity}
                          </span>
                        </div>
                      </div>
                    </MobileCard>
                  );
                })}
                
                <MobileCard className="warm-gradient-peach border-2 border-orange-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                      <span className="text-3xl font-bold text-green-700">₹{getCartTotal()}</span>
                    </div>
                    <div className="space-y-4">
                      <MobileButton 
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => setShowPaymentDialog(true)}
                      >
                        Proceed to Payment
                      </MobileButton>
                      <p className="text-sm text-gray-700 text-center">
                        Upload UPI payment screenshot after payment
                      </p>
                    </div>
                  </div>
                </MobileCard>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-lg">
              <QrCode className="h-5 w-5" />
              <span>Complete Payment</span>
            </DialogTitle>
            <DialogDescription className="text-base">
              Scan the QR code below to pay ₹{getCartTotal()} and upload your payment screenshot
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-inner">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">UPI QR Code</p>
                    <p className="text-xs text-gray-400">Scan to pay ₹{getCartTotal()}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-lg">Pay to: Campus Canteen</p>
                <p className="text-gray-600">UPI ID: canteen@college.edu</p>
                <p className="text-2xl font-bold text-green-600">Amount: ₹{getCartTotal()}</p>
                <p className="text-xs text-gray-500 mt-2">*QR code updated by admin as needed</p>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="payment-screenshot" className="text-base font-medium">
                Upload Payment Screenshot *
              </Label>
              <Input
                id="payment-screenshot"
                type="file"
                accept="image/*"
                onChange={handlePaymentScreenshotChange}
                className="cursor-pointer mobile-tap-target text-base"
              />
              {paymentScreenshot && (
                <p className="text-sm text-green-600 flex items-center space-x-1">
                  <Upload className="h-4 w-4" />
                  <span>Screenshot uploaded: {paymentScreenshot.name}</span>
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <MobileButton
                variant="outline"
                size="md"
                onClick={() => setShowPaymentDialog(false)}
                disabled={isSubmittingOrder}
                className="flex-1"
              >
                Cancel
              </MobileButton>
              <MobileButton
                variant="primary"
                size="md"
                onClick={handleSubmitOrder}
                disabled={!paymentScreenshot || isSubmittingOrder}
                className="flex-1"
              >
                {isSubmittingOrder ? 'Submitting...' : 'Submit Order'}
              </MobileButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default StudentDashboard;
