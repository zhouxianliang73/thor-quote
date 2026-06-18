# THOR 报价系统 · 总体建设规划（定版）

> 规划时间：2026-06-18 v2 | 关联：DD ProductHub 产品中心系统
> 定位：THOR索而品牌橱柜报价工具 → 逐步扩展为通用报价+项目管理系统

---

## 当前状态（Phase 0 - 已完成）

- [x] 单页报价单编辑器（HTML + CSS + JS）
- [x] 8个板块：柜体/台面/见光板/地脚线/配件/水槽/电器/增加项目
- [x] 自动算价 + 合计 + 大写金额
- [x] 客户报价单视图（打印/预览）
- [x] 自定义搜索下拉组件
- [x] 手机端卡片式适配
- [x] 硬件图片映射（55项）

---

## 总体规划（4个维度）

### 维度一：可视化选品界面（Phase 1）

**现状问题：** 表格展示，图片太小，客户看不清材料花色、龙头样式

**目标：** 每个板块独立的大图 + 列表选择界面

#### 1.1 选品页（独立页面）
```
独立的选品页面，进入每个板块：
  ├── 容器化展示每个产品
  │    ├── 编号（THOR编码）
  │    ├── 名称
  │    ├── 基本尺寸
  │    └── 缩略图
  ├── 点击图片 → 进入详情页
  │    ├── 大图预览（可缩放）
  │    ├── 详细信息（材质/颜色/规格）
  │    ├── 使用场景图
  │    └── 关联产品推荐
  └── 选品 → 加入报价单
```

#### 1.2 产品详情卡片
```
点击图片 → 卡片浮现在页面最上方
  ├── 大图
  ├── 产品编号
  ├── 名称
  ├── 规格尺寸
  ├── 材质/颜色选项
  ├── 技术参数
  ├── 使用场景图（多张）
  └── "加入报价单" 按钮
```

#### 1.3 各板块图片来源
| 板块 | 图片状态 | 实施 |
|------|---------|------|
| 柜体 | 系列门板花色图 → 后续补充 | 先用材料名+色块占位 |
| 台面 | 琉晶系列纹理图 → 后续补充 | 先用纹理名+色块占位 |
| 配件 | ✅ 55张已映射 | 选配时展示大图 |
| 水槽 | ⏳ 待补充 | 占位图标 |
| 电器 | ⏳ 待补充 | 占位图标 |

---

### 维度二：后台管理 + 项目统计（Phase 2）

**现状问题：** 报价单不能保存，无法追溯，无数据分析

**目标：** PostgreSQL（免费额度）+ 完整的后端存储 + 项目管理 + 多维分析

#### 2.1 技术选型
| 组件 | 方案 | 原因 |
|------|------|------|
| 数据库 | Supabase (PostgreSQL) | 免费额度够用，自带 Auth |
| API | Supabase Edge Functions / Cloudflare Workers | Serverless |
| 前端 | 当前 HTML+CSS+JS → 逐步组件化 | 渐进式 |
| 部署 | Cloudflare Pages | 免费，全球 CDN |
| 文件存储 | Supabase Storage / R2 | S3 兼容 |

**PostgreSQL 免费额度说明：**
Supabase Free Tier: 500MB 数据库, 5GB 带宽, 50,000 月活用户
→ THOR 初期完全够用，后期可随时扩展付费

#### 2.2 统计分析维度
```
┌──────────────────────────────────────────┐
│              统计看板                      │
├────────────┬─────────────┬───────────────┤
│  按门店统计  │  按人员统计   │  按月统计      │
├────────────┼─────────────┼───────────────┤
│ 门店A: 12单 │ 张三: 8单    │ 本月: 23单     │
│ 门店B: 8单  │ 李四: 5单    │ 上月: 18单     │
│ 门店C: 3单  │ 王五: 2单    │ 同比: +27%    │
├────────────┴─────────────┴───────────────┤
│ 热销TOP5                                  │
│ 1. 大千云纹地柜(800)     × 12单  ¥67,524  │
│ 2. 百隆107°铰链          × 35个   ¥2,695  │
│ 3. 琉晶-丝纹GY01台面     × 8单   ¥13,240  │
│ 4. 嵌入式蒸烤一体机       × 5台   ¥15,000  │
│ 5. L型免拉手             × 42米   ¥2,478  │
├──────────────────────────────────────────┤
│ 系列偏好（饼图）                            │
│ 大千云纹: 35% │ 铂金系列: 22% │ 其他: 43%  │
└──────────────────────────────────────────┘
```

