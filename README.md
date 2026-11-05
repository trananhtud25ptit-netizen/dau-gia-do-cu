# WEBSITE ĐẤU GIÁ CHỢ ĐỒ CŨ PTIT (SECOND-HAND AUCTION)
Bài tập lớn cuối kỳ - Học viện Công nghệ Bưu chính Viễn thông (PTIT)

## 1. Giới thiệu dự án
Ứng dụng web fullstack hỗ trợ người dùng đăng bán các mặt hàng đồ cũ (máy ảnh film, đàn guitar, đồng hồ cơ, xe đạp cổ...) và tham gia trả giá trực tuyến. Hệ thống hoàn thiện đầy đủ 5 mục bắt buộc và mục 6 nâng cao theo yêu cầu kỹ thuật của học phần.

## 2. Công nghệ sử dụng
- **Frontend**: React (Vite), React Router DOM, Tailwind CSS (giao diện responsive trên Desktop & Mobile) với 6 màn hình chức năng.
- **Quản lý State**:
  - `React Context API` (`AuthContext.jsx`): Quản lý trạng thái đăng nhập và thông tin người dùng.
  - `Redux Toolkit` (`store.js`): Quản lý danh sách phiên đấu giá và lịch sử đặt giá.
- **Backend**: Node.js, Express.js, thiết kế REST API đúng HTTP method, mã trạng thái chuẩn và có middleware xử lý lỗi tập trung (`authErrorMiddleware.js`).
- **Cơ sở dữ liệu**: MongoDB & Mongoose gồm 4 collections có quan hệ tham chiếu (`ref`): `User`, `Category`, `Auction`, `Bid`.
- **Nâng cao**: Xác thực bằng `JWT`, mã hóa mật khẩu với `bcryptjs`, phân quyền người dùng (`user` / `admin`).

## 3. Phân công công việc theo chức năng (Khớp lịch sử Commit Git)
Mỗi thành viên phụ trách trọn vẹn một chức năng từ **Giao diện → API → Cơ sở dữ liệu** và đều có đủ các thao tác **Thêm, Sửa, Xóa (CRUD)**:

| Thành viên | Chức năng phụ trách | File Giao diện (Frontend) | File API & Middleware (Backend) | Model CSDL |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Trần Anh Tú** <br>(TV1) | **Hệ thống & Xác thực (Auth & Security)** | • Khởi tạo repository Git và khung cấu trúc dự án.<br>• Thiết kế User Schema, viết API Đăng ký (`/api/auth/register`), Đăng nhập (`/api/auth/login`) tích hợp `bcrypt` và `JWT`.<br>• Viết Middleware xử lý lỗi tập trung (`errorHandler`) và Middleware xác thực token (`verifyToken`).<br>• Xây dựng giao diện Form Đăng nhập/Đăng ký (Responsive), `AuthContext`, và `ProtectedRoute`. |
| **2** | **Vũ Duy Anh** <br>(TV2) | **Quản lý Sản phẩm Đấu giá (Products)** | • Thiết kế Product Schema liên kết với Users.<br>• Viết các API CRUD sản phẩm (`POST`, `PUT`, `DELETE /api/products`) yêu cầu qua `verifyToken`.<br>• Viết logic validate dữ liệu đầu vào (giá khởi điểm > 0, thời gian kết thúc > thời gian hiện tại).<br>• Xây dựng giao diện Trang đăng bán sản phẩm và Trang quản lý cá nhân (Sửa/Xóa sản phẩm đã đăng). |
| **3** | **Ngô Quốc Việt** <br>(TV3) | **Luồng Đấu giá thời gian thực (Bidding)** | • Thiết kế Bid Schema (lưu trữ lịch sử đặt giá, số tiền, người đặt).<br>• Viết API Đặt giá (`POST /api/bids`) kiểm tra thời gian đấu giá và bước giá hợp lệ.<br>• Xây dựng logic tự động cập nhật trường `currentPrice` của sản phẩm khi có lượt đặt giá cao hơn.<br>• Xây dựng giao diện Trang chi tiết sản phẩm tích hợp đồng hồ đếm ngược (Countdown Timer) và lịch sử bid. |
| **4** | **Đỗ Viết Anh Khôi** <br>(TV4) | **Bộ lọc, Lịch sử & Thống kê (Dashboard)** | • Nâng cấp API lấy danh sách sản phẩm (`GET /api/products`) hỗ trợ tìm kiếm theo tên, lọc khoảng giá và phân trang.<br>• Viết API trả về lịch sử hoạt động cá nhân (`GET /api/users/dashboard`) gồm các sản phẩm đã tham gia đấu giá và đã thắng.<br>• Thiết kế Trang chủ với thanh tìm kiếm và bộ lọc.<br>• Thiết lập quản lý state bộ lọc bằng Zustand/Redux và xây dựng Trang lịch sử cá nhân. |

