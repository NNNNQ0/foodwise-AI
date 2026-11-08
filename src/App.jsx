import React, { useState } from 'react';
import { 
  Home, BookOpen, Package, Clock, User, Camera, Upload, Sparkles, 
  Plus, MessageSquare, Send, Trash2, X, ArrowLeft, ChevronRight, Check, 
  Bell, Target, HelpCircle, Info, LogOut, Flame, Clock3, ChefHat, Heart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subView, setSubView] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('ทั้งหมด');
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  // ข้อมูลโปรไฟล์ผู้ใช้ (รวมอายุ, เพศ, กิจกรรม)
  const [profile, setProfile] = useState({
    name: 'Natthawat Kruthiran',
    email: 'Natthawat.krut@kmutt.ac.th',
    weight: 57,
    height: 170,
    age: 20,
    gender: 'male',
    activity: 1.2
  });

  const calculateMacros = () => {
    let bmr = (10 * Number(profile.weight)) + (6.25 * Number(profile.height)) - (5 * Number(profile.age));
    bmr += profile.gender === 'male' ? 5 : -161;
    const tdee = Math.round(bmr * Number(profile.activity));
    return {
      calories: tdee,
      carbs: Math.round((tdee * 0.5) / 4),
      protein: Math.round((tdee * 0.2) / 4),
      fat: Math.round((tdee * 0.3) / 9)
    };
  };

  const macros = calculateMacros();

  // วัตถุดิบในตู้เย็น
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'ไข่ไก่', category: 'เนื้อสัตว์', amount: '3 ฟอง', expiry: '25/05/2025', icon: '🥚' },
    { id: 2, name: 'ผักกาดหอม', category: 'ผัก', amount: '1 ต้น', expiry: '22/05/2025', icon: '🥬' },
    { id: 3, name: 'แครอท', category: 'ผัก', amount: '2 หัว', expiry: '20/05/2025', icon: '🥕' },
    { id: 4, name: 'มะเขือเทศ', category: 'ผัก', amount: '4 ลูก', expiry: '18/05/2025', icon: '🍅' },
    { id: 5, name: 'อกไก่', category: 'เนื้อสัตว์', amount: '500 กรัม', expiry: '21/05/2025', icon: '🍗' },
    { id: 6, name: 'ข้าวสวย', category: 'อื่นๆ', amount: '1 ถุง', expiry: '30/06/2025', icon: '🍚' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: '', category: 'ผัก', amount: '', expiry: '' });

  // คลังรูปภาพอาหารจริง
  const realFoodGallery = [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=400&q=80'
  ];

  const ingredientPools = [
    ['อกไก่', 'ผักกาดหอม', 'แครอท', 'น้ำสลัดงา'],
    ['ไข่ไก่', 'หมูสับ', 'ต้นหอม', 'ซีอิ๊วขาว'],
    ['กุ้งสด', 'วุ้นเส้น', 'มะเขือเทศ', 'ขึ้นฉ่าย'],
    ['เต้าหู้ไข่', 'หมูสับ', 'แครอท', 'เห็ดหอม'],
    ['ข้าวสวย', 'ไข่ไก่', 'กระเทียม', 'ต้นหอม'],
    ['อกไก่', 'พริกแกง', 'ถั่วฝักยาว', 'ใบมะกรูด'],
    ['มะเขือเทศ', 'หอมใหญ่', 'เนยจืด', 'ขนมปัง'],
    ['เนื้อปลาทับทิม', 'ข่า', 'ตะไคร้', 'ใบมะกรูด']
  ];

  const menuDatabase = Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;
    const categories = ['อาหารจานเดียว', 'ต้ม/แกง', 'เมนูสุขภาพ', 'เมนูไข่', 'ผัด/ทอด', 'ยำ/ตำ'];
    const cat = categories[index % categories.length];
    const names = [
      `ยำวุ้นเส้นอกไก่ยอ #${id}`,
      `ไข่เจียวสมุนไพร #${id}`,
      `ข้าวต้มหมูสับเห็ดหอม #${id}`,
      `ข้าวผัดไข่ใส่ผักรวม #${id}`,
      `ต้มยำอกไก่เห็ดออรินจิ #${id}`,
      `สลัดโรลอกไก่ผักสด #${id}`,
      `ไข่ตุ๋นทรงเครื่องกุ้งสับ #${id}`,
      `ผัดพริกแกงอกไก่ถั่วฝักยาว #${id}`,
      `ซุปมะเขือเทศไข่น้ำ #${id}`,
      `ข้าวหน้าไก่เทริยากิ #${id}`
    ];
    return {
      id,
      name: names[index % names.length],
      time: `${10 + (id % 15)} นาที`,
      cal: 120 + ((id * 17) % 350),
      category: cat,
      image: realFoodGallery[(id * 3) % realFoodGallery.length],
      desc: `สูตรอาหารเพื่อสุขภาพชุดที่ ${id} ช่วยใช้วัตถุดิบในตู้เย็นให้คุ้มค่า ลดขยะอาหาร ทำง่าย อร่อยได้ประโยชน์ครบถ้วน`,
      ingredientsUsed: ingredientPools[id % ingredientPools.length]
    };
  });

  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const filteredMenus = menuDatabase.filter(m => 
    m.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) || 
    m.category.toLowerCase().includes(menuSearchQuery.toLowerCase())
  );

  const historyList = [
    { id: 1, type: 'เมนูที่สร้าง', title: 'สลัดโรลอกไก่ผักสด #3', date: '14 พ.ค. 2568 | 19:20', details: 'วัตถุดิบ 4 อย่าง (อกไก่, ผักกาดหอม, มะเขือเทศ, แครอท)', menuData: menuDatabase[5] },
    { id: 2, type: 'เมนูที่สร้าง', title: 'ข้าวผัดไข่ใส่ผักรวม #4', date: '12 พ.ค. 2568 | 12:15', details: 'วัตถุดิบ 5 อย่าง (ไข่ไก่, ข้าวสวย, แครอท, มะเขือเทศ, ผักกาดหอม)', menuData: menuDatabase[3] },
    { id: 3, type: 'วัตถุดิบ', title: 'เพิ่มวัตถุดิบ: อกไก่ (500g)', date: '11 พ.ค. 2568 | 10:00', details: 'หมวดหมู่: เนื้อสัตว์ | วันหมดอายุ: 21/05/2025' },
    { id: 4, type: 'เมนูที่สร้าง', title: 'ต้มยำอกไก่เห็ดออรินจิ #5', date: '10 พ.ค. 2568 | 18:40', details: 'วัตถุดิบ 6 อย่าง (อกไก่, มะเขือเทศ, เห็ด, ต้มยำ)', menuData: menuDatabase[4] },
    { id: 5, type: 'วัตถุดิบ', title: 'เพิ่มวัตถุดิบ: ไข่ไก่ (3 ฟอง)', date: '09 พ.ค. 2568 | 08:30', details: 'หมวดหมู่: เนื้อสัตว์ | วันหมดอายุ: 25/05/2025' }
  ];

  const filteredHistory = historyFilter === 'ทั้งหมด' 
    ? historyList 
    : historyList.filter(h => h.type === historyFilter);

  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState('upload');

  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'สวัสดีค่ะ! FoodWise AI พร้อมช่วยตอบคำถาม แนะนำสูตรอาหาร 100 เมนู และวิธีลดขยะอาหารได้อย่างอิสระเลยค่ะ 😊' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleFreeChat = (query) => {
    const q = query.toLowerCase();
    const fridgeItems = ingredients.map(i => `${i.name} (${i.amount})`).join(', ');

    if (q.includes('วัตถุดิบ') || q.includes('ตู้เย็น') || q.includes('กินอะไรดี')) {
      return `จากวัตถุดิบในตู้เย็นของคุณตอนนี้ (${fridgeItems}): ขอแนะนำให้ทำเมนู "สลัดโรลอกไก่ผักสด" หรือ "ข้าวผัดไข่ใส่ผักรวม" เพื่อใช้วัตถุดิบใกล้หมดอายุให้คุ้มค่าที่สุดค่ะ!`;
    }
    if (q.includes('วิธีเก็บ') || q.includes('ถนอมอาหาร')) {
      return `วิธีถนอมวัตถุดิบ:\n- ผักใบเขียว: ล้างให้สะอาด ซับให้แห้ง ห่อด้วยกระดาษทิชชู่อเนกประสงค์แล้วเก็บใส่ถุงซิปล็อกแช่ตู้เย็น\n- เนื้อสัตว์: หั่นเป็นชิ้นพอดีทำ แยกใส่กล่องสุญญากาศแช่ช่องแข็งเพื่อยืดอายุค่ะ`;
    }
    if (q.includes('แคลอรี') || q.includes('kcal') || q.includes('พลังงาน')) {
      return `เป้าหมายพลังงานของคุณ (${profile.age} ปี) คือ ${macros.calories} kcal/วัน ประกอบด้วยคาร์โบไฮเดรต ${macros.carbs} กรัม โปรตีน ${macros.protein} กรัม และไขมัน ${macros.fat} กรัมค่ะ สามารถดูเมนูแคลอรีต่ำในคลัง 100 เมนูได้เลย!`;
    }
    if (q.includes('ลดขยะอาหาร') || q.includes('food waste')) {
      return `เคล็ดลับลด Food Waste ง่ายๆ:\n1. ตรวจสอบวันหมดอายุในเมนูวัตถุดิบประจำ\n2. วางแผนทำอาหารจากของที่มีในตู้เย็นก่อนซื้อเพิ่ม\n3. นำผักใกล้เหี่ยวมาทำซุปหรือข้าวผัดค่ะ`;
    }
    return `เกี่ยวกับ "${query}": FoodWise AI ขอแนะนำให้คุณเลือกใช้วัตถุดิบในตู้เย็นที่มีอยู่มาจับคู่กับเมนูสุขภาพกว่า 100 รายการในแอปเพื่อความอร่อยและประหยัดค่ะ มีอะไรให้ช่วยเพิ่มเติมไหมคะ?`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMsgs);
    if (!textToSend) setInputMsg('');
    setIsChatLoading(true);

    setTimeout(() => {
      const aiReply = handleFreeChat(query);
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsChatLoading(false);
    }, 700);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setScanStep('result');
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!newIngredient.name || !newIngredient.amount) return;
    const item = {
      id: Date.now(),
      name: newIngredient.name,
      category: newIngredient.category,
      amount: newIngredient.amount,
      expiry: newIngredient.expiry || '30/06/2025',
      icon: newIngredient.category === 'ผัก' ? '🥬' : newIngredient.category === 'เนื้อสัตว์' ? '🥩' : '📦'
    };
    setIngredients([item, ...ingredients]);
    setNewIngredient({ name: '', category: 'ผัก', amount: '', expiry: '' });
    setShowAddModal(false);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  const filteredIngredients = selectedCategory === 'ทั้งหมด' 
    ? ingredients 
    : ingredients.filter(item => item.category === selectedCategory);

  return (
    <div style={{ backgroundColor: '#e5e7eb', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '390px', height: '844px', backgroundColor: '#ffffff', borderRadius: '36px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '8px solid #111827' }}>
        
        {/* Status Bar */}
        <div style={{ height: '36px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', fontSize: '12px', fontWeight: '600', color: '#111827', zIndex: 30 }}>
          <span>9:30</span>
          <div style={{ display: 'flex', gap: '6px' }}>📶 🔋</div>
        </div>

        {/* Header พร้อมลิงก์รูปภาพใหม่ที่คุณต้องการ */}
        <header style={{ padding: '8px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', backgroundColor: '#f0fdf4' }}>
              <img 
                src="https://cdn.phototourl.com/member/2026-11-08-691122cb-1293-4914-ae75-5691e7765ebb.png" 
                alt="FoodWise AI Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#16a34a', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              FoodWise <span style={{ color: '#111827' }}>AI</span>
            </h1>
          </div>
          <span style={{ fontSize: '11px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }}>100+ เมนูสูตรลับ</span>
        </header>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
          
          {selectedMenu ? (
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <button onClick={() => setSelectedMenu(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ArrowLeft size={18} /></button>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>รายละเอียดเมนูอาหาร</h3>
              </div>
              
              <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#f3f4f6' }}>
                <img 
                  src={selectedMenu.image} 
                  alt={selectedMenu.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'; }} 
                />
              </div>

              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 6px 0' }}>{selectedMenu.name}</h2>
              <div style={{ fontSize: '11px', color: '#6b7280', display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <span>⏱️ {selectedMenu.time}</span>
                <span>🔥 {selectedMenu.cal} kcal</span>
                <span>📂 {selectedMenu.category}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.5', marginBottom: '14px' }}>{selectedMenu.desc}</p>
              
              <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '14px', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 6px 0' }}>วัตถุดิบที่ใช้:</h4>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedMenu.ingredientsUsed.map((ing, i) => (
                    <span key={i} style={{ fontSize: '10px', backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '8px', color: '#374151' }}>{ing}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => { alert('บันทึกเมนูลงในแผนประจำวันแล้ว!'); setSelectedMenu(null); }} style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                บันทึกเมนูนี้ลงในแผนรายวัน
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: หน้าหลัก */}
              {activeTab === 'home' && (
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>สวัสดี!</p>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>วันนี้คุณมีวัตถุดิบอะไรบ้าง?</h2>
                  </div>

                  <div style={{ backgroundColor: '#f3f4f6', padding: '8px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder="ค้นหาวัตถุดิบ หรือเมนูอาหาร..." 
                      value={homeSearchQuery}
                      onChange={e => setHomeSearchQuery(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && homeSearchQuery.trim()) {
                          setMenuSearchQuery(homeSearchQuery);
                          setActiveTab('menu');
                        }
                      }}
                      style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', width: '100%' }}
                    />
                    {homeSearchQuery && (
                      <button 
                        onClick={() => {
                          setMenuSearchQuery(homeSearchQuery);
                          setActiveTab('menu');
                        }}
                        style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer' }}>
                        ค้นหา
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                    <button onClick={() => { setActiveTab('scanner'); setScanStep('upload'); }} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '18px', textAlign: 'left', cursor: 'pointer' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: '#16a34a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '8px' }}><Camera size={18} /></div>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111827' }}>ถ่ายรูปอาหาร</div>
                      <div style={{ fontSize: '10px', color: '#6b7280' }}>ให้ AI ช่วยวิเคราะห์</div>
                    </button>
                    <button onClick={() => setActiveTab('inventory')} style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '14px', borderRadius: '18px', textAlign: 'left', cursor: 'pointer' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: '#d97706', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '8px' }}><Package size={18} /></div>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#111827' }}>ใส่รายการวัตถุดิบ</div>
                      <div style={{ fontSize: '10px', color: '#6b7280' }}>ด้วยตนเอง</div>
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>เมนูแนะนำสำหรับคุณ</h3>
                    <span onClick={() => setActiveTab('menu')} style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer' }}>ดูทั้งหมด (100+ เมนู)</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {menuDatabase.slice(0, 4).map(m => (
                      <div key={m.id} onClick={() => setSelectedMenu(m)} style={{ border: '1px solid #f3f4f6', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <div style={{ height: '90px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'; }} 
                          />
                        </div>
                        <div style={{ padding: '10px' }}>
                          <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#111827', height: '32px', overflow: 'hidden' }}>{m.name}</div>
                          <div style={{ fontSize: '9px', color: '#6b7280', display: 'flex', gap: '4px', marginTop: '4px' }}>
                            <span>⏱️ {m.time}</span><span>🔥 {m.cal} kcal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: คลังเมนูอาหาร */}
              {activeTab === 'menu' && (
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>คลังเมนูอาหาร (100 เมนู)</h3>
                  <input 
                    type="text" 
                    placeholder="ค้นหาชื่อเมนูหรือประเภทอาหาร..." 
                    value={menuSearchQuery}
                    onChange={e => setMenuSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '16px', border: '1px solid #d1d5db', outline: 'none', fontSize: '12px', marginBottom: '12px', boxSizing: 'border-box' }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredMenus.map(m => (
                      <div key={m.id} onClick={() => setSelectedMenu(m)} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', border: '1px solid #f3f4f6', borderRadius: '16px', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <img 
                          src={m.image} 
                          alt={m.name} 
                          style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', backgroundColor: '#f3f4f6' }}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'; }} 
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#111827' }}>{m.name}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>{m.desc}</div>
                          <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 'bold', marginTop: '4px' }}>⏱️ {m.time} | 🔥 {m.cal} kcal</div>
                        </div>
                        <ChevronRight size={16} color="#9ca3af" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: วัตถุดิบ */}
              {activeTab === 'inventory' && (
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>วัตถุดิบของฉัน</h3>
                    <button onClick={() => setShowAddModal(true)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>+ เพิ่มวัตถุดิบ</button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    {['ทั้งหมด', 'ผัก', 'เนื้อสัตว์', 'อื่นๆ'].map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ fontSize: '11px', padding: '5px 12px', borderRadius: '16px', border: 'none', backgroundColor: selectedCategory === cat ? '#16a34a' : '#f3f4f6', color: selectedCategory === cat ? '#fff' : '#4b5563', cursor: 'pointer' }}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredIngredients.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #f3f4f6', borderRadius: '14px', backgroundColor: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '22px' }}>{item.icon}</span>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div>
                            <div style={{ fontSize: '10px', color: '#9ca3af' }}>หมดอายุ: {item.expiry}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '11px' }}>{item.amount}</span>
                          <button onClick={() => handleDeleteIngredient(item.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showAddModal && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                      <div style={{ backgroundColor: '#fff', width: '100%', borderRadius: '20px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>เพิ่มวัตถุดิบใหม่</h4>
                          <button onClick={() => setShowAddModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                        <form onSubmit={handleAddIngredient} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input type="text" required placeholder="ชื่อวัตถุดิบ (เช่น หมูสับ, กุ้ง)" value={newIngredient.name} onChange={e => setNewIngredient({...newIngredient, name: e.target.value})} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '11px' }} />
                          <select value={newIngredient.category} onChange={e => setNewIngredient({...newIngredient, category: e.target.value})} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '11px' }}>
                            <option value="ผัก">ผัก</option>
                            <option value="เนื้อสัตว์">เนื้อสัตว์</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                          </select>
                          <input type="text" required placeholder="ปริมาณ (เช่น 200 กรัม)" value={newIngredient.amount} onChange={e => setNewIngredient({...newIngredient, amount: e.target.value})} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '11px' }} />
                          <input type="text" placeholder="วันหมดอายุ (เช่น 25/05/2025)" value={newIngredient.expiry} onChange={e => setNewIngredient({...newIngredient, expiry: e.target.value})} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '11px' }} />
                          <button type="submit" style={{ marginTop: '8px', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>บันทึกวัตถุดิบ</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: ประวัติการใช้งาน */}
              {activeTab === 'history' && (
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>ประวัติการใช้งาน</h3>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    {['ทั้งหมด', 'เมนูที่สร้าง', 'วัตถุดิบ'].map(h => (
                      <button 
                        key={h} 
                        onClick={() => setHistoryFilter(h)}
                        style={{ fontSize: '10px', padding: '5px 12px', borderRadius: '14px', border: 'none', backgroundColor: historyFilter === h ? '#16a34a' : '#f3f4f6', color: historyFilter === h ? '#fff' : '#4b5563', cursor: 'pointer', fontWeight: 'bold' }}>
                        {h}
                      </button>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredHistory.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => {
                          if (item.menuData) setSelectedMenu(item.menuData);
                          else alert(`รายละเอียดประวัติ: ${item.details}`);
                        }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #f3f4f6', borderRadius: '14px', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#111827' }}>{item.title}</div>
                          <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>{item.date}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>{item.details}</div>
                        </div>
                        <span style={{ fontSize: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '8px', fontWeight: 'bold' }}>ดูข้อมูล</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: โปรไฟล์ */}
              {activeTab === 'profile' && (
                <div style={{ padding: '16px' }}>
                  {subView === null && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', backgroundColor: '#f9fafb', padding: '10px', borderRadius: '14px' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px' }}>🌱</div>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{profile.name}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>{profile.email}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '11px', color: '#374151' }}>
                        <div onClick={() => setSubView('macros')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Flame size={16} color="#16a34a" /><span>สารอาหารที่ควรได้รับในแต่ละวัน (Macros)</span></div>
                          <ChevronRight size={14} color="#9ca3af" />
                        </div>
                        <div onClick={() => setSubView('info')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16} color="#16a34a" /><span>ข้อมูลส่วนตัว (อายุ/น้ำหนัก/ส่วนสูง)</span></div>
                          <ChevronRight size={14} color="#9ca3af" />
                        </div>
                        <div onClick={() => setSubView('notifications')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={16} color="#16a34a" /><span>ตั้งค่าการแจ้งเตือนวัตถุดิบหมดอายุ</span></div>
                          <ChevronRight size={14} color="#9ca3af" />
                        </div>
                        <div onClick={() => setSubView('target')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="#16a34a" /><span>เป้าหมายลดอาหารเหลือทิ้ง</span></div>
                          <ChevronRight size={14} color="#9ca3af" />
                        </div>
                      </div>
                    </div>
                  )}

                  {subView === 'macros' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <button onClick={() => setSubView(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ArrowLeft size={16} /></button>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>สารอาหารที่ควรได้รับประจำวัน</h4>
                      </div>
                      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '12px', marginBottom: '12px', fontSize: '11px', color: '#166534' }}>
                        <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>🔥 พลังงานรวมที่แนะนำต่อวัน (TDEE):</p>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginBottom: '6px' }}>{macros.calories} kcal</div>
                        <p style={{ margin: 0, fontSize: '10px', color: '#4b5563' }}>คำนวณจากน้ำหนัก {profile.weight} kg, ส่วนสูง {profile.height} cm, อายุ {profile.age} ปี</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#92400e' }}>คาร์โบไฮเดรต</div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#d97706', marginTop: '4px' }}>{macros.carbs} g</div>
                        </div>
                        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#1e40af' }}>โปรตีน</div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb', marginTop: '4px' }}>{macros.protein} g</div>
                        </div>
                        <div style={{ backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#9d174d' }}>ไขมัน</div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#db2777', marginTop: '4px' }}>{macros.fat} g</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {subView === 'info' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <button onClick={() => setSubView(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ArrowLeft size={16} /></button>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>แก้ไขข้อมูลส่วนตัว</h4>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                        <div>
                          <label style={{ color: '#6b7280' }}>ชื่อผู้ใช้งาน</label>
                          <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', marginTop: '2px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ color: '#6b7280' }}>อายุ (ปี)</label>
                          <input type="number" value={profile.age} onChange={e => setProfile({...profile, age: Number(e.target.value)})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', marginTop: '2px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ color: '#6b7280' }}>น้ำหนัก (kg)</label>
                          <input type="number" value={profile.weight} onChange={e => setProfile({...profile, weight: Number(e.target.value)})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', marginTop: '2px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ color: '#6b7280' }}>ส่วนสูง (cm)</label>
                          <input type="number" value={profile.height} onChange={e => setProfile({...profile, height: Number(e.target.value)})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', marginTop: '2px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ color: '#6b7280' }}>เพศ</label>
                          <select value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px', marginTop: '2px', boxSizing: 'border-box' }}>
                            <option value="female">หญิง</option>
                            <option value="male">ชาย</option>
                          </select>
                        </div>
                        <button onClick={() => setSubView(null)} style={{ marginTop: '6px', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>บันทึกข้อมูล</button>
                      </div>
                    </div>
                  )}

                  {subView === 'notifications' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <button onClick={() => setSubView(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ArrowLeft size={16} /></button>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>ตั้งค่าการแจ้งเตือน</h4>
                      </div>
                      <div style={{ fontSize: '11px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '10px' }}>
                          <span>🔔 เตือนวัตถุดิบใกล้หมดอายุ</span>
                          <input type="checkbox" defaultChecked />
                        </div>
                      </div>
                    </div>
                  )}

                  {subView === 'target' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <button onClick={() => setSubView(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ArrowLeft size={16} /></button>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>เป้าหมายลดอาหารเหลือทิ้ง</h4>
                      </div>
                      <div style={{ fontSize: '11px', color: '#374151', lineHeight: '1.5' }}>
                        <p>🎯 เป้าหมาย: ลดขยะอาหาร 20% สำเร็จไปแล้ว 15%</p>
                      </div>
                    </div>
                  )}

                  <div style={{ borderTop: '2px solid #f0fdf4', paddingTop: '10px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <div style={{ width: '22px', height: '22px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px' }}>🌱</div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>แชทบอท AI (ถามตอบอิสระ)</span>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', marginBottom: '8px', paddingBottom: '2px' }}>
                      {[
                        'มีวัตถุดิบอะไรในตู้เย็น?', 
                        'วิธีเก็บรักษาผักให้สดนาน', 
                        'แคลอรีที่ควรได้รับต่อวัน', 
                        'เคล็ดลับลดขยะอาหาร'
                      ].map((sug, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleSendMessage(sug)}
                          style={{ fontSize: '9px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '3px 8px', borderRadius: '10px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                          💡 {sug}
                        </button>
                      ))}
                    </div>

                    <div style={{ height: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px', paddingRight: '2px' }}>
                      {chatMessages.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                          <div style={{ maxWidth: '85%', padding: '8px 12px', borderRadius: '12px', backgroundColor: msg.sender === 'user' ? '#16a34a' : '#f3f4f6', color: msg.sender === 'user' ? '#fff' : '#111827', fontSize: '11px', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && <div style={{ fontSize: '10px', color: '#16a34a', fontStyle: 'italic' }}>AI กำลังพิมพ์ตอบ...</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input 
                        type="text" 
                        placeholder="พิมพ์ข้อความถาม AI ได้อย่างอิสระ..." 
                        value={inputMsg}
                        onChange={e => setInputMsg(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '16px', border: '1px solid #d1d5db', outline: 'none', fontSize: '11px' }}
                      />
                      <button onClick={() => handleSendMessage()} disabled={isChatLoading} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* หน้าสแกนภาพ */}
              {activeTab === 'scanner' && (
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <button 
                      onClick={() => {
                        if (scanStep === 'result') {
                          setScanStep('upload');
                        } else {
                          setActiveTab('home');
                        }
                      }} 
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>วิเคราะห์อาหารด้วย AI</h3>
                  </div>

                  {scanStep === 'upload' && (
                    <div>
                      <div style={{ width: '100%', height: '220px', borderRadius: '20px', border: '2px dashed #16a34a', backgroundColor: '#f0fdf4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '14px' }}>
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ textAlign: 'center', padding: '16px' }}>
                            <Camera size={36} color="#16a34a" style={{ marginBottom: '6px' }} />
                            <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: '600', margin: 0 }}>ถ่ายรูปอาหาร / อัปโหลดวัตถุดิบ</p>
                          </div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} id="storyboard-upload" style={{ display: 'none' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="storyboard-upload" style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', textAlign: 'center', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>เลือกรูปภาพ</label>
                        <button onClick={runAnalysis} disabled={isAnalyzing || !imagePreview} style={{ padding: '10px', borderRadius: '12px', backgroundColor: !imagePreview ? '#cbd5e1' : '#16a34a', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                          {isAnalyzing ? 'AI กำลังวิเคราะห์ภาพ...' : 'วิเคราะห์ด้วย AI'}
                        </button>
                      </div>
                    </div>
                  )}

                  {scanStep === 'result' && (
                    <div>
                      <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '12px', border: '1px solid #f3f4f6', marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 8px 0' }}>วัตถุดิบที่ตรวจพบ</h4>
                        <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🥚 ไข่ไก่</span><span>1 ฟอง</span></div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🥬 ผักกาดหอม</span><span>50 กรัม</span></div>
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>ความมั่นใจของ AI: 95%</div>
                      </div>
                      
                      <button onClick={() => setActiveTab('menu')} style={{ width: '100%', padding: '10px', borderRadius: '12px', backgroundColor: '#16a34a', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginBottom: '8px' }}>
                        ดูเมนูที่แนะนำ (100+ เมนู)
                      </button>

                      <button onClick={() => setScanStep('upload')} style={{ width: '100%', padding: '10px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                        📷 ถ่ายรูป / เลือกภาพใหม่
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        {/* Bottom Navigation */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', backgroundColor: '#ffffff', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 30 }}>
          {[
            { id: 'home', label: 'หน้าหลัก', icon: Home },
            { id: 'menu', label: 'เมนู', icon: BookOpen },
            { id: 'inventory', label: 'วัตถุดิบ', icon: Package },
            { id: 'history', label: 'ประวัติ', icon: Clock },
            { id: 'profile', label: 'โปรไฟล์', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSubView(null); setSelectedMenu(null); }}
                style={{ border: 'none', background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', color: isActive ? '#16a34a' : '#9ca3af', cursor: 'pointer', gap: '2px' }}
              >
                <Icon size={18} />
                <span style={{ fontSize: '9px', fontWeight: isActive ? 'bold' : 'normal' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}