#### 2.3 数据模型
```sql
-- 项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_no TEXT UNIQUE,              -- THOR-20260618-001
  customer_name TEXT,
  customer_phone TEXT,
  store_name TEXT,                     -- 下单店面
  salesperson TEXT,                    -- 报价人员
  total_amount DECIMAL(10,2),
  status TEXT DEFAULT 'draft',         -- draft|quoted|confirmed|ordered
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 行项目表
CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  section TEXT,                        -- cabinet|countertop|hardware|...
  product_code TEXT,                   -- THOR编码
  product_name TEXT,
  material TEXT,                       -- 门板系列/材料
  width INT, height INT, depth INT,
  quantity DECIMAL(10,2),
  unit TEXT,
  unit_price DECIMAL(10,2),
  subtotal DECIMAL(10,2)
);

-- 门店/人员统计视图（PostgreSQL 聚合）
CREATE VIEW monthly_stats AS
SELECT
  store_name,
  salesperson,
  date_trunc('month', created_at) AS month,
  COUNT(*) AS quote_count,
  SUM(total_amount) AS total_amount
FROM projects
GROUP BY store_name, salesperson, date_trunc('month', created_at);
```

#### 2.4 数据库表关联图示
```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  users    │     │   projects   │     │  line_items  │
├──────────┤     ├──────────────┤     ├─────────────┤
│ id (PK)  │←───→│ created_by   │     │ id (PK)     │
│ name     │     │ id (PK)      │←───→│ project_id  │
│ role(L1~4)│     │ project_no   │     │ section     │
│ store    │     │ store_name   │     │ product_name│
│ phone    │     │ salesperson  │     │ quantity    │
└──────────┘     │ total_amount │     │ unit_price  │
                 │ status       │     │ subtotal    │
                 │ created_at   │     └─────────────┘
                 └──────────────┘
```

---

### 维度三：客户上传图片 + 图库系统（Phase 2~3）

#### 3.1 上传入口
```
每个板块的图片列增加 "+" 按钮
  ├── 点击 → 打开文件选择器
  ├── 支持拖拽、多图上传
  ├── 上传后前端预览（临时展示在图片列）
  ├── 发送到 ComfyUI 流水线处理
  │    ├── 去背景
  │    ├── 调色/调光
  │    ├── 标准裁剪 800x800
  │    └── 缩略图 200x200
  ├── 处理完成后入库
  └── 图片列自动更新为处理后的图片
```

#### 3.2 点击图片 → 详情卡片
```
点击板块内的任一图片
  → 详情卡片浮现在页面最上方
  ├── 大图展示
  ├── 产品编号
  ├── 名称
  ├── 规格尺寸
  ├── 材质/颜色
  ├── 技术参数
  ├── 使用场景图（多张轮播）
  └── "加入报价单" / "替换图片" 按钮
```

#### 3.3 图片库结构
```
CAB\01-Raw-Materials\Image-Library\
├── Styles\               ← 风格分类
│   ├── Modern\
│   ├── Luxury\
│   ├── Nordic\
│   ├── Industrial\
│   └── Wabisabi\
├── Categories\           ← 品类分类  
│   ├── Cabinet-Doors\
│   ├── Countertops\
│   ├── Hardware\
│   ├── Sinks\
│   └── Appliances\
├── Customer-Uploads\     ← 客户上传原图（按项目分文件夹）
└── index.json5           ← 图片索引（标签/风格/品类/来源）
```

#### 3.4 图片优化流水线
```
客户上传原图 → ComfyUI Workflow
  → 步骤1: 去背景（RemoveBG / SAM）
  → 步骤2: 调光/调色（自动白平衡）
  → 步骤3: 标准输出 800x800 白底图
  → 步骤4: 缩略图 200x200
  → 输出到 Image-Library/Customer-Uploads/{项目名}/
  → 更新 index.json5
```

---

### 维度四：用户系统 + 权限管理（Phase 3）

