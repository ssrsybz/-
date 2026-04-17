# Tasks

- [x] Task 1: 扩展类型定义和常量数据
  - [x] SubTask 1.1: 在 types.ts 中扩展 CTRReportItem，新增可选字段 groupId 和 groupName；新增 CTRReportTab 枚举类型（overview / channel_compare / audience）
  - [x] SubTask 1.2: 在 constants.tsx 中新增 INDUSTRY_BENCHMARKS 常量（各渠道行业平均点击率）、TESTER_COUNT_OPTIONS 增加推荐说明字段、CONFIDENCE_LEVELS 常量

- [x] Task 2: 重构报告区域为多标签页布局
  - [x] SubTask 2.1: 在报告区域顶部添加三个标签页按钮：总览 / 渠道对比 / 人群分析，使用 activeReportTab 状态管理切换
  - [x] SubTask 2.2: 将现有报告内容（柱状图、最优方案、优化建议）移入"总览"标签页

- [x] Task 3: 实现总览标签页增强
  - [x] SubTask 3.1: 在报告顶部添加置信度指标卡片：根据 totalTesters 显示置信度等级标签（高/中/低）和置信区间
  - [x] SubTask 3.2: 在柱状图中叠加行业基准线：每个方案的柱状条旁显示该渠道行业平均点击率虚线标记
  - [x] SubTask 3.3: 在方案卡片中添加与行业均值的对比文字（"高于行业均值 X%" 或 "低于行业均值 X%"）

- [x] Task 4: 实现渠道对比标签页
  - [x] SubTask 4.1: 构建渠道×封面矩阵表格：行为封面方案，列为各渠道，单元格显示点击率
  - [x] SubTask 4.2: 每列最高点击率单元格高亮标记（金色边框 + 最优徽章）
  - [x] SubTask 4.3: 矩阵下方添加"各渠道推荐方案"汇总卡片，列出每个渠道的最优封面

- [x] Task 5: 实现人群分析标签页
  - [x] SubTask 5.1: 扩展 generateMockReport 函数，为每个封面×渠道×人群组合生成模拟数据
  - [x] SubTask 5.2: 实现人群维度标签栏：年龄段 / 性别 / 兴趣三个分组，每组可展开查看各标签
  - [x] SubTask 5.3: 每个人群标签下展示各封面方案的点击率柱状图，标注该人群最优方案

- [x] Task 6: 增强测试人数弹窗
  - [x] SubTask 6.1: 为 TESTER_COUNT_OPTIONS 添加推荐说明，在弹窗中每个档位旁显示推荐标签

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 1]
- [Task 6] depends on [Task 1]
- [Task 3] [Task 4] [Task 5] [Task 6] 可并行开发
