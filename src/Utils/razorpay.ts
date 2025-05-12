// Initial setup for Razorpay integration
// This will be expanded when we integrate with our Vercel backend

export interface PaymentOptions {
  amount: number; // in paise (100 paise = ₹1)
  currency: string;
  receipt: string;
  orderId: string;
  name: string;
  description: string;
  image: string;
  prefillEmail?: string;
  prefillContact?: string;
  prefillName?: string;
  notes?: Record<string, string>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (options: PaymentOptions): Promise<void> => {
  await loadRazorpayScript();

  // This will be replaced with an actual API call to your Vercel backend
  // which will create an order and return the orderId
  // For now, we're using the one provided in options
  
  const razorpayOptions = {
    key: "YOUR_RAZORPAY_KEY_ID", // This should come from your backend
    amount: options.amount.toString(),
    currency: options.currency,
    name: options.name,
    description: options.description,
    image: options.image,
    order_id: options.orderId,
    handler: function (response: any) {
      // This will handle the successful payment
      console.log("Payment successful:", response);
      // Here you would call your backend to verify the payment
    },
    prefill: {
      name: options.prefillName || "",
      email: options.prefillEmail || "",
      contact: options.prefillContact || ""
    },
    notes: options.notes || {},
    theme: {
      color: "#9333ea" // Purple color matching your site theme
    }
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
};