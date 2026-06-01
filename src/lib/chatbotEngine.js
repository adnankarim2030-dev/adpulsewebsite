// Multilingual AI Chatbot Response Engine for AdPulse IMC

const KNOWLEDGE_BASE = {
  en: {
    greeting: "Hello! I am AdPulse Assistant. What can I help you? (I support English, Urdu, Arabic, and Spanish)",
    services: "AdPulse IMC offers full 360-degree media services: \n• 📺 <strong>TVC Productions</strong> (TV Commercials & Documentaries)\n• 🏙️ <strong>Outdoor Media Advertising</strong> (OOH Billboards & Transit Ads)\n• 📊 <strong>Media Buying & Planning</strong> (PBA & APNS Accredited)\n• 🤝 <strong>Corporate Events</strong> (Conventions & Launches)\n• 📱 <strong>Digital Marketing Services</strong> (SEO & AI Ads Creative)\n• 🚌 <strong>Transit Advertising</strong> (Rickshaws & Bus Wraps)\n\nWhich of these would you like to explore?",
    location: "Our head office is located at:\n📍 <strong>Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi, Pakistan</strong>.\nFeel free to drop by or check our location details on our [Contact Page](/contact).",
    contact: "You can reach the AdPulse team through several channels:\n• 📞 Phone: <strong>+92 3008463041</strong>\n• ✉️ Email: <strong>info@adpulse.pk</strong>\n• 💬 Online Form: Visit our [Contact Page](/contact) to send a message directly.\n\nWe look forward to hearing from you!",
    pricing: "We offer transparent and tailored pricing packages for brands:\n• 🚀 <strong>STARTER Package</strong> ($999/mo) - Social Media & basic management\n• 📈 <strong>GROWTH Package</strong> ($2,499/mo) - Advanced social media & up to $5,000 ad spend management\n• 👑 <strong>ENTERPRISE Package</strong> (Custom) - Full omnichannel strategy & dedicated account management.\n\nSee full details on our [Services Page](/services#packages).",
    thanks: "You are very welcome! It is a pleasure to help you. Let me know if you have any other questions.",
    fallback: "I didn't quite catch that. Could you please specify if you'd like to know about our services, pricing, office location, or how to contact us?",
    
    // Detailed Q&As for each of the 12 Services
    tvc_detail: "📺 <strong>TVC Productions</strong>:<br/>Our award-winning team handles end-to-end video commercial production including scriptwriting, storyboarding, casting, shooting on professional cine cameras, and post-production (editing, grading, sound design). We produce high-impact TVCs, DVCs, and corporate documentaries that capture attention on air and online.",
    outdoor_detail: "🏙️ <strong>Outdoor Media Advertising (OOH)</strong>:<br/>AdPulse possesses premier OOH assets nationwide. We specialize in high-visibility traditional billboards, streamers, pedestrian bridge placements, transit terminal branding, and dynamic Digital Billboards (DOOH) located at major traffic intersections across Karachi, Lahore, and Islamabad.",
    media_buying_detail: "📊 <strong>Media Buying & Planning</strong>:<br/>As accredited members of APNS and PBA, we provide strategic planning and purchasing of ad spaces across print, digital, and broadcast channels. We leverage our network volume to secure prime slots at highly discounted rates, maximizing your campaign ROI.",
    corporate_events_detail: "🤝 <strong>Corporate Events Management</strong>:<br/>We organize and manage high-profile events including dealer conventions, product launch ceremonies, corporate seminars, annual awards, and brand conventions. We handle everything from invitation cards, AV production, stage designs, to media coverage.",
    pr_detail: "📣 <strong>PR & Promotion</strong>:<br/>We help manage your brand's public image through structured press release dissemination to leading news networks, corporate PR events, press conferences, media interviews, and targeted influencer marketing campaigns.",
    btl_detail: "🎯 <strong>BTL Marketing Activations</strong>:<br/>Below-the-Line activations bring your brand directly to your consumers. We design and execute nationwide supermarket sampling, corporate building roadshows, university pop-up stalls, and street brand activations to drive direct trials and sales.",
    digital_detail: "📱 <strong>Digital Marketing Services</strong>:<br/>We run performance-focused digital marketing campaigns. Services include social media page optimization, monthly content calendars, graphic design, copywriting, paid ads (Facebook, Instagram, LinkedIn, TikTok), lead generation, and search engine optimization (SEO).",
    ai_video_detail: "🤖 <strong>AI Video Ads Creative</strong>:<br/>Stay ahead with cutting-edge AI video technology. We generate high-converting short-form video commercials, dynamic translations, automated synthetic voiceovers, and personalized video copy variations for social media testing at a fraction of traditional cost.",
    print_detail: "📰 <strong>Print Media Releases</strong>:<br/>We draft, translate, and coordinate print ads and press releases in leading English, Urdu, and Sindhi newspapers across Pakistan (e.g., Dawn, Jang, Express, Business Recorder, Kawish) ensuring maximum editorial and commercial visibility.",
    electronic_detail: "📺 <strong>Electronic Media release</strong>:<br/>We secure airtime slots and run campaigns across all major satellite TV channels (Entertainment & News) and FM radio stations in Pakistan. Our planning optimizes spots (prime-time, mid-prime) to guarantee high frequency and target audience reach.",
    display_detail: "💻 <strong>Digital Display Ads</strong>:<br/>Reach customers online with programmatic banner campaigns, Google Display Network placements, website skins, interactive HTML5 ads, and mobile app display integrations optimized for click-through rate (CTR) and conversions.",
    transit_detail: "🚌 <strong>Transit Advertising</strong>:<br/>Mobilize your brand with moving billboards! We manage full/half wraps for public transport buses, corporate vans, and highly visible rickshaw back placements that traverse high-density residential and commercial routes daily."
  },
  ur: {
    greeting: "ہیلو! میں ایڈ پلس اسسٹنٹ ہوں۔ میں آپ کی کیا مدد کر سکتا ہوں؟ (میں انگریزی، اردو، عربی اور ہسپانوی میں بات چیت کر سکتا ہوں)",
    services: "ایڈ پلس (AdPulse IMC) یہ خدمات فراہم کرتا ہے:\n• 📺 <strong>TVC پروڈکشنز</strong> (ٹی وی کمرشلز اور دستاویزی فلمیں)\n• 🏙️ <strong>آؤٹ ڈور میڈیا</strong> (بل بورڈز اور ٹرانزٹ اشتہارات)\n• 📊 <strong>میڈیا بائنگ اور پلاننگ</strong> (PBA اور APNS رجسٹرڈ)\n• 🤝 <strong>کارپوریٹ ایونٹس</strong> (لانچز اور ڈیلر کنونشنز)\n• 📱 <strong>ڈیجیٹل مارکیٹنگ</strong> (ایس ای او اور اے آئی ویڈیوز)\n• 🚌 <strong>ٹرانزٹ اشتہارات</strong> (بس اور رکشہ ایڈز)\n\nآپ کس سروس کے بارے میں معلومات حاصل کرنا چاہتے ہیں؟",
    location: "ہمارا ہیڈ آفس کراچی میں یہاں واقع ہے:\n📍 <strong>آفس نمبر 213، دوسری منزل، پاک ٹاور، بلاک 5 کلفٹن، کراچی، پاکستان</strong>۔\nآپ ہمارے [رابطہ صفحہ](/contact) پر بھی نقشہ دیکھ سکتے ہیں۔",
    contact: "آپ ان طریقوں سے ایڈ پلس ٹیم سے رابطہ کر سکتے ہیں:\n• 📞 فون نمبر: <strong>3008463041 92+</strong>\n• ✉️ ای میل: <strong>info@adpulse.pk</strong>\n• 💬 آن لائن فارم: ہمارے [رابطہ صفحہ](/contact) پر پیغام بھیجیں۔\n\nہم جلد ہی آپ سے رابطہ کریں گے!",
    pricing: "ہم مختلف پیکجز پیش کرتے ہیں:\n• 🚀 <strong>اسٹارٹر پیکج</strong> ($999/ماہ)\n• 📈 <strong>گروتھ پیکج</strong> ($2,499/ماہ)\n• 👑 <strong>انٹرپرائز پیکج</strong> (کسٹم حل)\n\nتفصیلات کے لیے ہمارا [سروسز صفحہ](/services) وزٹ کریں۔",
    thanks: "بہت بہت شکریہ! آپ کی مدد کرنا میرے لیے خوشی کا باعث ہے۔ اگر کوئی اور سوال ہے تو ضرور پوچھیں۔",
    fallback: "معذرت، میں آپ کی بات پوری طرح سمجھ نہیں سکا۔ کیا آپ سروسز، قیمت، آفس کا پتہ یا رابطہ کی تفصیلات کے بارے میں پوچھنا چاہتے ہیں؟",
    
    // Detailed Q&As for each of the 12 Services (Urdu)
    tvc_detail: "📺 <strong>ٹی وی سی (TVC) پروڈکشنز</strong>:<br/>ہماری ٹیم اسکرپٹ رائٹنگ، اسٹوری بورڈ، شوٹنگ، اور پوسٹ پروڈکشن (ایڈیٹنگ، گریڈنگ، ساؤنڈ ڈیزائن) کے ساتھ مکمل ویڈیو کمرشل تیار کرتی ہے۔ ہم معیاری ٹی وی کمرشلز اور کارپوریٹ دستاویزی فلمیں بناتے ہیں۔",
    outdoor_detail: "🏙️ <strong>آؤٹ ڈور میڈیا اشتہارات (OOH)</strong>:<br/>ایڈ پلس کے پاس ملک بھر میں بل بورڈز، ہورڈنگز، سٹریمرز اور ڈیجیٹل بل بورڈز (DOOH) کے بہترین اثاثے ہیں جو کراچی، لاہور اور اسلام آباد کے اہم مقامات پر نصب ہیں۔",
    media_buying_detail: "📊 <strong>میڈیا بائنگ اور پلاننگ</strong>:<br/>ہم APNS اور PBA کے الحاق یافتہ ممبر ہیں اور ٹی وی، اخبار، اور ڈیجیٹل چینلز پر مناسب اور رعایتی قیمتوں پر اشتہارات کی جگہ خرید کر مہم کا ROI بڑھاتے ہیں۔",
    corporate_events_detail: "🤝 <strong>کارپوریٹ ایونٹ مینجمنٹ</strong>:<br/>ہم ڈیلر کنونشنز، ایوارڈ شوز، سیمینارز، اور پراڈکٹ لانچنگ تقریبات کا مکمل انتظام کرتے ہیں جس میں اسٹیج ڈیزائن، اے وی پروڈکشن، اور میڈیا کوریج شامل ہے۔",
    pr_detail: "📣 <strong>پی آر اور پروموشن</strong>:<br/>ہم میڈیا پریس ریلیز کی تقسیم، پریس کانفرنسز، اور اثر انگیز مارکیٹنگ (influencer campaigns) کے ذریعے آپ کے برانڈ کا عوامی امیج بہتر بناتے ہیں۔",
    btl_detail: "🎯 <strong>بی ٹی ایل (BTL) مارکیٹنگ ایکٹیویشنز</strong>:<br/>بی ٹی ایل کے ذریعے ہم آپ کے برانڈ کو براہ راست صارفین تک پہنچاتے ہیں۔ اس میں سپر مارکیٹ سیمپلنگ، یونیورسٹی اسٹالز، اور روڈ شوز شامل ہیں۔",
    digital_detail: "📱 <strong>ڈیجیٹل مارکیٹنگ سروسز</strong>:<br/>ہم سوشل میڈیا مینجمنٹ، گرافک ڈیزائن، پیڈ اشتہارات (فیس بک، انسٹاگرام، ٹک ٹاک)، اور سرچ انجن آپٹیمائزیشن (SEO) کے ذریعے برانڈ کو آن لائن بڑھاتے ہیں۔",
    ai_video_detail: "🤖 <strong>اے آئی ویڈیو ایڈز</strong>:<br/>جدید مصنوعی ذہانت (AI) کے ذریعے ہم سوشل میڈیا کے لیے خودکار آواز، اسکرپٹ، اور کم لاگت میں معیاری ویڈیو اشتہارات تیار کرتے ہیں۔",
    print_detail: "📰 <strong>پرنٹ میڈیا ریلیز</strong>:<br/>پاکستان کے تمام بڑے اخبارات (ڈان، جنگ، ایکسپریس، وغیرہ) میں پریس ریلیز اور اشتہارات کی اشاعت کا مکمل انتظام۔",
    electronic_detail: "📺 <strong>الیکٹرانک میڈیا ریلیز</strong>:<br/>پاکستان کے معروف ٹی وی چینلز اور ایف ایم ریڈیو اسٹیشنز پر اشتہارات کی نشریات کے لیے بہترین ٹائم سلاٹس (پرائم ٹائم) کا انتظام۔",
    display_detail: "💻 <strong>ڈیجیٹل ڈسپلے اشتہارات</strong>:<br/>گوگل ڈسپلے نیٹ ورک، بینرز اور ویب سائٹ اسکنز کے ذریعے انٹرایکٹو آن لائن اشتہارات۔",
    transit_detail: "🚌 <strong>ٹرانزٹ اشتہارات</strong>:<br/>متحرک اشتہارات! بسوں، گاڑیوں اور رکشوں پر برانڈ کی تشہیر جو روزانہ ہزاروں مسافروں کی توجہ حاصل کرتی ہے۔"
  },
  ar: {
    greeting: "مرحباً! أنا مساعد AdPulse. كيف يمكنني مساعدتك؟ (أنا أدعم اللغات الإنجليزية والأردية والعربية والإسبانية)",
    services: "تقدم AdPulse IMC خدمات إعلامية متكاملة 360 درجة:\n• 📺 <strong>إنتاج إعلانات التلفزيون (TVC)</strong>\n• 🏙️ <strong>الإعلانات الخارجية (OOH)</strong> (اللوحات ووسائل النقل)\n• 📊 <strong>تخطيط وشراء المساحات الإعلانية</strong> (معتمد من APNS و PBA)\n• 🤝 <strong>الفعاليات والمؤتمرات</strong> للشركات\n• 📱 <strong>خدمات التسويق الرقمي</strong> (السيو وإعلانات الذكاء الاصطناعي)\n• 🚌 <strong>إعلانات النقل</strong> (الحافلات وRickshaws)\n\nأي خدمة تود استكشافها؟",
    location: "يقع مكتبنا الرئيسي في كراتشي:\n📍 <strong>مكتب رقم 213، الطابق الثاني، باك تاور، بلوك 5 كليفتون، كراتشي، باكستان</strong>.\nمرحبًا بك في زيارتنا أو مراجعة [صفحة الاتصال](/contact).",
    contact: "يمكنك التواصل معنا عبر القنوات التالية:\n• 📞 الهاتف: <strong>3008463041 92+</strong>\n• ✉️ البريد الإلكتروني: <strong>info@adpulse.pk</strong>\n• 💬 نموذج الاتصال: تفضل بزيارة [صفحة الاتصال](/contact).\n\nيسعدنا تواصلك معنا!",
    pricing: "نحن نقدم باقات أسعار مرنة ومناسبة:\n• 🚀 <strong>باقة Starter</strong> (999 دولار/شهرياً)\n• 📈 <strong>باقة Growth</strong> (2499 دولار/شهرياً)\n• 👑 <strong>باقة Enterprise</strong> (باقة مخصصة للشركات الكبرى)\n\nاطلع على التفاصيل الكاملة في [صفحة الخدمات](/services#packages).",
    thanks: "على الرحب والسعة! يسعدني جداً مساعدتك. لا تتردد في الاستفسار عن أي شيء آخر.",
    fallback: "عذراً، لم أفهم سؤالك تماماً. هل تريد الاستفسار عن خدماتنا، باقات الأسعار، موقع مكتبنا، أو تفاصيل الاتصال؟",
    
    // Detailed Q&As for each of the 12 Services (Arabic)
    tvc_detail: "📺 <strong>إنتاج إعلانات التلفزيون (TVC)</strong>:<br/>يقوم فريقنا بإعداد وإنتاج الإعلانات التلفزيونية والوثائقية من كتابة السيناريو والتصوير والإنتاج الفني الاحترافي والمونتاج الصوتي والمرئي.",
    outdoor_detail: "🏙️ <strong>الإعلانات الخارجية (OOH)</strong>:<br/>نمتلك ونوفر لوحات إعلانية ممتازة وشاشات رقمية تفاعلية (DOOH) في أهم التقاطعات والمناطق الحيوية عبر كراتشي ولاهور وإسلام آباد.",
    media_buying_detail: "📊 <strong>تخطيط وشراء المساحات الإعلانية</strong>:<br/>بصفتنا عضواً معتمداً في APNS و PBA، نخطط ونشتري مساحات إعلانية في التلفزيون والصحف والراديو بأفضل الأسعار وأعلى نسب مشاهدة.",
    corporate_events_detail: "🤝 <strong>إدارة فعاليات الشركات</strong>:<br/>نحن ننظم مؤتمرات الموزعين وحفلات إطلاق المنتجات والجوائز السنوية وتجهيز المسارح والديكورات والتغطية الإعلامية الشاملة.",
    pr_detail: "📣 <strong>العلاقات العامة والترويج</strong>:<br/>إرسال البيانات الصحفية للصحف وتنسيق المؤتمرات الصحفية وإدارة الحملات الدعائية وحملات المؤثرين.",
    btl_detail: "🎯 <strong>تنشيط المبيعات المباشرة (BTL)</strong>:<br/>حملات تذوق وتجربة المنتجات في مراكز التسوق والجامعات والفعاليات المباشرة لزيادة المبيعات.",
    digital_detail: "📱 <strong>خدمات التسويق الرقمي</strong>:<br/>إدارة صفحات التواصل الاجتماعي، الإعلانات الممولة (فيسبوك، إنستغرام، لينكد إن)، تحسين محركات البحث (SEO).",
    ai_video_detail: "🤖 <strong>إعلانات الذكاء الاصطناعي</strong>:<br/>صناعة إعلانات فيديو تفاعلية وترجمتها وتعديلها صوتياً باستخدام أحدث تقنيات الذكاء الاصطناعي وبأقل التكاليف.",
    print_detail: "📰 <strong>النشر في الصحف المطبوعة</strong>:<br/>تنسيق ونشر الإعلانات والبيانات الصحفية في كبرى الصحف الباكستانية الإنجليزية والأردية.",
    electronic_detail: "📺 <strong>البث التلفزيوني والإذاعي</strong>:<br/>حجز مساحات إعلانية في القنوات الفضائية الباكستانية ومحطات الراديو FM في أوقات الذروة.",
    display_detail: "💻 <strong>إعلانات العرض الرقمية</strong>:<br/>إعلانات البانر والتسويق عبر شبكة جوجل الإعلانية واستهداف الجمهور المناسب بدقة.",
    transit_detail: "🚌 <strong>إعلانات وسائل النقل</strong>:<br/>إعلانات متحركة على الحافلات وسيارات الأجرة وعربات الريكشا لزيادة وعي الجمهور بالبرانڈ."
  },
  es: {
    greeting: "¡Hola! Soy Asistente AdPulse. ¿Cómo puedo ayudarte? (Hablo inglés, urdu, árabe y español)",
    services: "AdPulse IMC ofrece servicios de medios de 360 grados:\n• 📺 <strong>Producciones de TVC</strong> (Comerciales de TV y Documentales)\n• 🏙️ <strong>Medios Exteriores (OOH)</strong> (Vallas Publicitarias y Tránsito)\n• 📊 <strong>Compra y Planificación de Medios</strong> (PBA y APNS Acreditados)\n• 🤝 <strong>Eventos Corporativos</strong> (Lanzamientos y Convenciones)\n• 📱 <strong>Marketing Digital</strong> (SEO y Creativos de Video con IA)\n• 🚌 <strong>Publicidad de Tránsito</strong> (Rickshaws y Buses)\n\n¿Qué servicio te gustaría explorar?",
    location: "Nuestra oficina central se encuentra en Karachi:\n📍 <strong>Oficina #213, 2do piso, Pak Tower, Block 5 Clifton, Karachi, Pakistán</strong>.\nEres bienvenido a visitarnos. Consulta el mapa en la [Página de Contacto](/contact).",
    contact: "Puedes ponerte en contacto con nosotros a través de:\n• 📞 Teléfono: <strong>+92 3008463041</strong>\n• ✉️ Correo: <strong>info@adpulse.pk</strong>\n• 💬 Formulario: Envíanos un mensaje en nuestra [Página de Contacto](/contact).\n\n¡Esperamos trabajar contigo!",
    pricing: "Ofrecemos paquetes transparentes y flexibles para marcas:\n• 🚀 <strong>Paquete STARTER</strong> ($999/mes) - Gestión básica y redes sociales\n• 📈 <strong>Paquete GROWTH</strong> ($2,499/mes) - Gestión avanzada y optimización publicitaria\n• 👑 <strong>Paquete ENTERPRISE</strong> (Personalizado) - Estrategia omnicanal completa.\n\nVer detalles en nuestra [Página de Servicios](/services#packages).",
    thanks: "¡De nada! Es un placer ayudarte. Avísame si tienes alguna otra pregunta. ¡Que tengas un excelente día!",
    fallback: "¿Lo siento, no entendí del todo. ¿Deseas saber sobre nuestros servicios, precios, ubicación de la oficina o cómo contactarnos?",
    
    // Detailed Q&As for each of the 12 Services (Spanish)
    tvc_detail: "📺 <strong>Producciones de TVC</strong>:<br/>Producimos comerciales y documentales corporativos desde el guión, casting, rodaje hasta la edición final, corrección de color y diseño de sonido.",
    outdoor_detail: "🏙️ <strong>Medios Exteriores (OOH)</strong>:<br/>Ofrecemos vallas publicitarias tradicionales y pantallas digitales dinámicas (DOOH) en las intersecciones viales más importantes a nivel nacional.",
    media_buying_detail: "📊 <strong>Compra y Planificación de Medios</strong>:<br/>Acreditados por PBA y APNS, compramos espacios en TV, periódicos y medios digitales con tarifas especiales negociadas para optimizar su ROI.",
    corporate_events_detail: "🤝 <strong>Eventos Corporativos</strong>:<br/>Organizamos convenciones de distribuidores, lanzamientos de productos, seminarios y entregas de premios con soporte técnico y de medios completo.",
    pr_detail: "📣 <strong>Relaciones Públicas (PR)</strong>:<br/>Difundimos comunicados de prensa a medios clave, coordinamos ruedas de prensa, entrevistas y organizamos campañas de influencers.",
    btl_detail: "🎯 <strong>Activaciones BTL</strong>:<br/>Llevamos su marca al consumidor con muestreos en supermercados, quioscos interactivos en universidades y activaciones de calle.",
    digital_detail: "📱 <strong>Marketing Digital</strong>:<br/>Gestión de redes sociales, anuncios pagados (Meta, LinkedIn, TikTok), generación de prospectos y optimización SEO de alta calidad.",
    ai_video_detail: "🤖 <strong>Videos con Inteligencia Artificial</strong>:<br/>Creamos anuncios de video automatizados con locuciones virtuales, adaptaciones rápidas y variaciones dinámicas de bajo costo.",
    print_detail: "📰 <strong>Prensa Escrita</strong>:<br/>Coordinamos anuncios y publicaciones en los diarios líderes de Pakistán (Dawn, Jang, Express) para una máxima presencia comercial.",
    electronic_detail: "📺 <strong>Medios Electrónicos</strong>:<br/>Emitimos sus comerciales en las cadenas de televisión y estaciones de radio FM más sintonizadas en horarios de alta audiencia.",
    display_detail: "💻 <strong>Anuncios de Display Digital</strong>:<br/>Anuncios interactivos tipo banner y campañas de remarketing en la Red de Display de Google para impulsar conversiones.",
    transit_detail: "🚌 <strong>Publicidad de Tránsito</strong>:<br/>Publicidad móvil en autobuses, furgonetas y rickshaws corporativos que recorren diariamente las rutas comerciales más transitadas."
  }
};

