# 🐰🛡️ THỎ NGỌC - CHUYÊN GIA AN TOÀN CHO TRẺ EM
> **Chuyên gia an toàn của các bạn nhỏ**
> *"Học an toàn hôm nay - Cho ngày mai tươi sáng | Tự tin lớn khôn cùng Chuyên gia Thỏ Ngọc ❤️"*

---

## 🌟 Giới thiệu Web App Thỏ Ngọc

Ứng dụng Web App **Thỏ Ngọc** là trợ lý chuyên gia tương tác thông minh được thiết kế chuyên biệt cho học sinh và trẻ em nhằm trang bị kiến thức, kỹ năng nhận diện nguy hiểm và tự bảo vệ bản thân trong các tình huống thực tế:
1. **Phòng chống đuối nước 🛟**: Kỹ năng bơi an toàn, nổi ngửa tự cứu, ứng cứu bạn gặp nạn từ trên bờ, không tự ý tắm ao hồ sông suối.
2. **An toàn giao thông 🚦**: Quy tắc đi qua đường vạch kẻ bộ hành, đội mũ bảo hiểm đạt chuẩn, quan sát đèn tín hiệu.
3. **Phòng cháy chữa cháy 🧯**: Thoát hiểm trong khói độc, kỹ năng bò thấp bịt khăn ướt, tuyệt đối không dội nước vào đám cháy điện, gọi số cứu hỏa **114**.
4. **Phòng tránh tai nạn thương tích 🩹**: Xử lý khi bị hóc nghẹn (Heimlich), sơ cứu bỏng nước sôi đúng cách, kỹ năng đối phó khi gặp chó dữ, xử lý khi bị ong đốt.
5. **An toàn điện ⚡**: Không tự ý nghịch ổ cắm, không chạm vào điện khi tay ướt, tránh xa dây điện đứt và trạm biến áp.
6. **Đố vui an toàn 🎯**: Mini-game câu hỏi trắc nghiệm tương tác giúp các bạn nhỏ vừa chơi vừa học.
7. **Các số điện thoại khẩn cấp 📞**: Thuộc lòng **111** (Bảo vệ trẻ em), **114** (Cứu hỏa), **115** (Cấp cứu), **113** (Công an).

---

## 📁 Cấu trúc thư mục ứng dụng

```
chatbot PCTTTT/
├── index.html           # Giao diện chính: Trang bìa có nhạc + Giao diện Chatbot Endy
├── style.css            # Bộ stylesheet phong cách trẻ thơ, hiện đại, chuẩn Responsive
├── app.js               # Logic điều khiển: Chuyển màn hình, trình phát nhạc, âm thanh Ting Teng, giọng nói TTS & STT
├── chatbot-data.js      # Cơ sở tri thức (KB) 435 tình huống + thuật toán tìm kiếm thông minh tiếng Việt
├── chatbot.js           # Tệp chatbot gốc đã được dọn sạch và giữ nguyên 100% key & câu trả lời
├── server.js            # Máy chủ tĩnh Node.js hỗ trợ stream âm thanh và tự động mở trình duyệt
├── run.bat              # Tệp chạy nhanh trên Windows (chỉ cần nhấp đúp chuột)
├── cover.png (bìa.png)  # Ảnh bìa giới thiệu trang trọng
├── endy.png             # Hình tượng đại diện linh vật Endy
├── music.mp3            # Bài hát / Nhạc nền vui nhộn cho trẻ thơ
└── assets/              # Thư mục tài nguyên ảnh, huy hiệu minh họa, avatar và icon
    ├── banner_hero.png
    ├── cover.png
    ├── endy.png
    ├── music.mp3
    ├── sidebar_kids.png
    ├── illust_drowning.png
    ├── illust_electric.png
    ├── illust_traffic.png
    ├── avatar_boy.png
    ├── avatar_girl.png
    └── avatar_endy.png
```

---

