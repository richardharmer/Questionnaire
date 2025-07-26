# AI编程工具问卷调查网站

这是一个使用 Next.js、shadcn/ui 和 Neon PostgreSQL 构建的问卷调查网站，用于收集开发者对AI编程工具使用情况的反馈。

## 功能特性

- 📝 完整的问卷调查表单
- 💾 数据存储到 Neon PostgreSQL 数据库
- 🎨 使用 shadcn/ui 组件库的现代化UI
- 📱 响应式设计，支持移动端
- ✅ 表单验证和错误处理
- 🚀 TypeScript 支持
- 👨‍💼 管理界面查看问卷结果

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS, shadcn/ui
- **数据库**: Neon PostgreSQL
- **ORM**: Drizzle ORM

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 设置数据库

1. 在 [Neon](https://neon.tech) 创建一个新的数据库项目
2. 复制数据库连接字符串
3. 更新 `.env.local` 文件中的 `DATABASE_URL`

```env
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

### 3. 设置数据库表

```bash
npm run db:setup
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 问卷内容

问卷包含以下几个部分：

### 基本信息
- 邮箱地址（必填）
- 姓名（必填）
- 编程经验（必填）

### AI工具使用情况
- 使用过的AI编程工具（多选）
- 最常用的AI编程工具
- 满意度评价

### 详细反馈
- 最喜欢的功能
- 遇到的挑战
- 推荐意愿
- 未来发展方向兴趣
- 其他意见建议

## 页面结构

- `/` - 问卷调查主页
- `/admin` - 管理界面（查看所有问卷结果）

## 数据库结构

```sql
CREATE TABLE surveys (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  experience TEXT NOT NULL,
  current_tools TEXT NOT NULL,
  primary_tool TEXT NOT NULL,
  satisfaction TEXT NOT NULL,
  features TEXT NOT NULL,
  challenges TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  future_interest TEXT NOT NULL,
  additional_comments TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API 端点

- `POST /api/survey` - 提交问卷数据

## 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量 `DATABASE_URL`
4. 部署完成

## 开发

### 添加新问题

1. 更新 `src/lib/db.ts` 中的数据库schema
2. 修改 `src/components/survey-form.tsx` 中的表单
3. 更新 API 路由处理逻辑
4. 运行数据库迁移

### 自定义样式

项目使用 Tailwind CSS 和 shadcn/ui 组件。可以在 `src/app/globals.css` 中添加自定义样式。

## 许可证

MIT License