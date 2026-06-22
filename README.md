# THOR 索而橱柜报价系统

纯静态 HTML + CSS + JavaScript 报价工具，无需服务端即可使用。

## 快速开始

直接用浏览器打开 `index.html`，或使用本地静态服务器：

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

访问 `http://localhost:8080/index.html`

## 页面说明

| 页面 | 功能 |
|------|------|
| `index.html` | 报价单编辑器（8 个品类、自动算价、打印） |
| `selector.html` | 可视化选品（产品网格 + 详情浮层） |
| `dashboard.html` | 项目看板（统计、列表、导出） |
| `login.html` | 登录（L1~L4 角色演示） |
| `admin.html` | 用户管理（L4 演示） |

## 项目结构

```
thor-quote/
├── index.html          # 报价单主页面
├── selector.html       # 选品页
├── dashboard.html      # 项目看板
├── login.html          # 登录页
├── admin.html          # 用户管理
├── api.js              # API 层（localStorage + Supabase 回退）
├── data.js             # 产品定价数据（由 json5 生成）
├── js/
│   └── shared.js       # 共享模块（数据适配、选品、导入）
├── scripts/
│   └── generate_data.py  # 从 Excel 生成 data.js
├── 01-Raw-Materials/
│   └── 01-价格表/      # ★ 输入源文件（xlsx）
├── _shared/            # 设计系统（CSS tokens + skins）
├── 02-Database/
│   └── thor-pricing.json5  # 定价数据（自动生成）
├── 00-Inbox/           # 规划文档
└── 03-Converted/       # 转换后的图片资源
```

## 数据流

```
01-Raw-Materials/01-价格表/
  ├── THOR索而家居厨柜类价格表-2025.xlsx   ← 柜体 + 台面定价
  ├── 五金.xlsx                            ← 功能配件定价
  └── 报价模板-2026-00.xlsx                ← 报价单结构参考
        ↓  python scripts/generate_data.py  或  generate-data.bat
      data.js  +  02-Database/thor-pricing.json5
        ↓ js/shared.js 适配
  index.html / selector.html
```

## 更新定价数据

1. 更新 `01-Raw-Materials/01-价格表/` 中的 Excel 源文件
2. 运行：

```bat
generate-data.bat
```

或：

```bash
python scripts/generate_data.py
```

会重新生成 `data.js` 和 `02-Database/thor-pricing.json5`。

## 技术栈

- 前端：纯 HTML + CSS + JavaScript（无构建步骤）
- 存储：localStorage（Phase 2a）/ Supabase PostgreSQL（Phase 2b）
- 部署：Cloudflare Pages / 任意静态托管

## 权限等级

| 等级 | 角色 | 权限 |
|------|------|------|
| L1 | 销售 | 做报价、看自己历史 |
| L2 | 主管 | 看全部报价、门店统计 |
| L3 | 老板 | 管理产品库、定价策略 |
| L4 | 超级管理员 | 系统配置、用户管理 |
