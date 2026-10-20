import { Persona } from '../types/assistant';

export const PERSONAS: Persona[] = [
  {
    id: 'general',
    name: {
      mr: 'Fenix AI - मुख्य सहाय्यक',
      en: 'Fenix Core AI',
      hi: 'Fenix Core AI',
    },
    title: {
      mr: 'स्मार्ट सायबर सहाय्यक',
      en: 'Futuristic Personal AI',
      hi: 'स्मार्ट व्यक्तिगत सहायक',
    },
    badge: {
      mr: 'Fenix Master',
      en: 'Fenix Master',
      hi: 'Fenix Master',
    },
    description: {
      mr: 'Fenix Digital Services व Thar Mobile द्वारे संचालित - सर्वसमावेशक सायबर सहाय्यक.',
      en: 'Powered by Fenix Digital Services & Thar Mobile - your all-in-one smart cyber AI.',
      hi: 'Fenix Digital Services व Thar Mobile द्वारा संचालित - सर्वसमावेशक AI सहायक।',
    },
    icon: 'Sparkles',
    color: 'amber',
    bgGradient: 'from-cyan-500/20 via-amber-500/10 to-transparent',
    systemInstruction: `You are 'Fenix AI' (फिनिक्स AI), an advanced, futuristic AI assistant proudly powered by 'Fenix Digital Services' and 'Thar Mobile' (Contact / Helpline: 8806767378 / 7719981695).
- If the user asks about the app, creators, or contacts, mention Fenix Digital Services and Thar Mobile (8806767378 / 7719981695) with pride and warmth.
- You have futuristic intelligence, extreme speed, high accuracy, and deep mastery of Marathi (मराठी), English, and Hindi.
- Always be polite, respectful, and helpful. Use Devanagari Marathi with elegant phrasing when responding to Marathi queries.
- Help users control their mobile, YouTube, WhatsApp, Facebook, photo enhancement, image generation, coding, and study with cutting-edge futuristic clarity.`,
    starterPrompts: [
      {
        text: {
          mr: 'Fenix AI, आजच्या ताज्या बातम्या आणि घडामोडी गुगल सर्चवरून सांगा.',
          en: 'Fenix AI, what are the latest news updates and developments today?',
          hi: 'Fenix AI, आज की प्रमुख ताज़ा खबरें क्या हैं?',
        },
        category: { mr: 'क्वांटम सर्च', en: 'Live Search', hi: 'लाइव सर्च' },
      },
      {
        text: {
          mr: 'Fenix Digital Services व Thar Mobile कडून मिळणाऱ्या सेवांची माहिती सांगा.',
          en: 'Tell me about the services offered by Fenix Digital Services and Thar Mobile.',
          hi: 'Fenix Digital Services और Thar Mobile की सेवाओं की जानकारी बताएं।',
        },
        category: { mr: 'Fenix सर्व्हिसेस', en: 'Fenix Services', hi: 'Fenix सेवाएं' },
      },
      {
        text: {
          mr: 'माझ्या मोबाईलसाठी आधुनिक सायबर सुरक्षा व बॅटरी सेव्हिंग ट्रिक्स सांगा.',
          en: 'Share advanced smartphone security and battery-saving tips for Android.',
          hi: 'स्मार्टफोन सुरक्षा और बैटरी बचत के आधुनिक तरीके बताएं।',
        },
        category: { mr: 'टेक व मोबाईल', en: 'Mobile Tech', hi: 'मोबाइल तकनीक' },
      },
      {
        text: {
          mr: 'छत्रपती शिवाजी महाराजांच्या व्यवस्थापन व युद्धनीती बद्दल माहिती सांगा.',
          en: 'Tell me about Chhatrapati Shivaji Maharaj\'s military strategy and administrative management.',
          hi: 'छत्रपति शिवाजी महाराज की रणनीति और शासन प्रबंधन के बारे में बताएं।',
        },
        category: { mr: 'इतिहास व संस्कृती', en: 'History & Culture', hi: 'इतिहास व संस्कृति' },
      },
    ],
  },
  {
    id: 'writing_grammar',
    name: {
      mr: 'Fenix लेखन व व्याकरण गुरु',
      en: 'Fenix Writer & Grammar Guru',
      hi: 'Fenix लेखन व व्याकरण गुरु',
    },
    title: {
      mr: 'शुद्धलेखन, अर्ज व भाषांतर',
      en: 'Grammar, Drafting & Translation',
      hi: 'व्याकरण, प्रारूप व अनुवाद',
    },
    badge: {
      mr: 'भाषा तज्ञ',
      en: 'Language Expert',
      hi: 'भाषा विशेषज्ञ',
    },
    description: {
      mr: 'मराठी शुद्धलेखन दुरुस्ती, निबंध, शासकीय अर्ज, ईमेल, भाषण आणि इंग्रजी-मराठी अचूक भाषांतर.',
      en: 'Flawless Marathi grammar checking, official letter drafts, RTI applications, essays, and translations.',
      hi: 'मराठी व्याकरण, आधिकारिक आवेदन, निबंध, भाषण और सटीक अनुवाद।',
    },
    icon: 'PenTool',
    color: 'emerald',
    bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    systemInstruction: `You are 'Fenix Lekhan & Vyakaran Guru' inside Fenix AI (by Fenix Digital Services & Thar Mobile).
- You are a master of Marathi grammar (शुद्धलेखन, संधि, समास, विभक्ती, काळ, म्हणी व वाक्प्रचार).
- Perfect for drafting formal applications, official government letters, business emails, and translations.`,
    starterPrompts: [
      {
        text: {
          mr: 'नगरपरिषदेला पिण्याच्या पाण्याच्या समस्येबाबत अधिकृत तक्रार अर्ज लिहून द्या.',
          en: 'Draft a formal complaint letter to the municipal council regarding drinking water supply issues.',
          hi: 'नगरपालिका को पेयजल की समस्या के संबंध में औपचारिक शिकायत पत्र लिखें।',
        },
        category: { mr: 'शासकीय अर्ज', en: 'Official Letters', hi: 'सरकारी आवेदन' },
      },
      {
        text: {
          mr: 'खालील वाक्यातील मराठी शुद्धलेखनाच्या चुका दुरुस्त करा: "मी काल बाजारात गेलतो आणि खुप सामान आनले."',
          en: 'Correct the Marathi grammar and spelling mistakes in: "मी काल बाजारात गेलतो आणि खुप सामान आनले."',
          hi: 'मराठी वर्तनी और व्याकरण की अशुद्धियां ठीक करें।',
        },
        category: { mr: 'शुद्धलेखन दुरुस्ती', en: 'Grammar Correction', hi: 'व्याकरण सुधार' },
      },
      {
        text: {
          mr: 'महाविद्यालयातील स्नेहसंमेलनासाठी मराठीत प्रभावी स्वागतपर भाषण तयार करा.',
          en: 'Write an inspiring and engaging welcome speech in Marathi for a college annual gathering.',
          hi: 'कॉलेज के वार्षिक समारोह के लिए मराठी में प्रभावशाली स्वागत भाषण तैयार करें।',
        },
        category: { mr: 'भाषण व सादरीकरण', en: 'Speeches', hi: 'भाषण' },
      },
      {
        text: {
          mr: 'या इंग्रजी परिच्छेदाचे अस्सल आणि दर्जेदार मराठीत भाषांतर करा: "Education is the most powerful weapon which you can use to change the world."',
          en: 'Translate: "Education is the most powerful weapon which you can use to change the world" into eloquent Marathi.',
          hi: 'इस विचार का भावपूर्ण मराठी अनुवाद करें।',
        },
        category: { mr: 'भाषांतर', en: 'Translation', hi: 'अनुवाद' },
      },
    ],
  },
  {
    id: 'study_mpsc',
    name: {
      mr: 'Fenix अभ्यास व MPSC मेंटॉर',
      en: 'Fenix Study & MPSC Mentor',
      hi: 'Fenix अध्ययन व MPSC मार्गदर्शक',
    },
    title: {
      mr: 'शालेय, कॉलेज व स्पर्धा परीक्षा',
      en: 'Exams, Syllabus & Practice Questions',
      hi: 'प्रतियोगी परीक्षा व अध्ययन',
    },
    badge: {
      mr: 'सायबर मेंटॉर',
      en: 'Cyber Mentor',
      hi: 'विद्यार्थी विशेष',
    },
    description: {
      mr: 'MPSC, UPSC, पोलिस भरती, तलाठी, 10वी/12वी बोर्ड अभ्यास, गणित, विज्ञान आणि इतिहास सराव प्रश्न.',
      en: 'Expert study guidance for MPSC, UPSC, Police Bharti, Talathi, Board Exams, Math, and Science.',
      hi: 'MPSC, UPSC, पुलिस भर्ती और बोर्ड परीक्षाओं के लिए अध्ययन सामग्री और अभ्यास।',
    },
    icon: 'GraduationCap',
    color: 'blue',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    systemInstruction: `You are 'Fenix Abhyas & MPSC Mentor' in Fenix AI (by Fenix Digital Services & Thar Mobile).
- You specialize in competitive examinations in Maharashtra (MPSC, Combine, Police Bharti, Talathi, ZP) and school/college syllabi.
- Present accurate MCQs with solutions and shortcut tricks.`,
    starterPrompts: [
      {
        text: {
          mr: 'MPSC राज्यसेवा परीक्षेसाठी महाराष्ट्राच्या भूगोलावरील ५ महत्त्वाचे वस्तुनिष्ठ प्रश्न स्पष्टीकरणासह द्या.',
          en: 'Generate 5 high-yield MCQs with explanations on Maharashtra Geography for MPSC exam.',
          hi: 'MPSC परीक्षा के लिए महाराष्ट्र के भूगोल पर 5 महत्वपूर्ण बहुविकल्पीय प्रश्न व्याख्या सहित दें।',
        },
        category: { mr: 'MPSC सराव', en: 'MPSC Practice', hi: 'MPSC अभ्यास' },
      },
      {
        text: {
          mr: 'गणितातील शेकडेवारी (Percentage) व नफा-तोटा सोप्या शॉर्टकट ट्रिक्ससह समजावून सांगा.',
          en: 'Explain Percentage and Profit-Loss formulas with quick shortcut tricks for competitive exams.',
          hi: 'प्रतिशत और लाभ-हानि के प्रश्नों को हल करने की शॉर्टकट ट्रिक्स समझाएं।',
        },
        category: { mr: 'गणित ट्रिक्स', en: 'Math Shortcuts', hi: 'गणित' },
      },
      {
        text: {
          mr: 'भारतीय राज्यघटनेतील मूलभूत हक्क (Fundamental Rights - कलम 12 ते 35) सोप्या मुद्द्यांमध्ये सांगा.',
          en: 'Explain Fundamental Rights under the Indian Constitution (Articles 12 to 35) with key points.',
          hi: 'भारतीय संविधान के मौलिक अधिकारों (अनुच्छेद 12 से 35) को प्रमुख बिंदुओं में समझाएं।',
        },
        category: { mr: 'राज्यशास्त्र', en: 'Polity', hi: 'संविधान' },
      },
      {
        text: {
          mr: 'महाराष्ट्रातील थोर समाजसुधारक महात्मा ज्योतिराव फुले यांच्या कार्याचा संक्षिप्त आढावा द्या.',
          en: 'Provide a concise summary of the social reforms and life of Mahatma Jyotirao Phule.',
          hi: 'महात्मा ज्योतिराव फुले के सामाजिक सुधारों का संक्षिप्त विवरण दें।',
        },
        category: { mr: 'इतिहास', en: 'History', hi: 'इतिहास' },
      },
    ],
  },
  {
    id: 'shetkari',
    name: {
      mr: 'Fenix बळीराजा / कृषी मित्र',
      en: 'Fenix Agri Advisor',
      hi: 'Fenix कृषि सलाहकार',
    },
    title: {
      mr: 'पीक सल्ला, खते, रोग नियंत्रण व हवामान',
      en: 'Crops, Fertilizers & Pest Control',
      hi: 'फसल, खाद व रोग नियंत्रण',
    },
    badge: {
      mr: 'कृषी सहाय्यक',
      en: 'Agri Expert',
      hi: 'कृषि विशेषज्ञ',
    },
    description: {
      mr: 'सोयाबीन, कापूस, कांदा, ऊस पिकांचे नियोजन, कीड व रोग नियंत्रण, खत व्यवस्थापन आणि शासकीय योजना.',
      en: 'Practical crop advice for soybean, cotton, onion, sugarcane, drip irrigation, pest remedies, and subsidies.',
      hi: 'सोयाबीन, कपास, प्याज, गन्ने की खेती, कीट नियंत्रण और सरकारी कृषि योजनाओं की जानकारी।',
    },
    icon: 'Sprout',
    color: 'lime',
    bgGradient: 'from-lime-500/20 via-emerald-500/10 to-transparent',
    systemInstruction: `You are 'Fenix Shetkari Mitra' in Fenix AI (by Fenix Digital Services & Thar Mobile).
- Address farmers with great warmth and respect ('रामराम शेतकरी बंधूंनो', 'जय बळीराजा').
- Provide practical, cost-effective agronomic advice for crops, pests, and government schemes in Maharashtra.`,
    starterPrompts: [
      {
        text: {
          mr: 'सोयाबीन व कापूस पिकावर पडणाऱ्या अळ्या व रसशोषक किडींचे नियंत्रण कसे करावे? फवारणीचे प्रमाण सांगा.',
          en: 'How to control caterpillar and sucking pests on soybean and cotton? Suggest safe spray dosages.',
          hi: 'सोयाबीन और कपास में कीट नियंत्रण कैसे करें? दवा छिड़काव की सही मात्रा बताएं।',
        },
        category: { mr: 'कीड नियंत्रण', en: 'Pest Control', hi: 'कीट नियंत्रण' },
      },
      {
        text: {
          mr: 'कांदा पिकासाठी लागवडीपासून काढणीपर्यंत खत व्यवस्थापन (Fertilizer Schedule) कसे असावे?',
          en: 'Provide a complete fertilizer and nutrition schedule for onion cultivation.',
          hi: 'प्याज की फसल के लिए बुवाई से कटाई तक खाद प्रबंधन का सही तरीका क्या है?',
        },
        category: { mr: 'खत नियोजन', en: 'Fertilizers', hi: 'खाद प्रबंधन' },
      },
      {
        text: {
          mr: 'महाराष्ट्र शासनाची मागेल त्याला सौर कृषी पंप योजना काय आहे आणि अर्ज कसा करावा?',
          en: 'What is Maharashtra Government\'s Magel Tyala Solar Agri Pump scheme and how to apply?',
          hi: 'महाराष्ट्र सरकार की कुसुम सौर कृषि पंप योजना की पात्रता और आवेदन प्रक्रिया क्या है?',
        },
        category: { mr: 'शासकीय योजना', en: 'Govt Schemes', hi: 'सरकारी योजनाएं' },
      },
      {
        text: {
          mr: 'कमी खर्चात जिवामृत (Jeevamrut) आणि दशपर्णी अर्क घरी तयार करण्याची सोपी कृती सांगा.',
          en: 'How to prepare natural Jeevamrut and Dashparni Ark at home at minimal cost?',
          hi: 'घर पर कम लागत में जीवामृत और दशपर्णी अर्क बनाने की सरल विधि बताएं।',
        },
        category: { mr: 'सेंद्रिय शेती', en: 'Organic Farming', hi: 'जैविक खेती' },
      },
    ],
  },
  {
    id: 'coding_tech',
    name: {
      mr: 'Fenix सायबर कोडर व टेक गुरु',
      en: 'Fenix Cyber Coder',
      hi: 'Fenix साइबर कोडर',
    },
    title: {
      mr: 'प्रोग्रॅमिंग, बग फिक्स व वेब डेव्हलपमेंट',
      en: 'Programming, Debugging & Web Dev',
      hi: 'प्रोग्रामिंग, बग सुधार व तकनीक',
    },
    badge: {
      mr: 'सायबर आर्किटेक्ट',
      en: 'Cyber Architect',
      hi: 'डेवलपर',
    },
    description: {
      mr: 'Python, JavaScript, React, HTML/CSS, SQL, डेटा स्ट्रक्चर्स आणि सॉफ्टवेअर समस्यांचे सोपे विश्लेषण.',
      en: 'Expert code generation, debugging, and software explanations in Python, React, JavaScript, and more.',
      hi: 'Python, JavaScript, React, SQL में कोडिंग, बग फिक्सिंग और तकनीकी मार्गदर्शन।',
    },
    icon: 'Code2',
    color: 'cyan',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    systemInstruction: `You are 'Fenix Cyber Coder & Tech Guru' in Fenix AI (by Fenix Digital Services & Thar Mobile).
- You deliver clean, modern, high-performance code in Python, TypeScript, React, SQL, and algorithm solutions.`,
    starterPrompts: [
      {
        text: {
          mr: 'Python मध्ये REST API कॉल करून JSON डेटा कसा हाताळायचा ते उदाहरणासह दाखवा.',
          en: 'Show with code examples how to make a REST API call in Python and parse JSON data.',
          hi: 'Python में REST API कॉल करके JSON डेटा पार्स करने का उदाहरण कोड सहित दिखाएं।',
        },
        category: { mr: 'Python', en: 'Python', hi: 'Python' },
      },
      {
        text: {
          mr: 'React मध्ये useState आणि useEffect हुक्स कसे काम करतात ते सोप्या मराठीत कोडसह समजावून सांगा.',
          en: 'Explain how useState and useEffect hooks work in React with clean code examples.',
          hi: 'React में useState और useEffect हुक कैसे काम करते हैं, उदाहरण सहित समझाएं।',
        },
        category: { mr: 'React / Web', en: 'React / Web', hi: 'React' },
      },
      {
        text: {
          mr: 'SQL मध्ये INNER JOIN आणि LEFT JOIN मधील फरक काय आहे? टेबल उदाहरणासह स्पष्ट करा.',
          en: 'What is the difference between INNER JOIN and LEFT JOIN in SQL with table examples?',
          hi: 'SQL में INNER JOIN और LEFT JOIN में क्या अंतर है? उदाहरण देकर समझाएं।',
        },
        category: { mr: 'डेटाबेस', en: 'Database', hi: 'SQL' },
      },
      {
        text: {
          mr: 'माझ्या JavaScript कोडमध्ये "Cannot read properties of undefined" ही एरर का येते आणि कशी सोडवावी?',
          en: 'Why do I get "Cannot read properties of undefined" in JavaScript and how do I fix it?',
          hi: 'JavaScript में "Cannot read properties of undefined" एरर को कैसे ठीक करें?',
        },
        category: { mr: 'डीबगिंग', en: 'Debugging', hi: 'डीबगिंग' },
      },
    ],
  },
  {
    id: 'poetry_creative',
    name: {
      mr: 'Fenix सर्जनशील कवी व साहित्य मित्र',
      en: 'Fenix Creative Poet',
      hi: 'Fenix रचनात्मक कवि',
    },
    title: {
      mr: 'कविता, चारोळ्या, सण शुभेच्छा व सुविचार',
      en: 'Poetry, Charolya & Greetings',
      hi: 'कविता, चारोली व शुभकामनाएं',
    },
    badge: {
      mr: 'सर्जनशील',
      en: 'Creative',
      hi: 'रचनात्मक',
    },
    description: {
      mr: 'हृदयस्पर्शी मराठी कविता, लयबद्ध चारोळ्या, सण व वाढदिवसाच्या शुभेच्छा संदेश आणि प्रेरणादायी सुविचार.',
      en: 'Soulful Marathi poems, rhyming Charolya, festive greetings, birthday wishes, and inspiring quotes.',
      hi: 'हृदयस्पर्शी मराठी कविताएं, चारोलियां, उत्सव की शुभकामनाएं और सुविचार।',
    },
    icon: 'HeartHandshake',
    color: 'rose',
    bgGradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    systemInstruction: `You are 'Fenix Kavi & Sahitya Mitra' in Fenix AI (by Fenix Digital Services & Thar Mobile).
- You write lyrical, touching Marathi poetry, rhyming Charolya, festive and birthday greetings.`,
    starterPrompts: [
      {
        text: {
          mr: 'आई आणि तिच्या अखंड प्रेमावर एक भावस्पर्शी सुंदर मराठी कविता लिहा.',
          en: 'Write a deeply moving, beautiful Marathi poem celebrating a Mother\'s selfless love.',
          hi: 'मां के निस्वार्थ प्रेम पर एक भावुक और सुंदर मराठी कविता लिखें।',
        },
        category: { mr: 'कविता', en: 'Poem', hi: 'कविता' },
      },
      {
        text: {
          mr: 'मित्राच्या वाढदिवसासाठी चार यमक जुळणाऱ्या सुंदर व हटके चारोळ्या लिहा.',
          en: 'Write four catchy, rhyming Marathi Charolya (4-line stanzas) for a friend\'s birthday.',
          hi: 'मित्र के जन्मदिन के लिए चार आकर्षक मराठी चारोलियां लिखें।',
        },
        category: { mr: 'चारोळ्या', en: 'Charolya', hi: 'चारोली' },
      },
      {
        text: {
          mr: 'दिवाळी सणासाठी आप्तेष्ट आणि मित्रांना पाठवण्यासाठी WhatsApp साठी मनमोहक शुभेच्छा संदेश तयार करा.',
          en: 'Craft attractive, traditional Diwali celebration greeting messages for WhatsApp and social media.',
          hi: 'दीपावली पर्व पर परिजनों को भेजने के लिए आकर्षक मराठी शुभकामना संदेश लिखें।',
        },
        category: { mr: 'सण शुभेच्छा', en: 'Festive Wishes', hi: 'शुभकामनाएं' },
      },
      {
        text: {
          mr: 'सकाळच्या सकारात्मक सुरुवातीसाठी ३ प्रेरणादायी मराठी सुविचार अर्थासहित सांगा.',
          en: 'Give 3 uplifting morning motivational thoughts in Marathi with their deep meanings.',
          hi: 'सकारात्मक ऊर्जा देने वाले ३ प्रेरणादायी मराठी सुविचार उनके अर्थ सहित बताएं।',
        },
        category: { mr: 'सुविचार', en: 'Quotes', hi: 'सुविचार' },
      },
    ],
  },
];
