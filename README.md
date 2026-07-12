# HealthKeeper

<center>这是一个离线本地的记录性生活的工具，我们注重您的隐私安全</center>

## 项目结构
```
	intimate-diary/
	├── index.html              # 首页
	├── records.html            # 记录管理页
	├── js/
	│   └── initdatabase.js     # 数据存储模块 (plus.storage)
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