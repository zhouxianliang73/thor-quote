@echo off
chcp 65001 >nul
echo [THOR] 从 01-Raw-Materials\01-价格表 生成 data.js ...
python "%~dp0scripts\generate_data.py"
if errorlevel 1 (
  echo [ERROR] 生成失败。请确认已安装 Python 和 openpyxl: pip install openpyxl
  exit /b 1
)
echo [THOR] 完成。
exit /b 0
