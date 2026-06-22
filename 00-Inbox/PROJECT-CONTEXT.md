# THOR 报价系统 · 项目上下文快照

> 最后更新：2026-06-18 21:24
> 当前模型：gpt-oss:20b（Ollama 本地）
> Codex CLI 命令：codex --oss --local-provider ollama -s workspace-write exec "任务"

---

## 项目结构

```
D:\CAB-sites\thor-quote\
├── index.html          ← 报价单主页面（8个板块：柜体/台面/见光板/地脚线/配件/水槽/电器/增加）
├── selector.html       ← 选品页（产品网格+详情浮层）
├── dashboard.html      ← 项目看板（统计+列表+导出）
├── login.html          ← 登录页（L1~L4角色）
├── _shared/            ← 共享设计系统（已复制到本地）
│   ├── design-tokens.css
│   └── skins/production.css + marketing.css
└── 00-Inbox/           ← 文档
```

## 数据模型

### 产品数据（THOR_DATA 全局对象）
```javascript
var TD = {
  cabinet: { s:[], t:[], p:{} },  // 柜体：系列/类型/定价
  countertop: { s:[], tk:[], p:{} }, // 台面
  hw: [{n,p,u,ic,id}]             // 配件（55项，id:'h1'~'h55'）
};
// 报价单数据数组
var cb = [{n,c,w,h,d,m,r,q,u}];      // 柜体
var ct = [{n,c,w,h,d,m,tk,r,q,u}];   // 台面
var hw = [{n,id,c,w,h,d,para,q,u,p}];// 配件
// ... 其他类似
```

### 项目存取格式（localStorage key: 'thorP'）
```json
[{"n":"项目名","d":{"customer":{},"order":{},"items":{...},"totals":{}},"id":"THOR-..."}]
```

### 登录信息（localStorage key: 'thorUser'）
```json
{"name":"管理员","role":"L1|L2|L3|L4","loginAt":"..."}
```

### 选品暂存（localStorage key: 'thorSelections'）
选品页点"加入报价单"后存到这里，格式：[{id, category, name, price, ...}]

---

## 已知问题
1. 选品页→报价单的选品回传未实现（selector.html存了thorSelections，但index.html没读取）
2. 产品数据目前是硬编码在selector.html中，应改为从THOR_DATA读取
3. 硬件图片路径可能不对（img onerror没正确fallback）
4. 无真实后端，所有数据存localStorage

## 渲染函数对照
- rc() → 渲染柜体表格
- rct() → 渲染台面
- rp() → 渲染见光板
- rtr() → 渲染地脚线
- rh() → 渲染配件（内联+图片查找）
- rsk() → 渲染水槽
- re() → 渲染电器
- rx() → 渲染增加项目
- ag() → 添加行（ghost row）

## 颜色变量（所有页面共享）
--n-50(最浅)~--n-900(最深) / --accent / --accent-lt / --red / --red-bg
