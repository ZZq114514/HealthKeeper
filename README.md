# HealthKeeper

<center>这是一个离线本地的记录性生活的工具，我们注重您的隐私安全</center>

## 项目结构
```
	intimate-diary/
	├── index.html              # 首页
	├── records.html            # 记录管理页
	├── js/
	│   └── initdatabase.js     # 数据存储模块 (plus.storage)
	│   └── main.js				# 复用逻辑
	├──css/
	│   └── main.css     # 复用样式表
	│
	└── manifest.json           # 应用配置文件

```

## 数据存储方案

### 总纲
这个项目是一个小型的项目，不需要使用Sqlite数据库，使用JSON数据存储格式足够了，所以我们使用"JSON文件"来存储用户的性行为记录。

**文件名**：`diary_records.json`

**创建路径**：`_doc/diary_records.json`

**结构示例**:
	
```
	[
	  {
	    "id": 1,
	    "current_date": "2026-07-11",
	    "duration": 1800,
	    "use_tool": false,
	    "with_partner": true,
	    "method_desc": "紫薇",
	    "use_material": false
	  },
	  {
	    "id": 2,
	    "current_date": "2026-07-10",
	    "duration": 2400,
	    "use_tool": true,
	    "with_partner": false,
	    "method_desc": "口角",
	    "use_material": true
	  }
	]
```

### 字段解释

| 字段名 | 数据类型 | 解释 |
| :--- | :--- | :--- |
| `id` | `Int` | 记录的唯一标识符，用于增删改查 |
| `current_date` | `String` | 进行行为的日期 |
| `duration` | `Int`（秒） | 行为持续时长 |
| `use_tool` | `Bool` | 是否使用斐济杯等器具 |
| `with_partner` | `Bool` | 是否和伴侣一起进行的行为 |
| `method_desc` | `String` | 行为方式的描述 |
| `use_material` | `Bool` | 是否使用素材，例如图片等帮助 boki |

## 3.开发方案

### 总纲
由于项目比较小，所以我们采用简单的方式来开发，方案为HTML5+APP，这种方案只需要进行前端开发就可以，无需安卓原生的Kotlin+AndoridStudio的庞大环境，并且跨平台性高。
性能方面，由于项目小，在运行上不会对手机产生过多的负担。

### 技术栈
HTML5+CSS+Javascript经典前端三件套来实现

### 核心逻辑
**脚本文件：** `js/initdatabase.js`和`js/main.js`

#### initdatabse.js的作用
其主要作用为数据操作的封装，window是所有方法的命名空间，将其中封装的方法暴露到全局。

#### main.js的作用
其主要作用是将两个页面重复用到的方法封装在一起，实现逻辑与页面分开。

## 4.构建

### 环境要求

* HubilderX(最新版)
* Android 手机或模拟器 (支持 H5+)

### 本地运行

1. 克隆本仓库
2. 用HbuilderX打开
3. 打开Android模拟器或者使用USB连接线连接你的Android手机
4. 点击菜单栏的“运行”，选择“运行到手机或模拟器”，选择“运行到Android App基座”

### 构建APK安装包

#### 方案一：云打包（最轮椅♿，最推荐）
1. 注册并登录Dcloud
2. 完成**手机号绑定和实名认证**
3. 用Hbuilderx打开项目，按照自己喜好配置manifest.json文件
4. 点击菜单栏的“发行”，点击“App-Android/iOS-云打包”，在对话框中填入必要信息，并且把广告推送的钩子去掉，然后点击打包（这里会提示安装云打包插件，点击确定即可）
5. 用户可以免费打包5次/日，[点击此处查看详细信息](https://uniapp.dcloud.net.cn/dev/app/cloud-build.html)
6. 等待打包完成后，控制台会输出APK文件的位置，点击文件路径即可找到打包完成的文件

#### 方案二：本地打包（AndroidStudio+JDK）
步骤过多，[参见Dcloud官方文档](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)

#### 其他包
当然也可以打包为Hommony的HAP包，也可以打包为iOS的安装包
* 鸿蒙详见[鸿蒙 App 专题](https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html)
* iOS详见[安卓/iOS 专题](https://uniapp.dcloud.net.cn/tutorial/app-base.html)

## 5.贡献与反馈

这个项目是个人的开源项目欢迎各位提出 Issue 或 Pull Request。
* 报告问题：请在 GitHub Issues 中描述详细的复现步骤
* 功能建议：欢迎提出合理的功能需求

## 特别注意
⚠️ **重要提醒：** 周期计算器提供的数值仅为参考，请勿将其视为医学建议。每个人的身体状况、生活节奏、情感需求都不同，请以自身实际情况和感受为准。

**公式说明：** 年龄十位数 × 9，积的十位数代表周期（天），个位数代表建议次数。

**示例：**
* 30岁 → 3 × 9 = 27 → 20 天内 7 次
* 40岁 → 4 × 9 = 36 → 30 天内 6 次



## 许可证
本项目使用 [MIT License](https://mit-license.org/) 开源协议。

## 鸣谢
* 感谢 H5+ 提供的强大跨端能力
* 感谢每一位关注两性健康的你