## 🚀 Hướng dẫn khởi chạy

### Cách 1: Chạy bằng tệp `run.bat` (Khuyên dùng trên Windows)
1. Nhấp đúp chuột vào tệp `run.bat`.
2. Ứng dụng sẽ tự động khởi động máy chủ và mở trình duyệt tại địa chỉ `http://localhost:3000`.

### Cách 2: Chạy bằng lệnh Node.js
Mở Terminal hoặc PowerShell tại thư mục này và gõ:
```bash
node server.js
```
Sau đó mở trình duyệt truy cập: `http://localhost:3000`

### Cách 3: Mở trực tiếp
Nhấp đúp chuột trực tiếp vào tệp `index.html` trong trình duyệt (Chrome, Edge, Firefox, Cốc Cốc).

---

## 💎 Điểm nổi bật đã được thực hiện

1. **Trang bìa có nhạc (Landing Cover Page)**:
   - Tích hợp ảnh bìa `cover.png` sắc nét.
   - Trình phát nhạc nền `music.mp3` với thanh Equalizer nhảy theo điệu nhạc, nút Play/Pause và thanh chỉnh âm lượng.
   - Nút kêu gọi hành động lớn: **"🚀 BẮT ĐẦU TRÒ CHUYỆN VỚI ENDY"** với hiệu ứng nhịp đập phát sáng.

2. **Giao diện Chatbot Endy chuẩn theo bản thiết kế**:
   - Khung giao diện chuẩn chỉnh theo mẫu ảnh bạn đã cung cấp.
   - Thanh điều hướng danh mục: *Trang chủ*, *Đuối nước*, *An toàn giao thông*, *Phòng cháy chữa cháy*, *Tai nạn thương tích*, *An toàn điện*, *Câu hỏi nhanh*.
   - Hình ảnh hai bạn học sinh và biển gỗ ở góc trái dưới cùng.
   - Banner chào mừng với linh vật Endy vẫy tay thân thiện.
   - Huy hiệu hình minh họa bên phải câu trả lời của Endy (phao bơi, biển cấm nước vào điện, vạch qua đường...).

3. **Cơ sở tri thức và câu trả lời**:
   - **Giữ nguyên 100%** toàn bộ 424 bộ câu hỏi - câu trả lời trong `chatbot.js`.
   - Đã gộp 74 bộ từ khóa mở rộng (`keywordAliases`) giúp nhận diện tiếng Việt không dấu và từ lóng mượt mà.
   - Bổ sung các câu hỏi mẫu quan trọng đúng như ảnh thiết kế:
     - *"Nếu thấy bạn rơi xuống nước thì làm gì?"*
     - *"Cháy điện có được dội nước không?"*
     - *"Đi qua đường thế nào cho an toàn?"*
     - *"Em bị hóc nghẹn thì sao?"*
     - *"Gặp chó lạ làm gì?"*
     - *"Số cứu hỏa là gì?"*
     - *"Không tự ý nghịch điện"*
   - Đã thay thế sạch các từ ngữ cũ không phù hợp (ma túy, luật 2025) bằng nội dung trợ lý an toàn học đường chuẩn mực.

4. **Trải nghiệm âm thanh và tương tác cao cấp**:
   - Hiệu ứng âm thanh **Ting Teng** nhẹ nhàng bằng Web Audio API khi Endy trả lời.
   - Tính năng **Đọc to (Text-to-Speech)** bằng giọng đọc tiếng Việt thân thiện để các bé nhỏ tuổi có thể nghe Endy giảng giải.
   - Tính năng **Nói để hỏi (Speech-to-Text)** bằng micro.
   - **Đố vui an toàn (Safety Quiz)** gồm 5 câu trắc nghiệm tương tác chấm điểm và trao danh hiệu "Dũng sĩ an toàn".
   - Tùy chỉnh thông tin và tên gọi của bạn nhỏ để Endy xưng hô thân mật.
