window.PRACTICE_CONTENT = {
  "interview": {
    "title": "把作品，讲成有依据的能力。",
    "subtitle": "AIGC 岗位 · 项目介绍、连续追问与重练",
    "skill": "aigc-interview-coach",
    "status": "原创教学样例 · 待目标用户试用",
    "cases": [
      {
        "id": "film",
        "name": "短视频｜运动品牌 15 秒广告",
        "topic": "虚构招聘练习：AIGC 创意制作。要求能把创意转成分镜，控制人物与产品一致性，并说明交付取舍。",
        "source": "我为一个虚构运动品牌做了 15 秒 AI 广告。我负责分镜、图像和视频生成，另一位同学负责剪辑。我用了多个 AI 工具，尝试了很多次，最后选了效果最好的版本。项目只完成了内部演示，没有投放数据。",
        "rounds": [
          [
            "请用一分钟介绍这个项目，以及你独立负责的部分。",
            "我负责分镜、图像和视频生成，另一位同学负责剪辑。",
            "已有职责边界。接下来核对判断依据，而不是继续罗列工具。"
          ],
          [
            "你说“效果最好”，具体用什么标准判断？",
            "最初我只是按画面好不好看挑选，没有记录比较标准。",
            "不要替候选人补造过程。先让对方辨认缺口，再建立下一次可使用的标准。"
          ],
          [
            "回想一个被放弃的镜头，它为什么不适合？",
            "一个转身镜头里鞋子颜色变了。我改用更短的镜头并重新生成，剪辑同学再把它接起来。",
            "出现了可检查的具体问题与处理动作，还需要确认修改后的结果。"
          ],
          [
            "没有投放数据，你怎样如实介绍项目成果？",
            "我可以展示修改前后镜头和分镜，但目前不能证明它提升了商业转化。",
            "把可展示的制作证据与未知的商业效果分开。"
          ]
        ],
        "evidence": [
          {
            "quote": "效果最好的版本",
            "issue": "“最好”缺少评价标准。",
            "action": "列出产品一致性、动作连贯性、品牌适配三项检查，说明哪项优先。",
            "status": "需要补充"
          },
          {
            "quote": "尝试了很多次",
            "issue": "尚未说明一次迭代的诊断过程。",
            "action": "选一个失败镜头，按现象、原因假设、修改、复查讲一遍。",
            "status": "需要补充"
          },
          {
            "quote": "没有投放数据",
            "issue": "明确了证据范围。",
            "action": "展示可公开的修改对照，不新增观看量或转化率。",
            "status": "已有证据"
          }
        ],
        "after": "我负责分镜和素材生成，剪辑由同学完成。转身镜头曾出现鞋子颜色变化，我缩短镜头并重新生成，交由同学衔接。下次我会记录产品一致性、动作连贯性和品牌适配的检查结果。项目目前仅用于内部演示，不能推断投放表现。",
        "next": "选另一个作品，用 90 秒说明一次失败如何改变你的制作决策。不要套用本案例事实。"
      },
      {
        "id": "image",
        "name": "图片｜六张活动主视觉",
        "topic": "虚构招聘练习：AIGC 视觉创作者。关注画面一致性、版式适配、批量输出和交付说明。",
        "source": "我给虚构舞蹈活动做了六张主视觉。我负责生成与排版，同学确定了文案。六张图都很好看，所以我认为它们适合直接发布。我没有检查手机上的小字，也没有整理素材来源。",
        "rounds": [
          [
            "为什么需要六张，而不是一张主海报？",
            "需要不同舞种的活动入口，但主题应一致。",
            "已有使用场景。"
          ],
          [
            "如何判断这是一组图？",
            "可以比较颜色、字级和主体位置；我当时没有固定这些规则。",
            "区分已做动作与事后改进。"
          ],
          [
            "手机上最容易出什么问题？",
            "小字可能看不清，我还需要在实际尺寸上检查。",
            "承认未验证部分。"
          ],
          [
            "交付前还缺哪些说明？",
            "补充素材来源、可编辑文件和不同尺寸检查记录。",
            "把审美判断转成可交付的证据。"
          ]
        ],
        "evidence": [
          {
            "quote": "六张图都很好看",
            "issue": "审美评价尚未连接实际使用要求。",
            "action": "在手机尺寸检查标题、日期、报名入口的阅读顺序。",
            "status": "需要补充"
          },
          {
            "quote": "没有检查手机上的小字",
            "issue": "有明确的未验证项。",
            "action": "记录一次实际尺寸测试，不把待验证写成已通过。",
            "status": "需要补充"
          },
          {
            "quote": "没有整理素材来源",
            "issue": "交付依据不完整。",
            "action": "补充素材来源与使用范围，不自动断言商用许可。",
            "status": "需要补充"
          }
        ],
        "after": "我负责六张图的生成与排版，同学提供文案。当前只能证明初稿完成，手机小字可读性和素材来源还没有验收。下一步会按统一字级与颜色检查整组作品，并补充实际尺寸预览。",
        "next": "挑选一张你自己的图，说明受众在 3 秒内应先看到什么，以及你怎样验证。"
      },
      {
        "id": "interactive",
        "name": "互动｜三分支体验页",
        "topic": "虚构招聘练习：互动内容创作者。关注用户路径、状态反馈、性能和完成度。",
        "source": "我做了一个包含三个结局的互动体验页。我负责故事分支和页面实现，使用 AI 辅助写代码。页面在我的电脑上可以打开，所以我认为已经可以上线。我没有测试手机、返回按钮或加载失败的情况。",
        "rounds": [
          [
            "用户第一次进入应该做什么？",
            "先选一个对话选项，进入对应分支。",
            "先明确主要动作。"
          ],
          [
            "你说可以上线，有什么验证记录？",
            "只有电脑上的一次打开记录，没有完整测试。",
            "不把打开等同于完整可用。"
          ],
          [
            "怎样检查三个结局都能到达？",
            "从入口逐条走路径，记录选择与结果，再检查重新开始。",
            "把泛泛判断改成可执行检查。"
          ],
          [
            "如果视频加载失败，体验会怎样？",
            "目前会空白，需要增加重试和文字回退。",
            "识别一项具体的体验缺口。"
          ]
        ],
        "evidence": [
          {
            "quote": "页面在我的电脑上可以打开",
            "issue": "证据不足以覆盖不同设备和完整路径。",
            "action": "逐一记录三个结局的进入、返回、重开结果。",
            "status": "需要补充"
          },
          {
            "quote": "没有测试手机",
            "issue": "设备兼容性仍未知。",
            "action": "测试窄屏布局与触控目标，记录实际设备或模拟条件。",
            "status": "需要补充"
          },
          {
            "quote": "加载失败的情况",
            "issue": "异常状态未验证。",
            "action": "断开资源请求，检查是否给出重试与回退入口。",
            "status": "需要补充"
          }
        ],
        "after": "我完成了分支与页面实现，并用 AI 辅助编程。目前只做过电脑端入口检查。上线前需要补齐三条路径、重开、手机布局以及视频失败回退；我会把测试结果与作品一起展示。",
        "next": "为自己的项目列出三个用户会失败的步骤，并说明如何发现及修复。"
      }
    ],
    "lessons": [
      {
        "title": "01 / 准备项目，让追问有依据",
        "body": [
          "这一课先把“做过什么”变成可检查的材料。面试官无法仅凭你说用了哪些模型判断能力。岗位要求、个人职责和具体决策，是陪练的输入。示例都是虚构的，不属于真实品牌、雇主或候选人。",
          "下载本页学习包并解压，打开其中的 practice-workspace 作为 Codex 本地任务工作目录。Mac 可以在 Finder 中查看；Windows 可以在文件资源管理器中查看。这里已有项目级 Skills，不需要把文件复制进系统目录。首次使用工具先完成课程的安装与账户检查。",
          "samples/interview-film.md 保存岗位和项目事实。先使用它走通流程，再复制 resources/project-facts.md 填写你自己的项目。没有数据就写未测，不要把计划写成已经完成。"
        ],
        "steps": [
          "下载并解压完整实战包，确认没有多套同名文件夹。打开 practice-workspace。",
          "在 Codex 对话框发送下面的目录检查指令，核对返回路径和文件。",
          "让 Codex 读取 samples/interview-film.md，按“岗位要求／已有事实／缺失证据”列三栏，暂不开始面试。"
        ],
        "prompt": "请先列出当前工作目录，确认有 AGENTS.md、samples、resources 和 .agents/skills。只读取这些课程文件。告诉我找到的两个 Skill 名称；不要搜索其他目录，不修改全局配置。",
        "expected": "看到正确工作目录、两个 Skill 名称和项目事实表。网页只用于看课，指令发给 Codex。",
        "trouble": "看不到 .agents 是隐藏目录的常见现象。让 Codex 按完整路径读取 .agents/skills/aigc-interview-coach/SKILL.md；不要反复下载。路径不符时先重新选择工作目录。"
      },
      {
        "title": "02 / 每次一个问题，练出真实细节",
        "body": [
          "陪练需要根据你的上一句回答继续追问。一次生成二十个问题容易变成背题，也无法检查你是否能解释自己的决策。这一课用四轮问答，先练最重要的一次项目迭代。",
          "首轮先介绍项目，后续回答只使用材料里已有的事实。问到未知内容，直接说“这部分没有记录”。在教学材料中扮演虚构候选人是一种练习，之后不能把这些经历写进自己的简历。",
          "正常情况下，助手提出一个问题后应停下来等你。如果没有停，直接要求恢复单题模式。文字练习只看回答内容，不对声音、自信程度或肢体语言作判断。"
        ],
        "steps": [
          "发送下面的调用指令。",
          "先自己回答第一题，再等下一题；完成四轮。",
          "第四轮结束后要求复盘，检查报告中的引用是否确实来自你的回答。"
        ],
        "prompt": "使用 $aigc-interview-coach 的模拟模式，读取 samples/interview-film.md。进行四轮文字面试，每次只问一题并等待我回答，先不要给参考答案。围绕我的回答追问，不补造经历。结束后再复盘。",
        "expected": "每次只有一个问题；回答后出现相关追问。复盘包含原话和下一步练习，没有录用概率。",
        "trouble": "若工具没有识别 $ 名称，明确让它读取 .agents/skills/aigc-interview-coach/SKILL.md 并按文件执行。这是按文件执行的兼容方式，不代表自动发现已经成功；可重启后再检查。"
      },
      {
        "title": "03 / 把反馈变成能查看的报告",
        "body": [
          "报告的价值来自“结论对应哪句话”。它应保留你的原话、说明缺少什么，以及下一次可以做什么。已有证据不等于招聘结果；未展示也不等于你没有能力。",
          "本包使用统一 report.json 格式。Skill 内的 references/report-format.md 定义必填字段。Codex 写入 outputs 后，你可以在本网页“我的练习”中导入。导入由浏览器本地读取，网页不上传文件；但你发送给 Codex 的材料会按所用工具的处理方式运行。",
          "先用包内 sample-report-interview.json 检查网页，再导入自己的报告。浏览器校验格式和引用是否包含在 source 原文中，不会证明评价本身正确。"
        ],
        "steps": [
          "完成对话后发下面指令，要求输出 Markdown 和 JSON 两种报告。",
          "在文件管理器中打开 outputs，找到报告 JSON。",
          "打开网页的“我的练习”，选择 JSON 文件；逐条核对批注引用，必要时下载或打印报告。"
        ],
        "prompt": "请按当前 Skill 的 references/report-format.md 保存本轮报告到 outputs/interview-01.json，另存可读的 outputs/interview-01.md。source 只包含本轮实际材料和对话；evidence 的 quote 必须逐字摘自 source。不要覆盖已有文件，已有同名时改用新序号。",
        "expected": "导入后看到报告标题、原文、逐条证据与下一次练习。自己的报告与预置样例分开显示。",
        "trouble": "导入失败先看错误提示。若是引用找不到，让 Codex 对照原文修正 quote；若是格式问题，让它按 resources/report-format.md 修复。不要为了过校验把虚构引文加入原稿。"
      },
      {
        "title": "04 / 换项目，再确认真的学会了",
        "body": [
          "会复述参考答案不等于学会面试。先选复盘中最薄弱的一项，用真实事实重答，再换一个项目测试是否仍能讲清。不要把示例的细节移植到自己的经历。",
          "使用 samples/interview-image.md 或 interview-interactive.md 做迁移练习，或者填自己的 project-facts.md。将“已做的动作”和“下一次打算做的动作”分开；后者可以体现复盘，但不能当作历史成果。",
          "长期资产是自己的项目证据库：每次补充一条真实决策、一次失败修正、一份可公开成果。对外分享前检查授权与个人信息，复盘文件默认留在本地。"
        ],
        "steps": [
          "针对旧报告中的一项缺口重新回答，要求比较两次原话。",
          "换一个项目，独立完成两轮追问，不先看样例答案。",
          "按 resources/quality-checklist.md 自查，将本次通过、未通过和待确认项记录到 outputs。"
        ],
        "prompt": "使用 $aigc-interview-coach 的重练模式，读取 outputs/interview-01.json。先选一项证据不足的回答，让我重答；我答完后逐句比较改进，别添加材料外事实。随后用 samples/interview-interactive.md 换题测试，每次一题。",
        "expected": "能区分事实、推测与计划；能解释一次具体取舍；更换项目后仍能形成有证据的回答。",
        "trouble": "重答只是变长时，要求指出新增了哪项可核实信息。模型夸奖或给高分不代表达到验收要求。"
      }
    ]
  },
  "ielts": {
    "title": "看懂每一条反馈，再自己改好。",
    "subtitle": "雅思 Task 2 · 原文批注、修改复查与迁移练习",
    "skill": "ielts-writing-coach",
    "status": "教学原型 · 待雅思教师复核 · 不估分",
    "cases": [
      {
        "id": "volunteer",
        "name": "议论文｜论证、语法与立场",
        "topic": "原创 Task 2 练习：Some people think university students should be required to do community volunteering. To what extent do you agree or disagree?",
        "source": "Some people believe university students should be required to do community volunteering. I agree that volunteering can be useful, but I do not think it should be compulsory for every student. Universities should make these activities easy to join and give students choices about when to participate.\n\nVolunteering is good for students because it has many benefits. Students meet people outside their courses and learn to work with others. For example, helping at a local reading club could give a student experience of explaining an idea to a child. They must listen carefully and change their explanation when the child does not understand. This is a useful skill in group projects and later at work.\n\nHowever, a compulsory programme can create difficulties. Some students has paid jobs after class. They depend on that income to cover rent or transport. Adding several hours of unpaid work every week may leave them with less time for study or rest. A university should not assume that every student has the same amount of free time. Flexible weekend activities or short projects during holidays would be easier for many students to attend.\n\nThere is also a practical question about the organisations receiving help. A charity may need people who return regularly and understand its work. Sending students who only want to finish a requirement may not meet that need. Universities could instead match interested students with organisations and explain the responsibilities before they begin.\n\nIn conclusion, volunteering can help students and local communities. It should therefore be required for all students. Universities should also provide flexible opportunities and information so that students can make informed choices.",
        "evidence": [
          {
            "quote": "Volunteering is good for students because it has many benefits.",
            "issue": "这一主题句重复“有益”，没有点明具体收益；后文的沟通例子可以帮助它更具体。",
            "action": "把主题句改为概括沟通能力的观点，保留自己的论证。",
            "status": "需要补充"
          },
          {
            "quote": "Some students has paid jobs after class.",
            "issue": "明确语法问题：复数主语 students 与 has 不一致。",
            "action": "使用 have，并检查文中其他主谓搭配。",
            "status": "需要补充"
          },
          {
            "quote": "It should therefore be required for all students.",
            "issue": "结论支持强制参与，与开头反对全面强制的立场冲突。",
            "action": "先确认你真正支持的立场，再使结论与主体一致。",
            "status": "需要补充"
          }
        ],
        "after": "Volunteering can help students practise communication with people outside their usual social circles.\n\nSome students have paid jobs after class.\n\nUniversities should therefore encourage volunteering without making it a requirement for every student.",
        "next": "换一道有关“大学生兼职”的题，先写立场和两句主题句，检查结论是否回应同一个立场。"
      },
      {
        "id": "transport",
        "name": "议论文｜合理表达不应硬改",
        "topic": "原创 Task 2 练习：Cities should spend more on public transport than on new roads. To what extent do you agree or disagree?",
        "source": "Some people argue that cities should spend more on buses and trains than on building new roads. I generally agree, although road maintenance should remain part of a transport budget. Public transport can help people who cannot drive and can use limited urban space more efficiently.\n\nA reliable bus service gives residents more choice. A person without a car can travel to a job interview or a medical appointment. This is particularly important when jobs and services are far from affordable housing. However, a cheap ticket is not enough on its own. If a bus arrives only once an hour, people may still need another way to travel. Investment should therefore include both reasonable fares and a useful timetable.\n\nTrains and buses can also carry many passengers in a relatively small amount of road space. This can reduce the need to park cars near busy centres. I do not think every passenger will stop driving, because some journeys involve several destinations or heavy equipment. Nevertheless, a frequent service on popular routes may make public transport a practical option for more people.\n\nNew roads can be helpful in some situations. A growing neighbourhood may need a safe connection to a hospital, and existing roads need repair. These projects should be assessed individually rather than rejected simply because public transport is important. The government should publish the expected benefits and explain which users each project will serve.\n\nIn conclusion, cities should give public transport a larger share of new investment while maintaining essential roads. Decisions should reflect the routes people actually need, and the results should be checked after a service begins. This approach offers a more balanced response than treating every road or every bus route as equally useful.",
        "evidence": [
          {
            "quote": "I generally agree, although road maintenance should remain part of a transport budget.",
            "issue": "立场有明确保留条件；不要因为它不是完全赞同就当作跑题。",
            "action": "检查主体是否分别支持公共交通优先与必要道路维护。",
            "status": "已有证据"
          },
          {
            "quote": "a cheap ticket is not enough on its own",
            "issue": "表达自然且与后文班次频率相关，没有必要强行替换成更生僻的词。",
            "action": "保留这句，重点检查例子是否充分。",
            "status": "已有证据"
          },
          {
            "quote": "the results should be checked after a service begins",
            "issue": "可以更具体，但不属于确定的语法错误。",
            "action": "可补充检查对象，例如等车时间；不要编造统计数据。",
            "status": "可选建议"
          }
        ],
        "after": "Decisions should reflect the routes people actually need. After a service begins, the city could check waiting times and passenger feedback to see whether it meets those needs.",
        "next": "找出自己文章中一处已经清楚自然的表达，说明为什么保留它，而不是一律换“高级词”。"
      },
      {
        "id": "remote",
        "name": "议论文｜空泛词与段落功能",
        "topic": "原创 Task 2 练习：Working from home is better than working in an office. To what extent do you agree or disagree?",
        "source": "Many people believe that working from home is better than working in an office. I think a flexible arrangement can be useful, but the best option depends on the job and the employee. A policy that offers some choice is more reasonable than a single rule for every worker.\n\nThe main advantage of home working is that employees can avoid a daily journey. They may use that time for rest or family responsibilities. For someone with a quiet room and a stable internet connection, it may also be easier to concentrate on a long writing task. These benefits do not apply equally to everyone, however. A person sharing a small flat may struggle to find a suitable space.\n\nWorking at home is very good and very useful for many workers. Good communication is very important and helps people work very well. Teams still need to coordinate their tasks and share information. A short scheduled meeting can help them agree on priorities, while written updates allow colleagues to read details at a convenient time. Too many meetings would remove some of the flexibility that home working is supposed to offer.\n\nAn office can be useful when a task requires equipment or close cooperation. New employees may also find it easier to ask questions when experienced colleagues are nearby. Employers could arrange office days for training or joint projects and allow independent tasks to be completed elsewhere. Such arrangements should be reviewed with employees rather than treated as permanent rules.\n\nIn conclusion, neither home nor office working is best in every situation. Employers should consider the work, the available space and the needs of the team. A flexible policy with clear communication can preserve useful contact while giving employees more control over their time.",
        "evidence": [
          {
            "quote": "Working at home is very good and very useful for many workers.",
            "issue": "good 和 useful 没有说明这一段新增的观点；上一段已经谈了优势。",
            "action": "将主题句改为本段的沟通条件，让段落承担不同功能。",
            "status": "需要补充"
          },
          {
            "quote": "Good communication is very important and helps people work very well.",
            "issue": "同一段重复 good、very，信息量较少。",
            "action": "直接说清怎样的沟通能支持什么任务。",
            "status": "需要补充"
          },
          {
            "quote": "A short scheduled meeting can help them agree on priorities",
            "issue": "已有具体机制，适合用来支持本段观点。",
            "action": "保留这个例子，再说明书面更新如何补充会议。",
            "status": "已有证据"
          }
        ],
        "after": "Remote teams need clear communication routines to coordinate their work. A short scheduled meeting can help them agree on priorities, while written updates let colleagues check details without adding more meetings.",
        "next": "用“原因—机制—例子”解释一个观点，每句提供不同信息，避免重复形容词。"
      }
    ],
    "lessons": [
      {
        "title": "01 / 提交完整题目和自己的原稿",
        "body": [
          "写作复盘先看你是否回答了题目，再看论证与表达。没有题目，AI 无法可靠判断任务回应。这个样例只处理 Task 2 文字作文，不处理图表识别，也不评估整场 IELTS 总分。",
          "解压实战包，将 practice-workspace 作为本地工作目录。先读取 samples/ielts-volunteer.md：其中有原创题目与完整练习作文。不要先读修改稿；用原稿体验如何发现问题。",
          "首版尚未经过雅思教师复核，因此只用作学习工作流示范。反馈参考四个官方维度组织，但不提供分数估计、考试认证或提分承诺。"
        ],
        "steps": [
          "下载并打开工作区，完成下方目录检查。",
          "让 Codex 读取 samples/ielts-volunteer.md，确认题目与正文分开。",
          "用中文概括题目要求和作者立场，再开始诊断。"
        ],
        "prompt": "请先列出当前工作目录，确认有 AGENTS.md、samples、resources 和 .agents/skills。只读取这些课程文件。告诉我找到的两个 Skill 名称；不要搜索其他目录，不修改全局配置。",
        "expected": "目录正确，题目和正文完整；助手能区分题目要求、文章立场与缺失材料。",
        "trouble": "如果你只粘贴了一个段落，助手应提供局部反馈，不评价整篇回应与结构。没有题目时先补题目。"
      },
      {
        "title": "02 / 从原句出发，只处理最重要的问题",
        "body": [
          "这一课观察三类问题：明确语法错误、论证或立场问题、可选表达建议。它们不能混在一起。比如复数主语配 has 可以明确指出；是否要换一个词则可能只是风格选择。",
          "预置志愿服务作文有一个刻意设置的立场冲突：开头反对全面强制，结论却说应该强制。先解决这一冲突，比替换几个高级词更重要。反馈应引用冲突位置，并请作者确认真实观点。",
          "优先处理三个问题。AI 给的局部示范只是辅助，你仍需要自己解释为什么修改。直接采用整篇改写，无法确认你是否掌握。"
        ],
        "steps": [
          "发送下面的诊断指令。",
          "逐条在原文找到引用，标记“明确问题／可选建议／待确认”。",
          "先选择一个问题自己修改；只在卡住时请求局部示范。"
        ],
        "prompt": "使用 $ielts-writing-coach 的首次诊断模式，读取 samples/ielts-volunteer.md。先核对题目和立场，再给最多三个优先问题。每条引用原句，区分明确错误和可选建议，不估分，不整篇代写。将结果按 resources/report-format.md 保存到 outputs/ielts-01.json，并另存 Markdown。",
        "expected": "每条问题都有原文依据与具体修改动作；不会因文章没有生僻词而扣“分”。",
        "trouble": "发现 AI 批评原文里不存在的句子时停止采用该条，让它重新定位。它若直接给分，提醒首版只做有依据的诊断。"
      },
      {
        "title": "03 / 自己修改，再检查有没有真正解决",
        "body": [
          "修改复查必须同时看到题目、原稿和修改稿。否则 AI 可能只是在重新批改新文章，而没有验证旧问题是否解决。原稿不能被覆盖。",
          "例如把 has 改成 have 可以解决局部主谓问题，但立场矛盾需要回看引言、主体和结论。修改结果用“已解决、部分解决、未解决、待确认”描述，比一条笼统的“进步很大”更有用。",
          "页面的修改对照只展示人工整理的教学片段，不代表真实学员成果。你的修改可以有多种合理写法，不要求逐字匹配样例。"
        ],
        "steps": [
          "复制原稿为 outputs/ielts-revision.md，自行修改三个重点问题。",
          "把原稿路径、修改稿路径和旧报告一起交给 Codex。",
          "将新的 JSON 导入“我的练习”，核对每个旧问题以及新增问题。"
        ],
        "prompt": "使用 $ielts-writing-coach 的修改复查模式，对照 samples/ielts-volunteer.md、outputs/ielts-revision.md 和 outputs/ielts-01.json。逐项说明旧问题是否解决及新问题。保留我的立场，不整篇重写。保存新报告 outputs/ielts-02.json；source 同时包含标注版本的原稿和修改稿，quote 必须逐字可定位。",
        "expected": "原稿仍在；每个重点问题都有复查结论，且引用对应版本的文字。",
        "trouble": "若模型将你的立场改成相反观点，恢复原稿并明确立场。改得更长或词更难，不自动等于更好。"
      },
      {
        "title": "04 / 换题练习，建立个人错误记录",
        "body": [
          "同一篇文章改好了，只说明这次修改完成。下一步要换题，独立写出同类结构，观察问题是否再次出现。模型不能仅凭两篇文章断言你的能力永久提升。",
          "resources/error-log.md 提供一个简单记录表：问题类型、原句、修改理由、复练题和复查结果。只保留反复出现且确认成立的问题，不把每条风格建议都变成禁令。",
          "使用交通题检查“合理表达是否被误改”，使用远程办公题检查“重复形容词与段落功能”。这些样例帮助你学会审查 AI，而不是被动接受全部批注。"
        ],
        "steps": [
          "选择一个确认成立的问题写进 error-log.md。",
          "让 Codex 给一个针对该问题的短练习，先不显示答案。",
          "完成后复查；再独立写新题段落，记录这次是否再次出现问题。"
        ],
        "prompt": "使用 $ielts-writing-coach 的专项练习模式，读取 outputs/ielts-02.json，只选一个已确认的问题。先给一道新题上的短练习，不给答案；等我作答再反馈。把实际结果记录到 outputs/error-log.md，不把练习完成写成考试提分。",
        "expected": "得到一份有原句、理由与复练记录的错误表；能够指出 AI 建议中一项应保留原表达的情况。",
        "trouble": "如果练习同时考太多内容，收窄到一个问题。若要使用数字估分或售卖教师级批改，先完成教师复核和独立样本验证。"
      }
    ]
  }
};
