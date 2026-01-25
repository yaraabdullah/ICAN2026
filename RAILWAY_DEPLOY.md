# Railway Deployment Guide

## خطوات النشر على Railway

### 1. إعداد المشروع

المشروع جاهز الآن للنشر على Railway. تم تحديث:
- ✅ جميع استدعاءات API لاستخدام URL ديناميكي
- ✅ إضافة Procfile
- ✅ إضافة railway.json
- ✅ إضافة .railwayignore

### 2. إنشاء حساب على Railway

1. اذهب إلى [railway.app](https://railway.app)
2. سجل دخول باستخدام GitHub
3. أنشئ مشروع جديد (New Project)

### 3. ربط المشروع

**الطريقة الأولى: من GitHub**
1. في Railway، اختر "Deploy from GitHub repo"
2. اختر المستودع الخاص بك
3. Railway سيكتشف تلقائياً أنه مشروع Node.js

**الطريقة الثانية: من الملفات**
1. في Railway، اختر "Empty Project"
2. اضغط على "Add Service" → "GitHub Repo"
3. اختر المستودع الخاص بك

### 4. إعداد متغيرات البيئة (Environment Variables)

في Railway Dashboard، اذهب إلى Variables tab وأضف:

```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=4000
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
```

**ملاحظات مهمة:**
- `GEMINI_API_KEY`: مطلوب - احصل عليه من [Google AI Studio](https://makersuite.google.com/app/apikey)
- `PORT`: Railway يضبطه تلقائياً، لكن يمكنك تحديده
- `EMAIL_USER`, `EMAIL_PASS`, `SMTP_HOST`, `SMTP_PORT`: اختياري - فقط إذا كنت تريد إرسال البريد الإلكتروني

### 5. النشر

1. Railway سيبدأ البناء تلقائياً
2. انتظر حتى يكتمل البناء
3. سيتم نشر التطبيق تلقائياً

### 6. الحصول على الرابط

1. بعد النشر، اذهب إلى Settings
2. في قسم "Domains"، يمكنك:
   - استخدام الرابط الافتراضي (مثل: `your-app.up.railway.app`)
   - أو إضافة نطاق مخصص (Custom Domain)

### 7. اختبار التطبيق

افتح الرابط في المتصفح وتأكد من:
- ✅ الصفحة الرئيسية تظهر
- ✅ جميع الأدوات تعمل
- ✅ استدعاءات API تعمل بشكل صحيح

## استكشاف الأخطاء

### المشكلة: التطبيق لا يعمل
- تحقق من متغيرات البيئة (خاصة `GEMINI_API_KEY`)
- تحقق من Logs في Railway Dashboard

### المشكلة: استدعاءات API تفشل
- تأكد من أن `API_BASE_URL` يستخدم الرابط الصحيح
- تحقق من CORS settings في server.js

### المشكلة: البريد الإلكتروني لا يعمل
- تحقق من متغيرات SMTP
- تأكد من صحة بيانات البريد الإلكتروني

## تحديث التطبيق

عندما تدفع تغييرات جديدة إلى GitHub:
- Railway سيكتشف التغييرات تلقائياً
- سيبدأ بناء ونشر جديد تلقائياً

## معلومات إضافية

- Railway يقدم خطة مجانية مع 500 ساعة/شهر
- يمكنك ترقية الخطة حسب الحاجة
- جميع الملفات الحساسة (مثل .env) لا يتم رفعها بفضل .railwayignore

---

**ملاحظة**: تأكد من أن جميع الملفات الحساسة موجودة في .gitignore و .railwayignore



