import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const Checkout = () => {
    const navigate = useNavigate();

    const mockCartItems = [
        { id: 1, name: 'High-Performance Wireless Mouse', price: 2500, quantity: 1, image: 'https://via.placeholder.com/150/f9f9f9/000000?text=Mouse' },
        { id: 2, name: 'Mechanical RGB Keyboard', price: 6000, quantity: 1, image: 'https://via.placeholder.com/150/f1f1f1/000000?text=Keyboard' },
        { id: 3, name: '4K Ultra HD 27-inch Monitor', price: 25000, quantity: 1, image: 'https://via.placeholder.com/150/eeeeee/000000?text=Monitor' },
    ];
    
    const cartItems = mockCartItems;

    const [shippingInfo, setShippingInfo] = useState({
        fullName: 'Taha Siraj',
        address: '123 Main St',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75500',
        phone: '+92 300 1234567',
    });

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        } else if (name === 'expiry') {
            formattedValue = value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/[^\d]/g, '').slice(0, 4);
        }

        setCardInfo({ ...cardInfo, [name]: formattedValue });
    };
    
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const orderDetails = {
            shippingInfo,
            paymentMethod,
            orderItems: cartItems,
            ...(paymentMethod === 'card' && { cardInfo }),
        };
        console.log("Order Placed:", orderDetails);
        alert("Order placed successfully! (Check console for details)");
        navigate('/order-confirmation');
    };

    const calculations = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingFee = subtotal > 5000 ? 0 : 250;
        const tax = subtotal * 0.05;
        const total = subtotal + shippingFee + tax;
        return { subtotal, shippingFee, tax, total };
    }, [cartItems]);

    return (
        <div className="bg-gray-100 min-h-screen pt-28 pb-12 font-sans">
            <div className="container mx-auto px-4 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Checkout</h1>
                <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-3 lg:gap-8">
                    
                    <div className="lg:col-span-2 space-y-6">
                        
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">1. Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Province</label>
                                    <input type="text" name="province" value={shippingInfo.province} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">2. Payment Method</h2>
                            <div className="space-y-4">
                                <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-gray-300'}`} onClick={() => setPaymentMethod('card')}>
                                    <div className="flex items-center">
                                        <input id="payment_card" name="paymentMethod" type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => {}} className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                                        <label htmlFor="payment_card" className="ml-3 block text-sm font-medium text-gray-900">Credit or Debit Card</label>
                                    </div>
                                    {paymentMethod === 'card' && (
                                        <div className="mt-4 pl-7 space-y-4">
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                                <FaCreditCard className="absolute top-9 left-3 text-gray-400" />
                                                <input type="text" name="number" placeholder="0000 0000 0000 0000" value={cardInfo.number} onChange={handleCardInfoChange} className="mt-1 block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                                                <input type="text" name="name" value={cardInfo.name} onChange={handleCardInfoChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                                    <input type="text" name="expiry" placeholder="MM/YY" value={cardInfo.expiry} onChange={handleCardInfoChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                                </div>
                                                <div>
                                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                                        CVV
                                                        <FaQuestionCircle className="ml-1 text-gray-400" title="The 3 or 4-digit security code on the back of your card." />
                                                    </label>
                                                    <input type="password" name="cvv" value={cardInfo.cvv} onChange={handleCardInfoChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" required />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-gray-300'}`} onClick={() => setPaymentMethod('cod')}>
                                    <div className="flex items-center">
                                        <input id="payment_cod" name="paymentMethod" type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => {}} className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                                        <label htmlFor="payment_cod" className="ml-3 block text-sm font-medium text-gray-900">Cash on Delivery</label>
                                    </div>
                                    {paymentMethod === 'cod' && (
                                        <p className="pl-7 mt-2 text-sm text-gray-600">You can pay in cash to our courier when you receive the goods at your doorstep.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">3. Review Items</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-800">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 mt-6 lg:mt-0">
                        <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-28">
                             <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-colors">
                                Place Your Order
                            </button>
                            <p className="text-xs text-gray-500 mt-3 text-center">By placing your order, you agree to our privacy notice and conditions of use.</p>
                            <hr className="my-6" />
                            
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rs. {calculations.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{calculations.shippingFee === 0 ? 'Free' : `Rs. ${calculations.shippingFee.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>Rs. {calculations.tax.toLocaleString()}</span>
                                </div>
                                <hr className="my-2"/>
                                <div className="flex justify-between font-bold text-lg text-red-700">
                                    <span>Order Total</span>
                                    <span>Rs. {calculations.total.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
                                <FaLock className="text-gray-400"/>
                                <span>Secure transaction</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Checkout;