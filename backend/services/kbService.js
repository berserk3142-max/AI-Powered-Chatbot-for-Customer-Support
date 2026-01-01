const knowledgeBase = {
    refund: {
        keywords: ["refund", "money back", "return money", "get refund"],
        response: "💰 **Refund Policy**: You can request a full refund within 7 days of purchase. After 7 days, partial refunds may be available based on usage. To initiate a refund, go to Settings → Billing → Request Refund, or contact our support team.",
        category: "billing"
    },

    pricing: {
        keywords: ["pricing", "price", "cost", "how much", "subscription", "plans"],
        response: "💎 **Our Pricing Plans**:\n\n• **Starter**: ₹499/month - Up to 1,000 messages\n• **Pro**: ₹1,499/month - Unlimited messages + Analytics\n• **Enterprise**: Custom pricing - Dedicated support + API access\n\nAll plans include a 14-day free trial!",
        category: "sales"
    },

    support: {
        keywords: ["support hours", "working hours", "available", "contact", "help hours"],
        response: "🕐 **Support Availability**: Our AI assistant is available 24/7! For human support:\n\n• **Chat**: 9 AM - 9 PM IST\n• **Email**: 24-48 hour response\n• **Phone**: 10 AM - 6 PM IST (Mon-Fri)",
        category: "support"
    },

    account: {
        keywords: ["account", "login", "password", "sign in", "access", "locked"],
        response: "🔐 **Account Help**:\n\n• **Forgot Password**: Click 'Forgot Password' on login page\n• **Account Locked**: Wait 30 minutes or contact support\n• **Update Email**: Go to Settings → Profile → Email\n\nNeed more help? Our team is here for you!",
        category: "account"
    },

    features: {
        keywords: ["features", "what can", "capabilities", "do you"],
        response: "✨ **Key Features**:\n\n• 🤖 AI-powered instant responses\n• 💬 Real-time chat messaging\n• 📊 Analytics dashboard\n• 🔒 Secure conversations\n• 🌐 Multi-language support\n• 📱 Mobile-friendly interface",
        category: "product"
    },

    integration: {
        keywords: ["integrate", "api", "webhook", "connect", "integration"],
        response: "🔗 **Integration Options**:\n\n• **REST API**: Full access to all features\n• **Webhooks**: Real-time event notifications\n• **SDKs**: JavaScript, Python, Node.js\n• **Zapier**: 1000+ app connections\n\nCheck our docs at docs.example.com",
        category: "technical"
    },

    privacy: {
        keywords: ["privacy", "data", "gdpr", "security", "safe", "secure"],
        response: "🛡️ **Privacy & Security**:\n\n• All data is encrypted (AES-256)\n• GDPR compliant\n• SOC 2 Type II certified\n• Data stored in secure AWS servers\n• You can request data deletion anytime\n\nRead our full privacy policy at privacy.example.com",
        category: "legal"
    },

    greeting: {
        keywords: ["hello", "hi", "hey", "good morning", "good evening"],
        response: "👋 Hello! Welcome to our support chat. I'm here to help you with any questions about our product, pricing, account issues, or technical support. What can I help you with today?",
        category: "general"
    },

    thanks: {
        keywords: ["thank", "thanks", "appreciate", "helpful"],
        response: "😊 You're welcome! I'm glad I could help. Is there anything else you'd like to know? Feel free to ask anytime!",
        category: "general"
    },

    cancel: {
        keywords: ["cancel", "unsubscribe", "stop subscription", "end plan"],
        response: "📋 **Cancellation Process**:\n\nTo cancel your subscription:\n1. Go to Settings → Billing\n2. Click 'Manage Subscription'\n3. Select 'Cancel Plan'\n\nYou'll retain access until the end of your billing period. We'd love to know why you're leaving - your feedback helps us improve!",
        category: "billing"
    }
};

exports.searchKB = (query) => {
    const normalizedQuery = query.toLowerCase().trim();

    for (const [key, entry] of Object.entries(knowledgeBase)) {
        const hasMatch = entry.keywords.some(keyword => {
            const lowerKeyword = keyword.toLowerCase();
            const regex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(normalizedQuery);
        });

        if (hasMatch) {
            return {
                key,
                response: entry.response,
                category: entry.category,
                source: "kb"
            };
        }
    }

    return null;
};

exports.getCategories = () => {
    const categories = {};
    for (const [key, entry] of Object.entries(knowledgeBase)) {
        if (!categories[entry.category]) {
            categories[entry.category] = [];
        }
        categories[entry.category].push(key);
    }
    return categories;
};

exports.getStats = () => {
    return {
        totalEntries: Object.keys(knowledgeBase).length,
        categories: Object.keys(exports.getCategories()).length,
        keywords: Object.values(knowledgeBase).reduce(
            (acc, entry) => acc + entry.keywords.length, 0
        )
    };
};