---
## 4. Danh sách REST API chính
### Chức năng 1: Người dùng & Xác thực (`/api/users` - Trần Anh Tú)
- `POST /api/users/register` : Đăng ký tài khoản mới (Thêm)
- `POST /api/users/login` : Đăng nhập và nhận JWT Token
- `GET /api/users/profile` : Xem thông tin hồ sơ cá nhân (Đọc)
- `PUT /api/users/profile` : Cập nhật thông tin cá nhân & mật khẩu (Sửa)
- `DELETE /api/users/profile` : Xóa tài khoản cá nhân (Xóa)
### Chức năng 2: Tin đăng Đấu giá (`/api/auctions` - Vũ Duy Anh)
- `GET /api/auctions` : Lấy danh sách sản phẩm (hỗ trợ lọc theo danh mục & từ khóa)
- `GET /api/auctions/:id` : Xem chi tiết 1 sản phẩm đấu giá
- `POST /api/auctions` : Đăng tin đấu giá đồ cũ mới (Thêm)
- `PUT /api/auctions/:id` : Chỉnh sửa thông tin bài đăng (Sửa)
- `DELETE /api/auctions/:id` : Xóa bài đăng đấu giá (Xóa)
### Chức năng 3: Đặt giá (`/api/bids` - Ngô Quốc Việt)
- `GET /api/bids/auction/:auctionId` : Xem lịch sử trả giá của sản phẩm
- `POST /api/bids` : Đặt mức giá mới cao hơn giá hiện tại + bước giá (Thêm)
- `PUT /api/bids/:id` : Sửa ghi chú lượt đặt giá của bản thân (Sửa)
- `DELETE /api/bids/:id` : Rút lại lượt đặt giá và cập nhật lại giá dẫn đầu (Xóa)
### Chức năng 4: Quản trị & Danh mục (`/api/admin` - Đỗ Viết Anh Khôi)
- `GET /api/admin/categories` : Lấy danh sách danh mục đồ cũ
- `POST /api/admin/categories` : Tạo danh mục mới (Thêm - Admin)
- `PUT /api/admin/categories/:id` : Cập nhật danh mục (Sửa - Admin)
- `DELETE /api/admin/categories/:id` : Xóa danh mục (Xóa - Admin)
- `PUT /api/admin/auctions/:id/status` : Duyệt hoặc từ chối bài đăng đấu giá (Admin)
- `GET /api/admin/stats` : Thống kê tổng quan hệ thống (Admin)

## 5. Hướng dẫn cài đặt và chạy chương trình
### Yêu cầu môi trường
- Node.js (v18 trở lên)
- MongoDB (chạy local tại `mongodb://127.0.0.1:27017` hoặc MongoDB Atlas)

### Bước 1: Cài đặt và khởi chạy Backend
1. Mở Terminal, di chuyển vào thư mục `backend` và cài đặt thư viện:
```bash
cd backend
npm install
```
2. Tạo file `.env` trong thư mục `backend` (không commit file `.env` lên Git) với nội dung:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chodocu_ptit
JWT_SECRET=ptit_chodocu_secret_key_2026
```
3. Khởi tạo dữ liệu mẫu (gồm 4 tài khoản thành viên, 4 danh mục và 6 sản phẩm đồ cũ kèm hình ảnh):
```bash
node seed.js
```
4. Chạy server Backend:
```bash
npx nodemon server.js
```

### Bước 2: Cài đặt và khởi chạy Frontend
1. Mở một cửa sổ Terminal mới, di chuyển vào thư mục `frontend` và cài đặt thư viện:
```bash
cd frontend
npm install
```
2. Khởi chạy giao diện người dùng:
```bash
npm run dev
```
3. Mở trình duyệt tại địa chỉ:
## 6. Tài khoản dùng thử (Sau khi chạy `node seed.js`)
- **Tài khoản Admin**: `admin@ptit.edu.vn` | Mật khẩu: `123456`
- **Tài khoản Người dùng**: `viet@ptit.edu.vn` hoặc `khoi@ptit.edu.vn` | Mật khẩu: `123456`