#### 4.1 登录方式
```
社媒登录（一期）
  ├── 微信扫码登录（中国市场）
  ├── Google OAuth（欧美客户）
  └── WhatsApp Number（中东客户 - 后期）

管理员账号密码登录
  └── 设在后端管理入口（Supabase Auth）
```

#### 4.2 四级权限体系（L1~L4）
```
L1 - 销售/客服（前端权限）
  ├── 查看产品库（销售价可见）
  ├── 制作和修改报价单
  ├── 查看自己的报价历史
  └── 客户上传图片

L2 - 主管/店长（中级权限）
  ├── L1所有权限
  ├── 查看所有报价单（不限人）
  ├── 查看出厂价/利润率
  ├── 查看门店月度统计
  └── 按人员查看业绩

L3 - 老板/管理员（高级权限）
  ├── L2所有权限
  ├── 修改出厂价/定价策略
  ├── 管理产品库（增删改）
  ├── 管理用户账号/权限
  └── 全维度统计（带利润分析）

L4 - 超级管理员（系统权限）
  ├── L3所有权限
  ├── 系统配置（数据库/API）
  ├── 操作日志
  └── 数据导出/备份
```

#### 4.3 权限与界面联动
```
前端根据用户 role 动态展示：
  ├── L1：只看销售价，只看自己报价
  ├── L2：看出厂价、折扣区间、店铺统计
  ├── L3：管理入口、定价策略、用户管理
  └── L4：系统设置、日志、数据导出
```

---

## 与 DD ProductHub 的整合

### THOR 是 ProductHub 的第一个应用场景
```
DD ProductHub（数据中台）
  ├── products-db.json5    ← 所有供应商产品统一数据库
  ├── cases-db.json5       ← 案例库
  ├── suppliers/           ← 供应商信息
  └── image-pipeline/      ← 图片流水线
                    ↓
THOR 报价系统（前端应用）
  ├── 从 ProductHub 读取产品数据
  ├── 报价单生成 → 可保存到项目
  ├── 客户确认 → 生成采购单
  └── 采购单 → 传给供应商
```

### 数据流向
```
供应商Excel → MySkill提取 → ProductHub JSON → THOR前端
                                                      ↓
客户上传图片 → ComfyUI处理 → Image-Library → ProductHub索引
                                                      ↓
客户确认报价 → 项目存档 → 统计看板 → 热销分析 → 定价优化
```

---

## 阶段路线图

### Phase 1：可视化选品 + 选品页（1~2周）
1. 设计选品页容器布局
2. 每个板块的独立选品页
3. 产品卡片（编号/名称/尺寸/缩略图）
4. 详情页（大图/参数/场景）
5. 产品详情卡片浮层（点击图片 → 顶部展示）

### Phase 2：后端 + 统计（3~4周）
1. Supabase 项目搭建
2. 数据表创建（projects / line_items / users）
3. 项目 CRUD API
4. 报价单保存/加载/列表
5. 统计看板（按门店/按人员/按月/热销）
6. 按门店、人员月统计报表

### Phase 3：图片 + 图库（5~6周）
1. 每个板块图片列 "+" 上传按钮
2. 前端预览 + 拖拽上传
3. ComfyUI 流水线对接
4. Image-Library 索引系统
5. 点击图片 → 详情卡片浮层

### Phase 4：用户 + 权限（7~8周）
1. Supabase Auth 社媒登录集成
2. 四级权限模型（L1~L4）
3. 前端界面根据 role 差异化
4. 操作日志
5. 数据导出

---

## 技术选型总表

| 模块 | 方案 | 原因 |
|------|------|------|
| 前端 | 当前 HTML+CSS+JS → 逐步 React | 渐进式，当前够用 |
| 数据库 | Supabase PostgreSQL（免费 500MB） | 额度够用，自带 Auth |
| API | Supabase Edge Functions | Serverless，同数据库 |
| 部署 | Cloudflare Pages | 已有，免费 CDN |
| 图片处理 | ComfyUI + Flux（3090） | 已有 |
| 文件存储 | Supabase Storage / R2 | S3 兼容 |
| 社媒登录 | Supabase Auth | 微信/Google 内置 |
| 统计分析 | PostgreSQL SQL Views + Charts | 数据库层聚合 |
