# 🎉 Eşleştirme Uygulaması

**Hoş geldiniz!** Çevrenizdeki insanlar ile eşleşip konuşup tanışabileceğiniz bir SaaS platformu

---

## 🚀 Proje Özellikleri

- **Kullanıcı Paneli**: Kullanıcıların kolay bir şekilde kendi bilgilerini güncelleyebilmesi için tasarlanmıştır.
- **Modern Tasarım**: Shadcn ile modern arayüz tasarımı.
- **Node.js Backend**: Güvenli ve verimli bir sunucu yapısı ile hızlı veri işleme.
- **Docker ile Kolay Dağıtım**: Projenin her ortamda sorunsuz çalışmasını sağlamak için Docker kullanıldı.

---

## 📦 Teknolojiler

| Katman      | Teknolojiler                  |
|-------------|-------------------------------|
| **Frontend**  | React, Shadcn               | 
| **Backend**   | Node.js,Express,Socket.IO   |
| **Veritabanı**| MongoDB                     |
| **Konteyner** | Docker                      |
| **Ödeme**     | Stripe                      |

---

## 📈 Hedef

İnsanları tanıştıran sosyalleşmelerini sağlayan bir SaaS platformu yapmayı sağladım

---

## 🔗 Bağlantılar

- **Canlı Demo**: https://matches-2kf0.onrender.com
- **Youtube Video**: https://www.youtube.com/watch?v=LUw9PkQTWYU

---

---

## ⚙️ Projeyi Çalıştırmak İçin
1. **İlk önce repoyu kendinize çekin:**
```bash
git clone https://github.com/utkbkts/matches.git
```
2.**Proje dizinine gelin ve gerekli bağımlılıkları yükleyin:**
 ```bash
cd frontend
npm install
```
3.**Projeyi çalıştırın:**
 ```bash
npm run dev
```
4.**Yerel olarak derleyin:**
```bash
npm run build
```
5.**.env-Backend**
```bash
MONGODB_URI=""

STRIPE_SECRET_KEY=""

FRONTEND_URL=""


PORT=""

JWT_SECRET=""

JWT_EXPIRES_TIME=""

COOKIE_EXPIRES_TIME=""

CLOUDINARY_CLOUD_NAME=""

CLOUDINARY_API_KEY=""

CLOUDINARY_API_SECRET=""
STRIPE_WEBHOOK_SECRET=""

VITE_REACT_APP_BASE_URL=""

ALPHABET=asgasgasgsagasgasg32t23t
```
5.**Docker'ı çalıştırmak için**

1-**Ana dizine gidin /** - build
```bash
docker compose build
```
2-**Ana dizine gidin /** - run
```bash
docker compose up -d
```
