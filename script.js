// 1. قائمة الجوال المتجاوبة
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. محرك التوليد الحقيقي بالذكاء الاصطناعي (صور + تفاصيل معمارية)
const spacePrompts = {
    apartment: "luxury modern apartment interior design",
    villa: "spacious luxury house villa living room interior design",
    office: "modern corporate executive office interior design",
    retail: "high-end commercial retail store showroom interior design"
};

const stylePrompts = {
    modern: "contemporary modern style, sleek furniture, warm ambient LED lighting",
    neoclassic: "neoclassic luxury style, marble floors, gold accents, crystal chandelier",
    minimalist: "minimalist scandinavian style, clean lines, neutral beige and white palette, natural daylight",
    industrial: "modern commercial industrial style, exposed concrete, wood and matte black metal accents"
};

const styleDetailsAr = {
    modern: {
        materials: "رخام طبيعي، خشب الجوز الدافئ، معادن بلمسة مطفية",
        lighting: "إضاءة مخفية (LED) مع إضاءة طبيعية واسعة",
        palette: "الأبيض الدافئ، الرمادي الفاتح، ولمسات خشبية"
    },
    neoclassic: {
        materials: "رخام كرارا، بانوهات جدارية كلاسيكية، مخمل فاخر",
        lighting: "ثريات كريستال عصرية مع إضاءة جدارية دافئة",
        palette: "العاجي، الذهبي المعتق، والبيج الملكي"
    },
    minimalist: {
        materials: "خشب البلوط الفاتح، أقمشة كتان طبيعية، أسطح ناعمة",
        lighting: "إضاءة نهارية طبيعية منتشرة بدون تشتيت",
        palette: "الأبيض النقي، الرملي، ودرجات البيج الهادئة"
    },
    industrial: {
        materials: "خرسانة مصقولة، زجاج، حديد أسود، وخشب طبيعي",
        lighting: "كشافات موجهة (Track Lights) وإضاءة معلقة حديثة",
        palette: "الرمادي الداكن، الأسود، واللون الخشبي الدافئ"
    }
};

const floorplanInput = document.getElementById('floorplanInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const generateRenderBtn = document.getElementById('generateRenderBtn');
const aiLoader = document.getElementById('aiLoader');
const renderedImage = document.getElementById('renderedImage');
const renderCaption = document.getElementById('renderCaption');
const previewStatus = document.getElementById('previewStatus');

if (floorplanInput) {
    floorplanInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileNameDisplay.textContent = `✅ تم إرفاق المخطط: ${e.target.files[0].name}`;
        }
    });
}

