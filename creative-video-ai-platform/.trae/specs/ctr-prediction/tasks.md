# Tasks

- [x] Task 1: 新增 TypeScript 类型定义
  - [ ] SubTask 1.1: 在 types.ts 中新增 CTR 相关类型：CoverItem（封面项）、TitleOption（标题选项）、TestPackage（测试包）、TestChannel（测试渠道）、TestGroup（测试群体）、CTRReport（点击率报告）、CTRReportItem（报告单项）
  - [ ] SubTask 1.2: 在 constants.tsx 中新增测试渠道列表、测试人数档位、测试群体选项等常量数据

- [x] Task 2: 重构 CTRView 组件 — 左侧配置面板
  - [ ] SubTask 2.1: 实现封面库区域：支持上传自定义封面（文件选择器），展示封面缩略图网格，支持删除封面，自动编号标识
  - [ ] SubTask 2.2: 实现标题输入区域：支持输入标题文本，添加多个标题选项（最多4个），编辑和删除标题
  - [ ] SubTask 2.3: 实现测试参数配置：选择测试渠道弹窗（多选，含小红书/B站/抖音/公众号等）、选择测试人数弹窗（档位选择）、选择测试群体弹窗（年龄/性别/兴趣标签筛选）
  - [ ] SubTask 2.4: 实现测试链接分享功能：生成测试链接按钮、一键复制链接、展示分享二维码
  - [ ] SubTask 2.5: 实现"生成点击率报告"按钮及提交逻辑

- [x] Task 3: 重构 CTRView 组件 — 右侧报告展示区域
  - [ ] SubTask 3.1: 实现报告空状态：未提交测试时展示引导提示
  - [ ] SubTask 3.2: 实现报告加载状态：测试进行中展示等待动画和进度提示
  - [ ] SubTask 3.3: 实现渠道标签切换：顶部渠道标签栏，支持按渠道筛选数据
  - [ ] SubTask 3.4: 实现点击率柱状图：展示各方案在各渠道的点击率对比可视化
  - [ ] SubTask 3.5: 实现最优方案推荐：高亮展示点击率最高的封面-标题组合
  - [ ] SubTask 3.6: 实现方案详情面板：点击某个方案展示各渠道的展示量、点击量、点击率明细
  - [ ] SubTask 3.7: 实现优化建议区域：基于数据生成文字优化建议

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 2] 和 [Task 3] 可并行开发