// Simple heuristic function to detect input language
function detectLanguage(text) {
  const lowercase = text.toLowerCase();
  
  // 1. Urdu check (Urdu Unicode characters range from \u0600 to \u06FF, specifically looking for common Urdu connector words)
  const containsUrduChars = /[\u0600-\u06FF]/.test(text);
  if (containsUrduChars) {
    // Distinguish Urdu from Arabic by checking common Urdu-specific letters/words
    const urduKeywords = ["ہے", "ہیں", "کیا", "کون", "کیسے", "آپ", "دفتر", "رابطہ", "شکریہ", "کرو", "کریں", "ہم", "یہ", "ہوں", "قیمت"];
    const matchesUrdu = urduKeywords.some(keyword => text.includes(keyword));
    if (matchesUrdu || text.includes("دفتر") || text.includes("پتہ") || text.includes("خدمات")) {
      return "ur";
    }
    // If not matching specific Urdu words but has Arabic script, check Arabic indicators, otherwise default to ur for local region
    const arabicKeywords = ["نعم", "شكرا", "كيف", "هذا", "ال", "مكتب", "عنوان", "خدمات", "سعر", "أسعار", "اتصال"];
    const matchesArabic = arabicKeywords.some(keyword => text.includes(keyword));
    if (matchesArabic) {
      return "ar";
    }
    return "ur"; // Default Arabic-script language to Urdu as target market is Pakistan
  }
  
  // 2. Spanish check
  const spanishKeywords = ["hola", "como", "servicio", "servicios", "precio", "precios", "costo", "donde", "gracias", "contacto", "oficina", "telefono", "correo"];
  if (spanishKeywords.some(word => lowercase.includes(word))) {
    return "es";
  }
  
  // 3. Fallback to English
  return "en";
}

