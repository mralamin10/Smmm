/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Facebook, 
  Smartphone, 
  CreditCard, 
  AlertCircle,
  X,
  ArrowRight,
  Star,
  Copy,
  Check,
  ChevronDown,
  HelpCircle,
  ShoppingBag,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BKASH_NUMBER = "01330455893";
const CONTACT_LINK = "https://hihello.com/p/dbe7aac8-45bb-412a-809c-bb36c7f48aa1";
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ"; 

export default function App() {
  const [formData, setFormData] = useState({
    fbLink: '',
    followerType: 'global',
    quantity: '' as any,
    whatsapp: '',
    trxId: ''
  });

  const [totalPrice, setTotalPrice] = useState(60);
  const [validationMsg, setValidationMsg] = useState('✅ ঠিক আছে');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const prices = {
    global: 60,
    bangladesh: 120
  };

  useEffect(() => {
    const pricePer1000 = formData.followerType === 'global' ? prices.global : prices.bangladesh;
    const calculatedPrice = (formData.quantity / 1000) * pricePer1000;
    setTotalPrice(calculatedPrice);

    if (formData.quantity < 1000) {
      setValidationMsg('⚠️ নূন্যতম ১০০০ ফলোয়ার');
    } else if (formData.quantity > 5000) {
      setValidationMsg('⚠️ সর্বোচ্চ ৫০০০ ফলোয়ার');
    } else {
      setValidationMsg('✅ ঠিক আছে');
    }
  }, [formData.quantity, formData.followerType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (value === '' ? '' : parseInt(value) || 0) : value
    }));
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.quantity >= 1000 && 
      formData.quantity <= 5000 && 
      formData.fbLink.trim() !== '' && 
      formData.trxId.trim() !== '' && 
      formData.whatsapp.trim() !== ''
    ) {
      setShowModal(true);
    } else {
      alert('অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন। (নূন্যতম ১০০০ ফলোয়ার এবং সব ঘর পূরণ করা বাধ্যতামূলক)');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(BKASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmSubmit = async () => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      alert('টেলিগ্রাম কনফিগারেশন পাওয়া যায়নি। অনুগ্রহ করে .env ফাইল চেক করুন।');
      return;
    }

    setIsSubmitting(true);

    const message = `
📦 নতুন অর্ডার এসেছে!
🔗 ফেসবুক লিংক: ${formData.fbLink}
👥 প্যাকেজ: ${formData.followerType === 'global' ? 'গ্লোবাল' : 'বাংলাদেশী'}
📊 পরিমাণ: ${formData.quantity}
📱 হোয়াটসঅ্যাপ: ${formData.whatsapp}
💳 বিকাশ নম্বর: ${BKASH_NUMBER}
🔑 TrxID: ${formData.trxId}
💰 মোট বিল: ${totalPrice} ৳
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setShowModal(false);
        // Reset form
        setFormData({
          fbLink: '',
          followerType: 'global',
          quantity: '' as any,
          whatsapp: '',
          trxId: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Telegram Error:', error);
      alert('অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "ফলোয়ার কি কমে যাবে?",
      a: "আপনি যদি বাংলাদেশি ফলোয়ার নেন, তবে কমার কোনো ভয় নেই। বাংলাদেশি ফলোয়ারগুলো ১০০% স্থায়ী হয়। আর গ্লোবাল ফলোয়ার নিলে ৫% কমার সম্ভাবনা থাকে।"
    },
    {
      q: "বাংলাদেশি ফলোয়ারের দাম বেশি কেন?",
      a: "বাংলাদেশি ফলোয়ার নিলে আপনার আইডিতে যারা ফলো দিবে তাদের প্রোফাইলে বাংলাদেশি নাম ও ছবি থাকবে, যা আপনার আইডিকে অনেক বেশি প্রফেশনাল ও রিয়েল দেখাবে। অন্যদিকে গ্লোবাল ফলোয়ারে অনেক সময় একই নামের বা একই প্রোফাইল ছবির আইডি থাকে, তাই এর দাম কম।"
    },
    {
      q: "অর্ডার ডেলিভারি হতে কতক্ষণ লাগে?",
      a: "অর্ডার করার ৩০-৬০ মিনিটের মধ্যে কাজ শুরু হয় এবং সাধারণত ১-৬ ঘণ্টার মধ্যে সম্পন্ন হয়।"
    },
    {
      q: "আইডির কোনো রিস্ক আছে কি?",
      a: "না, আমরা ১০০% নিরাপদ পদ্ধতিতে কাজ করি। আপনার পাসওয়ার্ডের প্রয়োজন নেই, তাই আইডি সম্পূর্ণ নিরাপদ।"
    }
  ];

  return (
    <div className="min-h-screen selection:bg-primary/20 overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Star size={16} className="fill-primary" /> #১ বিশ্বস্ত SMM সার্ভিস ইন বাংলাদেশ
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-6 text-dark text-shadow-premium leading-[1.1]">
              <Facebook className="inline-block mr-3 text-primary align-middle mb-2" size={48} />
              Facebook <span className="text-primary">follower বাড়ান</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              আপনার ফেসবুক প্রোফাইল বা পেইজকে দিন নতুন উচ্চতা। দ্রুত, নিরাপদ এবং সাশ্রয়ী মূল্যে ফলোয়ার নিন।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#order-form" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-lg">
                এখনই অর্ডার করুন <ArrowRight size={20} />
              </a>
              <a 
                href={CONTACT_LINK} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 text-lg"
              >
                সরাসরি এজেন্টের সাথে যোগাযোগ
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <CheckCircle2 className="text-green-500" />, label: "১০০% রিয়েল" },
                { icon: <ShieldCheck className="text-blue-500" />, label: "নিরাপদ সিস্টেম" },
                { icon: <Zap className="text-yellow-500" />, label: "দ্রুত ডেলিভারি" },
                { icon: <MessageCircle className="text-primary" />, label: "২৪/৭ সাপোর্ট" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section - Moved Up */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-primary font-bold mb-4">
            <MessageCircle size={24} /> ভিডিও দেখে বুঝুন
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 text-shadow-premium">কিভাবে অর্ডার করবেন?</h2>
          <p className="text-base text-slate-500 mb-8">অর্ডার প্রসেসটি বুঝতে নিচের ভিডিওটি সম্পূর্ণ দেখুন</p>
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-2 bg-primary/10 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative glass-card rounded-[1.5rem] overflow-hidden aspect-video shadow-2xl border-4 border-white">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Tutorial Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass-card p-6 md:p-10 rounded-[2rem] border-slate-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">অর্ডার ফর্ম</h2>
                <p className="text-slate-500 text-xs">সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
              </div>
            </div>

            <form onSubmit={handleReview} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 ml-2">
                  <Facebook size={16} className="text-primary" /> ফেসবুক প্রোফাইল/পেইজ লিংক
                </label>
                <div className="relative">
                  <input 
                    type="url" name="fbLink" required
                    placeholder="https://facebook.com/yourprofile"
                    className="input-field py-3.5 text-base"
                    value={formData.fbLink} onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 ml-2">
                    <Users size={16} className="text-primary" /> ফলোয়ার প্যাকেজ সিলেক্ট করুন
                  </label>
                  <div className="relative">
                    <select 
                      name="followerType"
                      className="input-field py-3.5 appearance-none cursor-pointer text-base"
                      value={formData.followerType} onChange={handleInputChange}
                    >
                      <option value="global">গ্লোবাল ফলোয়ার (60৳ / 1000)</option>
                      <option value="bangladesh">বাংলাদেশী ফলোয়ার (120৳ / 1000)</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 ml-2">
                    <Users size={16} className="text-primary" /> পরিমাণ (১০০০-৫০০০)
                  </label>
                  <input 
                    type="number" name="quantity" min="1000" max="5000" step="1000" required
                    placeholder="1000/5000"
                    className="input-field py-3.5 text-base"
                    value={formData.quantity} onChange={handleInputChange}
                  />
                  <p className={`text-xs mt-1.5 font-bold ml-2 ${validationMsg.includes('⚠️') ? 'text-red-500' : 'text-green-600'}`}>
                    {validationMsg}
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 ml-2">
                  <Smartphone size={16} className="text-primary" /> হোয়াটসঅ্যাপ নাম্বার
                </label>
                <input 
                  type="tel" name="whatsapp" required placeholder="017XXXXXXXX"
                  className="input-field py-3.5 text-base"
                  value={formData.whatsapp} onChange={handleInputChange}
                />
              </div>

              {/* Payment Section */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] border-2 border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <CreditCard size={18} />
                  </div>
                  <h3 className="font-bold text-dark text-lg font-display">বিকাশ পেমেন্ট</h3>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  নিচের পার্সোনাল বিকাশ নাম্বারে <span className="text-primary font-bold">সেন্ড মানি</span> করে ট্রানজেকশন আইডি দিন।
                </p>

                <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">বিকাশ পার্সোনাল নাম্বার</p>
                    <p className="text-2xl md:text-3xl font-display font-black text-dark tracking-tight">{BKASH_NUMBER}</p>
                  </div>
                  <button 
                    type="button" onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all w-full sm:w-auto justify-center text-sm ${copied ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-primary hover:text-white'}`}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'কপি হয়েছে' : 'কপি করুন'}
                  </button>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 ml-2">
                    <Zap size={16} className="text-primary" /> বিকাশ ট্রানজেকশন আইডি (TrxID)
                  </label>
                  <input 
                    type="text" name="trxId" required placeholder="8N7X2K..."
                    className="input-field bg-white border-slate-200 py-3.5 text-base"
                    value={formData.trxId} onChange={handleInputChange}
                  />
                </div>
              </div>

              <motion.div 
                key={totalPrice}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark text-white p-6 rounded-[1.5rem] text-center shadow-xl"
              >
                <p className="text-slate-400 text-sm font-medium mb-0.5">মোট বিল</p>
                <h3 className="text-3xl md:text-4xl font-display font-black text-primary">{totalPrice} ৳</h3>
              </motion.div>

              <button type="submit" className="btn-primary w-full text-xl py-5 shadow-xl shadow-primary/30">
                অর্ডার রিভিউ করুন
              </button>

              <div className="text-center pt-2">
                <p className="text-slate-500 text-sm mb-2">বেশি পরিমাণে নিতে চাইলে যোগাযোগ করুন</p>
                <a 
                  href={CONTACT_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm"
                >
                  সরাসরি এজেন্টের সাথে যোগাযোগ <ArrowRight size={16} />
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Order Guide Section - Moved After Form */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-2 text-shadow-premium">অর্ডার করার নিয়ম</h2>
            <p className="text-slate-500 text-base">নিচের ধাপগুলো অনুসরণ করে অর্ডার সম্পন্ন করুন</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "০১", title: "লিংক দিন", desc: "আপনার ফেসবুক প্রোফাইল বা পেইজ লিংক দিন" },
              { step: "০২", title: "পরিমাণ দেখুন", desc: "কি পরিমাণ ফলোয়ার নিবেন তা দেখুন" },
              { step: "০৩", title: "বিকাশ করুন", desc: "টাকার পরিমাণ দেখে বিকাশ নাম্বারে সেন্ট মানি করুন" },
              { step: "০৪", title: "TrxID ও রিভিউ", desc: "ট্রানজেকশন আইডি দিন ও রিভিউ করুন। ৪-৫ ঘণ্টার মধ্যে অর্ডার কমপ্লিট হবে ইনশাল্লাহ।" }
            ].map((item, i) => (
              <div key={i} className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-primary hover:text-white transition-all duration-500">
                <span className="text-3xl font-display font-black opacity-10 mb-2 block group-hover:opacity-30">{item.step}</span>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-xs opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
              <HelpCircle size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-2 text-shadow-premium">সাধারণ কিছু প্রশ্ন</h2>
            <p className="text-slate-500 text-sm">আপনার মনে থাকা প্রশ্নের উত্তর এখানে পাবেন</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left font-bold text-base md:text-lg hover:bg-slate-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-slate-600 text-sm md:text-base leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="glass-card p-12 rounded-[3rem] max-w-sm w-full text-center shadow-3xl border-none"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={56} />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">ধন্যবাদ!</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">✅ আপনার অর্ডার গ্রহণ করা হয়েছে! আমরা শীঘ্রই কাজ শুরু করবো।</p>
              <button onClick={() => setIsSubmitted(false)} className="btn-primary w-full">ঠিক আছে</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 md:p-12 rounded-[3rem] max-w-md w-full shadow-3xl border-none"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold">অর্ডার রিভিউ</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-dark p-2">
                  <X size={28} />
                </button>
              </div>
              
              <div className="space-y-5 mb-10">
                {[
                  { label: "লিংক", value: formData.fbLink, truncate: true },
                  { label: "টাইপ", value: formData.followerType },
                  { label: "পরিমাণ", value: formData.quantity },
                  { label: "হোয়াটসঅ্যাপ", value: formData.whatsapp },
                  { label: "TrxID", value: formData.trxId }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">{item.label}:</span>
                    <span className={`font-bold text-dark ${item.truncate ? 'truncate max-w-[180px]' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between py-6 text-2xl md:text-3xl">
                  <span className="font-display font-bold">মোট বিল:</span>
                  <span className="font-display font-black text-primary">{totalPrice} ৳</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowModal(false)} 
                  disabled={isSubmitting}
                  className="btn-outline text-sm md:text-base py-4 disabled:opacity-50"
                >
                  সংশোধন
                </button>
                <button 
                  onClick={confirmSubmit} 
                  disabled={isSubmitting}
                  className="btn-primary text-sm md:text-base py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Zap size={18} />
                      </motion.div>
                      অর্ডার সাবমিট হচ্ছে...
                    </>
                  ) : (
                    <>✅ কনফার্ম</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Button */}
      <motion.a
        href={CONTACT_LINK}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 animate-float"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={32} />
      </motion.a>

      {/* Footer */}
      <footer className="py-16 px-4 text-center bg-dark text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-6 text-primary flex items-center justify-center gap-2">
            <Facebook size={24} /> Facebook follower বাড়ান
          </h2>
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-primary text-primary" />
            ))}
          </div>
          <p className="text-lg font-bold text-slate-400 mb-10">
            দ্রুত ডেলিভারি | ২৪/৭ সাপোর্ট | ১০০% গ্রাহক সন্তুষ্টি
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 border-t border-slate-800 pt-10">
            <span>প্রাইভেসি পলিসি</span>
            <span>টার্মস এন্ড কন্ডিশনস</span>
            <span>রিফান্ড পলিসি</span>
          </div>
          <p className="mt-10 text-[10px] text-slate-600">
            © {new Date().getFullYear()} Follower Storm. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
