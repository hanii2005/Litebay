# 🛒 Litebay - Website Thương Mại Điện Tử

Website thương mại điện tử demo dựa trên eBay, được xây dựng với React + Vite + TailwindCSS.

## ✨ Tính năng

- 🏠 **Trang chủ**: Banner slider, sản phẩm nổi bật, sản phẩm mới, tin tức
- 📦 **Sản phẩm**: Danh sách sản phẩm với bộ lọc, tìm kiếm, phân trang
- 🔍 **Chi tiết sản phẩm**: Hình ảnh, mô tả, đánh giá, thêm vào giỏ hàng
- 🛒 **Giỏ hàng**: Quản lý sản phẩm, tính tổng tiền, phí vận chuyển
- 💳 **Thanh toán**: Form đặt hàng với validation
- 📰 **Tin tức**: Danh sách tin tức, chi tiết bài viết, chia sẻ mạng xã hội
- ℹ️ **Giới thiệu**: Thông tin về Litebay
- 📞 **Liên hệ**: Form liên hệ với Google Maps
- 👤 **Đăng nhập/Đăng ký**: Quản lý người dùng (demo)

## 🚀 Công nghệ sử dụng

- **React 18** - UI Framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router DOM** - Routing
- **Zustand** - State management
- **React Hook Form + Yup** - Form validation
- **React Toastify** - Notifications
- **Swiper** - Banner slider
- **React Icons** - Icons

## 📦 Cài đặt

### Yêu cầu

- Node.js >= 16.x
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository hoặc tải xuống source code**

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy development server:**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt:**
   - Truy cập `http://localhost:3000`

## 🏗️ Build và Deploy

### Build cho production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`.

### Deploy lên Vercel

Có 2 cách để deploy lên Vercel:

#### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Đăng nhập vào [Vercel](https://vercel.com)**

2. **Tạo project mới:**
   - Click "Add New..." → "Project"
   - Import GitHub repository (hoặc upload code)
   - Vercel sẽ tự động detect Vite framework

3. **Cấu hình Build Settings:**
   - **Framework Preset**: Vite (tự động detect)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Vercel sẽ tự động build và deploy

#### Cách 2: Deploy qua Vercel CLI

1. **Cài đặt Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Đăng nhập:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Hoặc deploy production:
   ```bash
   vercel --prod
   ```

#### Lưu ý quan trọng:

- ✅ File `vercel.json` đã được cấu hình sẵn với:
  - Build command và output directory
  - SPA routing (rewrites)
  - Framework detection

- ✅ Đảm bảo tất cả dependencies đã được cài đặt trong `package.json`

- ✅ Sau khi deploy, kiểm tra:
  - Website có load được không
  - Routing hoạt động đúng (thử navigate giữa các trang)
  - Images và assets load đúng

#### Troubleshooting:

Nếu gặp lỗi build:
1. Kiểm tra Node.js version (>= 16.x)
2. Đảm bảo `npm install` chạy thành công
3. Kiểm tra build logs trên Vercel dashboard
4. Thử build local: `npm run build` để kiểm tra lỗi

## 📁 Cấu trúc dự án

```
litebay/
├── public/
│   ├── data/
│   │   ├── products.json      # Dữ liệu sản phẩm
│   │   ├── news.json          # Dữ liệu tin tức
│   │   └── categories.json    # Danh mục sản phẩm
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/            # React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── BannerSlider.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── NewsCard.jsx
│   │   └── ContactForm.jsx
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── News.jsx
│   │   ├── NewsDetail.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Login.jsx
│   ├── store/                # Zustand stores
│   │   ├── useCartStore.js
│   │   └── useUserStore.js
│   ├── utils/                # Utility functions
│   │   ├── storage.js
│   │   └── format.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

## 💾 Lưu trữ dữ liệu

Website sử dụng **localStorage** để lưu trữ:
- Giỏ hàng
- Thông tin người dùng
- Đơn hàng (demo)
- Liên hệ khách hàng
- Danh sách yêu thích
- Số lượt truy cập

## 🎨 Tính năng UI/UX

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO-friendly (meta tags, semantic HTML)
- ✅ Loading states
- ✅ Toast notifications
- ✅ Form validation
- ✅ Hover effects
- ✅ Smooth transitions
- ✅ Accessible components

## 📝 Ghi chú

- Đây là **frontend demo**, không có backend thật
- Tất cả dữ liệu được lưu trong **localStorage**
- Dữ liệu sản phẩm và tin tức được load từ file JSON
- Form validation sử dụng **React Hook Form + Yup**
- State management sử dụng **Zustand**

## 🔧 Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa file `tailwind.config.js`:

```js
colors: {
  primary: {
    // Thay đổi màu primary ở đây
  }
}
```

### Thêm sản phẩm

Chỉnh sửa file `public/data/products.json` và thêm object sản phẩm mới.

### Thêm tin tức

Chỉnh sửa file `public/data/news.json` và thêm object tin tức mới.

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và thương mại.

## 👨‍💻 Tác giả

Nhóm 2

---

**Lưu ý**: Đây là dự án demo, phù hợp cho mục đích học tập, portfolio và được xây dựng bằng AI.