// Map user text to matching intent keywords in different languages
function detectIntent(text, lang) {
  const lowercase = text.toLowerCase();
  
  const INTENT_KEYWORDS = {
    tvc_detail: {
      en: ["tvc", "television commercial", "commercials", "documentary", "documentaries", "video production", "shoot"],
      ur: ["ٹی وی کمرشل", "ویڈیو پروڈکشن", "دستاویزی"],
      ar: ["تلفزيوني", "إنتاج فيديو", "وثائقي"],
      es: ["tvc", "comercial de television", "video comercial", "producción de video", "documental"]
    },
    outdoor_detail: {
      en: ["outdoor media", "billboard", "billboards", "hoarding", "hoardings", "ooh", "streamer", "streamers", "bridge"],
      ur: ["آؤٹ ڈور", "بل بورڈ", "ہورڈنگ", "سٹریمر"],
      ar: ["إعلان خارجي", "لوحة إعلانية", "لوحات", "ستريمر"],
      es: ["medio exterior", "valla", "vallas", "espectaculares", "ooh", "cartelera"]
    },
    media_buying_detail: {
      en: ["media buying", "media planning", "pba", "apns", "airtime", "ad space"],
      ur: ["میڈیا بائنگ", "پلاننگ", "اخبار اشتہار", "فضائی وقت"],
      ar: ["شراء مساحات", "تخطيط إعلامي", "شراء إعلامي"],
      es: ["compra de medios", "planificacion de medios", "espacio publicitario"]
    },
    corporate_events_detail: {
      en: ["corporate event", "corporate events", "event management", "dealer convention", "award show", "conference", "product launch"],
      ur: ["ایونٹ مینجمنٹ", "تقریب", "کنونشن", "ایوارڈ شو", "لانچنگ تقریب"],
      ar: ["فعاليات الشركات", "إدارة فعاليات", "مؤتمر", "حفل إطلاق"],
      es: ["evento corporativo", "eventos corporativos", "gestion de eventos", "convencion", "conferencia"]
    },
    pr_detail: {
      en: ["pr & promotion", "pr and promotion", "public relations", "press release", "influencer marketing", "media relations"],
      ur: ["پی آر", "پریس ریلیز", "عوامی تعلقات", "اشاعت"],
      ar: ["العلاقات العامة", "بيان صحفي", "ترويج"],
      es: ["relaciones publicas", "comunicado de prensa", "influencer", "promocion"]
    },
    btl_detail: {
      en: ["btl marketing", "btl activation", "below the line", "sampling", "product sampling", "roadshow", "activations", "activation"],
      ur: ["بی ٹی ایل", "ایکٹیویشن", "سیمپلنگ", "روڈ شو"],
      ar: ["تنشيط المبيعات", "تنشيط العلامة", "عينات"],
      es: ["marketing btl", "activacion de marca", "muestreo", "roadshow", "activaciones"]
    },
    digital_detail: {
      en: ["digital marketing", "social media", "seo", "search engine optimization", "page management", "lead generation"],
      ur: ["ڈیجیٹل مارکیٹنگ", "سوشل میڈیا", "ایس ای او", "پیج مینجمنٹ"],
      ar: ["التسويق الرقمي", "سوشل ميديا", "السيو", "إدارة الصفحات"],
      es: ["marketing digital", "redes sociales", "seo", "gestion de paginas", "lead generation"]
    },
    ai_video_detail: {
      en: ["ai video", "ai ads", "ai creative", "automated voice", "artificial intelligence video"],
      ur: ["اے آئی ویڈیو", "مصنوعی ذہانت", "اے آئی اشتہار"],
      ar: ["ذكاء اصطناعي فيديو", "فيديو ذكاء اصطناعي", "إعلانات الذكاء"],
      es: ["video con ia", "anuncios con ia", "inteligencia artificial video"]
    },
    print_detail: {
      en: ["print media", "newspaper", "newspapers", "magazine", "magazines", "press ad", "classifieds"],
      ur: ["پرنٹ میڈیا", "اخبار", "رسالہ", "پریس اشتہار"],
      ar: ["إعلام مطبوع", "صحيفة", "صحف", "جريدة", "مجلات"],
      es: ["medio impreso", "periodico", "periodicos", "revista", "revistas", "prensa"]
    },
    electronic_detail: {
      en: ["electronic media", "television ad", "tv ad", "radio ad", "fm radio", "broadcasting"],
      ur: ["الیکٹرانک میڈیا", "ٹی وی اشتہار", "ریڈیو اشتہار", "ایف ایم"],
      ar: ["إعلام إلكتروني", "إعلان تلفزيوني", "إذاعة", "راديو"],
      es: ["medio electronico", "anuncio de tv", "anuncio de radio", "radio fm", "radiodifusion"]
    },
    display_detail: {
      en: ["digital display", "banner ads", "display ads", "programmatic", "google display"],
      ur: ["ڈیجیٹل ڈسپلے", "بینر اشتہار", "گوگل ڈسپلے"],
      ar: ["شاشة عرض رقمية", "إعلان بنر", "شبكة إعلانات"],
      es: ["pantalla digital", "anuncios de banner", "anuncios de display", "programatico"]
    },
    transit_detail: {
      en: ["transit advertising", "transit ads", "bus wrap", "rickshaw back", "vehicle wrap", "mobile billboard"],
      ur: ["ٹرانزٹ اشتہارات", "بس اشتہار", "رکشہ اشتہار", "گاڑی کا اشتہار"],
      ar: ["إعلانات النقل", "إعلانات الحافلات", "ملصقات ركشا"],
      es: ["publicidad de transito", "publicidad en autobuses", "rickshaw", "rotulacion de vehiculos"]
    },
    services: {
      en: ["service", "services", "offer", "do you do", "capabilities", "what you do"],
      ur: ["خدمات", "کام", "سروس", "سروسز", "سہولت"],
      ar: ["خدمة", "خدمات", "عرض", "ماذا تفعلون"],
      es: ["servicio", "servicios", "ofrecen", "hacen"]
    },
    location: {
      en: ["location", "office", "address", "where is", "located", "karachi", "clifton", "find you"],
      ur: ["پتہ", "دفتر", "آفس", "کہاں", "واقع", "کلفٹن", "کراچی"],
      ar: ["موقع", "مكتب", "عنوان", "أين", "كراتشي", "عنوانكم", "موقعكم"],
      es: ["ubicacion", "oficina", "direccion", "donde", "donde esta", "karachi", "clifton"]
    },
    contact: {
      en: ["contact", "phone", "email", "number", "call", "reach", "write", "support"],
      ur: ["رابطہ", "فون", "نمبر", "ای میل", "بات", "کال"],
      ar: ["اتصال", "تواصل", "هاتف", "رقم", "بريد", "إيميل", "أتواصل"],
      es: ["contacto", "telefono", "numero", "correo", "email", "llamar", "escribir"]
    },
    pricing: {
      en: ["price", "pricing", "cost", "costly", "expensive", "packages", "rates", "rate", "charge", "charges", "fee"],
      ur: ["قیمت", "پیکج", "چارجز", "بجٹ", "پیسے", "خرچہ", "ریٹ"],
      ar: ["سعر", "أسعار", "تكلفة", "باقة", "باقات", "كم يكلف"],
      es: ["precio", "precios", "costo", "cuesta", "paquete", "paquetes", "tarifas", "cuanto"]
    },
    thanks: {
      en: ["thanks", "thank you", "thank", "awesome", "great", "perfect", "ok", "good"],
      ur: ["شکریہ", "مہربانی", "تھینکس", "شکریہ ادا", "بہتر", "ٹھیک"],
      ar: ["شكرا", "شكرًا", "مشكور", "جيد", "تمام", "حسنًا"],
      es: ["gracias", "agradecido", "excelente", "perfecto", "bueno", "ok"]
    }
  };

  for (const [intent, langKeywords] of Object.entries(INTENT_KEYWORDS)) {
    const keywords = langKeywords[lang] || [];
    if (keywords.some(word => lowercase.includes(word))) {
      return intent;
    }
  }
  
  // Also check cross-language matching in case of mixed inputs
  for (const [intent, langKeywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const [l, keywords] of Object.entries(langKeywords)) {
      if (keywords.some(word => lowercase.includes(word))) {
        return intent;
      }
    }
  }

  return null;
}

export function getChatbotResponse(userMessage) {
  if (!userMessage || typeof userMessage !== "string") {
    return {
      text: KNOWLEDGE_BASE.en.fallback,
      lang: "en"
    };
  }

  const lang = detectLanguage(userMessage);
  const intent = detectIntent(userMessage, lang);
  
  const localizedData = KNOWLEDGE_BASE[lang] || KNOWLEDGE_BASE.en;
  
  let replyText = "";
  if (intent && localizedData[intent]) {
    replyText = localizedData[intent];
  } else {
    // If it's a general greeting, check if user message contains standard greetings
    const isGreeting = ["hello", "hi", "hey", "hola", "salam", "سلام", "مرحبا", "good morning", "good afternoon"].some(greet => userMessage.toLowerCase().includes(greet));
    if (isGreeting) {
      replyText = localizedData.greeting;
    } else {
      replyText = localizedData.fallback;
    }
  }

  return {
    text: replyText,
    lang: lang,
    intent: intent
  };
}
