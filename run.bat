@echo off
chcp 65001 >nul
title Thỏ Ngọc - Chuyên gia an toàn cho trẻ em
echo =======================================================
echo     THỎ NGỌC - CHUYÊN GIA AN TOÀN CHO TRẺ EM 🐰🛡️
echo =======================================================
echo Đang khởi động ứng dụng web...

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Khởi chạy máy chủ Node.js...
    node server.js
) else (
    echo Đang mở trực tiếp tệp index.html trong trình duyệt...
    start "" "index.html"
)
pause