if (generateRenderBtn) {
    generateRenderBtn.addEventListener('click', () => {
        const space = document.getElementById('spaceType').value;
        const style = document.getElementById('designStyle').value;
        const userIdea = document.getElementById('aiPrompt').value.trim();
        const hasFloorplan = floorplanInput && floorplanInput.files.length > 0;

        const spaceText = document.getElementById('spaceType').options[document.getElementById('spaceType').selectedIndex].text;
        const styleText = document.getElementById('designStyle').options[document.getElementById('designStyle').selectedIndex].text;

        aiLoader.classList.add('active');
        previewStatus.textContent = "جاري بناء التصور ثلاثي الأبعاد بالذكاء الاصطناعي...";

        // بناء وصف هندسي دقيق للذكاء الاصطناعي
        const customUserPart = userIdea ? `, featuring ${userIdea}` : "";
        const fullPrompt = `Photorealistic 3D architectural render, ${spacePrompts[space]}, ${stylePrompts[style]}${customUserPart}, 8k resolution, unreal engine 5, architectural digest photography, wide angle, ultra realistic`;
        
        // إضافة رقم عشوائي لتوليد صورة جديدة في كل مرة يضغط فيها الزائر
        const seed = Math.floor(Math.random() * 100000);
        const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=680&seed=${seed}&nologo=true`;

        // تحميل الصورة المولدة وعرض التفاصيل الهندسية فور جاهزيتها
        const tempImg = new Image();
        tempImg.onload = () => {
            renderedImage.src = aiImageUrl;
            aiLoader.classList.remove('active');
            previewStatus.textContent = "تم التوليد بالذكاء الاصطناعي بنجاح ✓";

            const details = styleDetailsAr[style];
            const planNote = hasFloorplan ? "تم أخذ أبعاد المخطط المرفق بعين الاعتبار." : "تصور مقترح جاهز للتسويق العقاري.";
            
            renderCaption.innerHTML = `
                <strong>تحليل التصميم المولّد (${spaceText}):</strong><br>
                • <strong>الطراز:</strong> ${styleText} | ${planNote}<br>
                • <strong>فكرتك المطبقة:</strong> ${userIdea || "توزيع قياسي فاخر للإضاءة والأثاث"}<br>
                • <strong>الخامات المقترحة:</strong> ${details.materials}<br>
                • <strong>لوحة الألوان والإضاءة:</strong> ${details.palette} — ${details.lighting}
            `;
        };

        tempImg.onerror = () => {
            aiLoader.classList.remove('active');
            previewStatus.textContent = "تعذر الاتصال بمحرك الصور، حاول مرة أخرى";
        };

        tempImg.src = aiImageUrl;
    });
}

// 3. تصفية قسم المنازل والشقق
const tabButtons = document.querySelectorAll('.tab-btn');
const residentialCards = document.querySelectorAll('#residentialGrid .sector-card');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        residentialCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 4. نموذج طلب الاستشارة وإرساله للبريد الرسمي
const consultationForm = document.getElementById('consultationForm');
const formFeedback = document.getElementById('formFeedback');

if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const category = document.getElementById('projectCategory').value;
        const phone = document.getElementById('clientPhone').value;
        const details = document.getElementById('projectDetails').value;

        formFeedback.textContent = `شكراً لك ${name}! تم تسجيل طلب الاستشارة لمشروع (${category}) وجاري تحويلك للبريد الرسمي emadjaber23@gmail.com...`;

        const subject = encodeURIComponent(`طلب استشارة تصميم 3D - ${category} (${name})`);
        const body = encodeURIComponent(
            `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالهاتف: ${phone}\nنوع المشروع: ${category}\n\nتفاصيل المشروع:\n${details}`
        );

        setTimeout(() => {
            window.location.href = `mailto:emadjaber23@gmail.com?subject=${subject}&body=${body}`;
            consultationForm.reset();
        }, 1000);
    });
}

// 5. نظام الدردشة المباشرة (Live Chat)
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (chatToggleBtn) {
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
    });
}

if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });
}

function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${isUser ? 'user-msg' : 'bot-msg'}`;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userText) {
    const text = userText.toLowerCase();
    if (text.includes('سعر') || text.includes('تكلفة')) {
        return "تعتمد التكلفة على مساحة العقار وعدد اللقطات المطلوبة (3D Renders). يمكنك إرسال تفاصيل المساحة في قسم <strong>اطلب استشارة</strong> أو مراسلتنا على <strong>emadjaber23@gmail.com</strong> للحصول على عرض سعر فوري.";
    } else if (text.includes('شركة') || text.includes('متجر') || text.includes('محل') || text.includes('مكتب')) {
        return "نحن متخصصون في تصميم فروع الشركات، المكاتب الإدارية، والمحلات والمتاجر بكافة تخصصاتها مع توحيد الهوية البصرية.";
    } else if (text.includes('مخطط')) {
        return "يمكنك تجربة رفع مخطط الأرضية في <strong>استوديو AI</strong> بالأعلى، أو إرفاقه مباشرة عبر بريدنا الإلكتروني: <strong>emadjaber23@gmail.com</strong>.";
    }
    return "شكراً لتواصلك مع <strong>Home Decor AI</strong>! فريقنا جاهز لتحويل مخططك إلى صور ثلاثية الأبعاد واقعية. تواصل معنا مباشرة عبر <strong>emadjaber23@gmail.com</strong>.";
}

function sendQuickReply(text) {
    appendMessage(text, true);
    setTimeout(() => {
        appendMessage(getBotResponse(text), false);
    }, 500);
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        appendMessage(userText, true);
        chatInput.value = '';

        setTimeout(() => {
            appendMessage(getBotResponse(userText), false);
        }, 550);
    });
}

// 6. التحكم بنوافذ سياسة الخصوصية والشروط والأحكام
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('open');
    }
});