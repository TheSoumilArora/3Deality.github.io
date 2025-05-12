import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Search, Truck, CheckCircle, Clock } from "lucide-react";

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock tracking data
      setTrackingResult({
        orderNumber: orderNumber || "OD" + Math.floor(Math.random() * 10000000),
        status: "In Transit",
        estimatedDelivery: "May 15, 2025",
        items: [
          { name: "Carbon Fiber Propeller", quantity: 2 },
          { name: "3D Print Finishing Kit", quantity: 1 }
        ],
        trackingEvents: [
          { date: "May 10, 2025", time: "09:30 AM", status: "Order Placed", location: "Online" },
          { date: "May 10, 2025", time: "02:15 PM", status: "Order Confirmed", location: "Processing Center" },
          { date: "May 11, 2025", time: "10:45 AM", status: "Printing Started", location: "Production Facility" },
          { date: "May 12, 2025", time: "03:20 PM", status: "Printing Complete", location: "Production Facility" },
          { date: "May 12, 2025", time: "05:40 PM", status: "Packaging", location: "Shipping Department" },
          { date: "May 13, 2025", time: "09:15 AM", status: "Shipped", location: "Distribution Center" }
        ]
      });
      setIsTracking(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-screen px-4 py-16 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Track Your Order</h1>
          <p className="mb-8 text-center text-gray-600">
            Enter your order number and email address to check the status of your order
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block mb-2 text-sm font-medium text-gray-700">
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="e.g., OD1234567"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="The email used for your order"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isTracking}
                >
                  {isTracking ? (
                    <>
                      <span className="mr-2">Searching</span>
                      <Clock className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {trackingResult && (
            <div className="mt-10 space-y-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{trackingResult.orderNumber}</h2>
                    <p className="text-gray-600">Estimated Delivery: {trackingResult.estimatedDelivery}</p>
                  </div>
                  <div className="px-4 py-2 text-green-700 bg-green-100 rounded-full">
                    {trackingResult.status}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-2 font-medium">Order Items</h3>
                  <ul className="pl-5 list-disc text-gray-600">
                    {trackingResult.items.map((item: any, index: number) => (
                      <li key={index}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-6 text-lg font-semibold">Tracking History</h3>
                
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-2.5 h-full w-0.5 bg-gray-200"></div>
                  
                  {/* Events */}
                  <div className="space-y-6">
                    {trackingResult.trackingEvents.map((event: any, index: number) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-purple-600 flex-shrink-0 z-10">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-medium">{event.status}</h4>
                            <span className="text-sm text-gray-500">
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;