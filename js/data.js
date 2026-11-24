/* FLORAL JOY content & Salla connection map.
   Keep the registered logo asset untouched. Add the real Salla category/product URLs
   to SALLA_LINKS before activating online ordering. Never replace them with guessed URLs. */
window.FJ_DATA = {
  discount: 30,
  whatsapp: '966501707487',
  // Paste the real Salla category URL for each slug when available.
  // Example: wedding: 'https://your-store.salla.sa/category/xxxxx'
  sallaLinks: {
    wedding: '', family: '', celebration: '', corporate: '',
    wedding_engagement: '', wedding_nika: '', wedding_henna: '',
    bachelor: '', birthday: '', graduation: '', baby_reveal: '',
    birth: '', teething: '', reception: '', eid: '', barbecue: '',
    costume: '', friends: '', retirement: '', promotion: '', work: '', formal: ''
  },
  images: {
    hero: 'images/hero-floral-joy.png',
    wedding: 'https://img.partyslate.com/companies-cover-image/24129/image-880168ce-57c6-483c-b14a-25a6aed2d404.jpg?tr=w-1200',
    baby: 'https://i0.wp.com/successfulblackparenting.com/wp-content/uploads/2024/05/AdobeStock_643477459.jpeg?resize=960%2C640&ssl=1',
    birthday: 'https://www.aksharaeventplanners.in/gallery/birthdaygallery/floralthem.jpeg',
    table: 'https://quickcandles.com/cdn/shop/files/6206_01_event_decor_2_optimized.jpg?v=1776476243&width=1000',
    dessert: 'https://decofestive.com/cdn/shop/files/Rideau_Franges_Violet_Pastel.webp?v=1774979590&width=900',
    garden: 'https://cdn.shopify.com/s/files/1/0569/9574/1779/files/ivory-gold-and-blush-create-a-soft-romantic-palette-that-works-well-for-weddings-anniversaries-bridal-events-and-formal-summer-dinners-ivory-tablecloths-keep-the-setup-warm-blush-flow.png?v=1780483133'
  },
  occasions: [
    {id:'wedding', name:'حفلة زواج', group:'wedding', desc:'تنسيقات زفاف راقية بالزهور والإضاءة والتفاصيل الناعمة.', image:'wedding', sallaKey:'wedding'},
    {id:'engagement', name:'حفلة خطوبة', group:'wedding', desc:'أجواء رومانسية ناعمة للاحتفال ببداية حكاية جديدة.', image:'table', sallaKey:'wedding_engagement'},
    {id:'nika', name:'حفلة ملكة', group:'wedding', desc:'ديكورات أنيقة ولمسات وردية وعاجية للمناسبات الخاصة.', image:'garden', sallaKey:'wedding_nika'},
    {id:'henna', name:'حفلة حناء', group:'wedding', desc:'تفاصيل احتفالية دافئة وتنسيقات زهور مميزة.', image:'dessert', sallaKey:'wedding_henna'},
    {id:'bachelor', name:'حفلة توديع العزوبية', group:'celebration', desc:'جلسة مرحة بتفاصيل أنيقة وألوان متناسقة.', image:'birthday', sallaKey:'bachelor'},
    {id:'birthday', name:'حفلة عيد ميلاد', group:'celebration', desc:'طاولة احتفال مميزة وديكورات زهور وحلوى.', image:'birthday', sallaKey:'birthday'},
    {id:'graduation', name:'حفلة تخرج', group:'celebration', desc:'احتفال أنيق يليق بإنجاز يستحق التقدير.', image:'table', sallaKey:'graduation'},
    {id:'baby-reveal', name:'حفلة الكشف عن المولود', group:'family', desc:'ألوان باستيل وتفاصيل لطيفة لاستقبال الخبر السعيد.', image:'baby', sallaKey:'baby_reveal'},
    {id:'birth', name:'حفلة ولادة', group:'family', desc:'استقبال دافئ بتنسيقات هادئة ولمسات وردية.', image:'baby', sallaKey:'birth'},
    {id:'teething', name:'حفلة التسنين', group:'family', desc:'تفاصيل ناعمة ومرحة لاحتفال عائلي صغير.', image:'dessert', sallaKey:'teething'},
    {id:'reception', name:'حفلة استقبال', group:'family', desc:'استقبال ضيوفك بترتيب راقٍ وزهور تترك انطباعًا جميلًا.', image:'table', sallaKey:'reception'},
    {id:'eid', name:'حفلة معايدة', group:'family', desc:'جلسات استقبال وضيافة بتفاصيل دافئة ومبهجة.', image:'garden', sallaKey:'eid'},
    {id:'barbecue', name:'حفلة شواء', group:'celebration', desc:'تنسيق خارجي مريح بلمسات طبيعية مرتبة.', image:'garden', sallaKey:'barbecue'},
    {id:'costume', name:'حفلة تنكرية', group:'celebration', desc:'فكرة احتفالية بطابع خاص وتفاصيل قابلة للتخصيص.', image:'dessert', sallaKey:'costume'},
    {id:'friends', name:'حفلة أصدقاء', group:'celebration', desc:'جلسة لطيفة تجمع الأصدقاء مع تفاصيل ضيافة جميلة.', image:'table', sallaKey:'friends'},
    {id:'retirement', name:'حفلة نهاية الخدمة والتقاعد', group:'corporate', desc:'تكريم راقٍ ولمسات أنيقة للاحتفاء بمسيرة مميزة.', image:'garden', sallaKey:'retirement'},
    {id:'promotion', name:'حفلة ترقية في العمل', group:'corporate', desc:'احتفال مهني أنيق يليق بالإنجاز والنجاح.', image:'table', sallaKey:'promotion'},
    {id:'work', name:'حفلة عمل', group:'corporate', desc:'تنسيق عملي ومرتب للاجتماعات والفعاليات المؤسسية.', image:'wedding', sallaKey:'work'},
    {id:'formal', name:'حفلة رسمية', group:'corporate', desc:'استقبال رسمي بتفاصيل هادئة وأسلوب احترافي.', image:'garden', sallaKey:'formal'}
  ],
  inspirations: [
    {title:'تنسيق طاولات بالورود العاجية', image:'table', alt:'طاولة ضيافة بزهور عاجية وشموع'},
    {title:'استقبال وردي ناعم', image:'baby', alt:'تنسيق استقبال ببالونات وورود وردية'},
    {title:'طاولة حلويات احتفالية', image:'dessert', alt:'طاولة حلويات مزينة بالورود'},
    {title:'تفاصيل زفاف رومانسية', image:'wedding', alt:'تنسيق زفاف بالزهور والشموع'}
  ]
};
