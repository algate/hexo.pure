title: 三剑客-angular、vue、react比较
date: 2018-06-11 18:01:30
categories:
- 其他
tags:
- 三剑客
---

### 比较 Angular、React、Vue 三剑客
为 web 应用选择 JavaScript 开发框架是一件很费脑筋的事。现如今 Angular 和 React 非常流行，并且最近出现的新贵 VueJS 同样博得了很多人的关注。更重要的是，这只是一些新起之秀。

##### 在开始之前 —— 是否应用单页 Web 应用开发？首先你需要弄明白你需要单页面应用程序（SPA）还是多页面的方式。关于这个问题的详细内容请阅读我的博客文章，“单页面应用程序（SPA）与多页 Web 应用程序（MPA）”。

具体对比分析：
<!-- more -->
* |单页面应用（SinglePage Web Application，SPA）| 多页面应用（MultiPage Application，MPA）
---|---|---
组成|一个外壳页面和多个页面片段组成|多个完整页面构成
资源共用(css,js)|共用，只需在外壳部分加载|不共用，每个页面都需要加载
刷新方式|页面局部刷新或更改|整页刷新
url 模式|a.com/#/pageone  a.com/#/pagetwo|a.com/pageone.html  a.com/pagetwo.html
用户体验|页面片段间的切换快，用户体验良好|页面切换加载缓慢，流畅度不够，用户体验比较差
转场动画|容易实现|无法实现
数据传递|容易|依赖 url传参、或者cookie 、localStorage等
搜索引擎优化(SEO)|需要单独方案、实现较为困难、不利于SEO检索 可利用服务器端渲染(SSR)优化|实现方法简易
试用范围|高要求的体验度、追求界面流畅的应用|适用于追求高度支持搜索引擎的应用
开发成本|较高，常需借助专业的框架|较低 ，但页面重复代码多
维护成本|相对容易|相对复杂

以下是我们今天要解决的问题：

    这些框架或库有多成熟？
    这些框架只会火热一时吗？
    这些框架相应的社区规模有多大，能得到多少帮助？
    找到每个框架开发者容易吗？
    这些框架的基本编程概念 是什么？
    对于小型或大型应用程序，框架是否易用？
    每个框架学习曲线什么样？
    你期望这些框架的性能怎么样？
    在哪能仔细了解底层原理？
    你可以用你选择的框架开发吗？

##### 生命周期与战略考虑
`Angular`
是基于 TypeScript 的 Javascript 框架。由 Google 进行开发和维护，它被描述为“超级厉害的 JavaScript MVW 框架”。Angular（也被称为 “Angular 2+”，“Angular 2” 或者 “ng2”）已被重写，是与 AngularJS（也被称为 “Angular.js” 或 “AngularJS 1.x”）不兼容的后续版本。当 AngularJS（旧版本）最初于2010年10月发布时，仍然在修复 bug，等等 —— 新的 Angular（sans JS）于 2016 年 9 月推出版本 2。最新的主版本是 4，因为版本 3 被跳过了。Google，Vine，Wix，Udemy，weather.com，healthcare.gov 和 Forbes 都使用 Angular（根据 madewithangular，stackshare 和 libscore.com 提供的数据）。

`React`
被描述为 “用于构建用户界面的 JavaScript 库”。React 最初于 2013 年 3 月发布，由 Facebook 进行开发和维护，Facebook 在多个页面上使用 React 组件（但不是作为单页应用程序）。根据 Chris Cordle 这篇文章的统计，React 在 Facebook 上的使用远远多于 Angular 在 Google 上的使用。React 还被 Airbnb，Uber，Netflix，Twitter，Pinterest，Reddit，Udemy，Wix，Paypal，Imgur，Feedly，Stripe，Tumblr，Walmart 等使用（根据 Facebook, stackshare 和 libscore.com 提供的数据）。
Facebook 正在开发 React Fiber。它会改变 React 的底层 - 渲染速度应该会更快 - 但是在变化之后，版本会向后兼容。Facebook 将会在 2017 年 4 月的开发者大会上讨论新变化，并发布一篇非官方的关于新架构的文章。React Fiber 可能与 React 16 一起发布。

`Vue`
是 2016 年发展最为迅速的 JS 框架之一。Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 MVVM 框架”。它于 2014 年 2 月首次由 Google 前员工 Evan You 发布（顺便说一句：尤雨溪那时候发表了一篇 vue 发布首周的营销活动和数据的博客文章）。尤其是考虑到 Vue 在没有大公司的支持的情况下，作为一个人开发的框架还能获得这么多的吸引力，这无疑是非常成功的。尤雨溪目前有一个包含数十名核心开发者的团队。2016 年，版本 2 发布。Vue 被阿里巴巴，百度，Expedia，任天堂，GitLab 使用 — 可以在 madewithvuejs.com 找到一些小型项目的列表。

Angular 和 Vue 都遵守 MIT license 许可，而 React 遵守 BSD3-license 许可证。在专利文件上有很多讨论。James Ide（前 Facebook 工程师）解释专利文件背后的原因和历史：Facebook 的专利授权是在保护自己免受专利诉讼的能力的同时分享其代码。专利文件被更新了一次，有些人声称，如果你的公司不打算起诉 Facebook，那么使用 React 是可以的。你可以在 Github 的这个 issue 上 查看讨论。我不是律师，所以如果 React 许可证对你或你的公司有问题，你应该自己决定。关于这个话题还有很多文章：Dennis Walsh 写到，你为什么不该害怕。Raúl Kripalani 警告：反对创业公司使用 React，他还写了一篇备忘录概览。此外，Facebook 上还有一个最新的声明：解释 React 的许可证。

##### 核心开发
如前所述，Angular 和 React 得到大公司的支持和使用。Facebook，Instagram 和 WhatsApp 正在它们的页面使用 React。Google 在很多项目中使用 Angular，例如，新的 Adwords 用户界面是使用 Angular 和 Dart。然而，Vue 是由一群通过 Patreon 和其他赞助方式支持的个人实现的，是好坏你自己确定。Matthias Götzke 认为 Vue 小团队的好处是用了更简洁和更少的过度设计的代码或 API。
我们来看看一些统计数据：Angular 在团队介绍页列出 36 人，Vue 列出 16 人，而 React 没有团队介绍页。在 Github 上，Angular 有 25,000+ 的 star 和 463 位代码贡献者，React 有 70,000+ 的 star 和 1,000+ 位代码贡献者，而 Vue 有近 60,000 的 star 和只有 120 位代码贡献者。你也可以查看 Angular，React 和 Vue 的 Github Star 历史。又一次说明 Vue 的趋势似乎很好。根据 bestof.js 提供的数据显示，在过去三个月 Angular 2 平均每天获得 31 个 star，React 74 个，Vue.JS 107 个。

那我们试试别的吧。ThoughtWorks 的 Technology Radar 技术随时间推移的变化。ThoughtWorks 的 Technology Radar 随着时间推移，技术的演进过程给人深刻的印象。Redux 是在采用阶段（被 ThoughtWorks 项目采用的！），它在许多 ThoughtWorks 项目中的价值是不可估量的。Vue.js 是在试用阶段（被试着用的）。Vue被描述为具有平滑学习曲线的，轻量级并具灵活性的Angular的替代品。Angular 2 是正在处于评估阶段 使用 —— 已被 ThoughtWork 团队成功实践，但是还没有被强烈推荐。

根据 2017 年 Stackoverflow 的最新调查，被调查的开发者中，喜爱 React 有 67%，喜欢 AngularJS 的有 52%。“没有兴趣在开发中继续使用”的开发者占了更高的数量，AngularJS（48%）和 React（33%）。在这两种情况下，Vue 都不在前十。然后是 statejs.com 关于比较 “前端框架” 的调查。最有意思的事实是：React 和 Angular 有 100% 的认知度，23% 的受访者不了解 Vue。关于满意度，92% 的受访者愿意“再次使用” React ，Vue 有 89% ,而 Angular 2 只有 65%。

##### 长期支持和迁移
Facebook 在其设计原则中指出，React API 非常稳定。还有一些脚本可以帮助你从当前的API移到更新的版本：请查阅 react-codemod。迁移是非常容易的，没有这样的东西（需要）作为长期支持的版本。在 Reddit 这篇文章中指出，人们看到到升级从来不是问题。React 团队写了一篇关于他们版本控制方案的博客文章。当他们添加弃用警告时，在下一个主要版本中的行为发生更改之前，他们会保留当前版本的其余部分。没有计划更改为新的主要版本 - v14 于 2015 年 10 月发布，v15 于 2016 年 4 月发布，而 v16 还没有发布日期。（译者注：v16 于 2017 年 9 月底发布）最近 React核心开发人员指出，升级不应该是一个问题。

关于 Angular，从 v2 发布开始，有一篇关于版本管理和发布 Angular 的博客文章。每六个月会有一次重大更新，至少有六个月的时间（两个主要版本）。在文档中有一些实验性的 API 被标记为较短的弃用期。目前还没有官方公告，但根据这篇文章，Angular 团队已经宣布了以 Angular 4 开始的长期支持版本。这些将在下一个主要版本发布之后至少一年得到支持。这意味着至少在 2018 年 9 月之前，将支持 Angular 4，并提供 bug 修复和重要补丁。在大多数情况下，将 Angular 从 v2 更新到 v4 与更新 Angular 依赖关系一样简单。Angular 还提供了有关是否需要进一步更改的信息指南。

Vue 1.x 到 2.0 的更新过程对于一个小应用程序来说应该很容易 - 开发者团队已经声称 90% 的 API 保持不变。在控制台上有一个很好的升级 - 诊断迁移 - 辅助工具。一位开发人员指出，从 v1 到 v2 的更新在大型应用程序中仍然没有挑战。不幸的是，关于 LTS 版本的下一个主要版本或计划信息没有清晰的（公共）路径。
还有一件事：Angular 是一个完整的框架，提供了很多捆绑在一起的东西。React 比 Angular 更灵活，你可能会使用更多独立的，不稳定的，快速更新的库 - 这意味着你需要自己维护相应的更新和迁移。如果某些包不再被维护，或者其他一些包在某些时候成为事实上的标准，这也可能是不利的。

#### React，Angular 和 Vue 的比较

##### 组件
我们所讨论的框架都是基于组件的。一个组件得到一个输入，并且在一些内部的行为/计算之后，它返回一个渲染的 UI 模板（一个登录/注销区或一个待办事项列表项）作为输出。定义的组件应该易于在网页或其他组件中重用。例如，你可以使用具有各种属性（列，标题信息，数据行等）的网格组件（由一个标题组件和多个行组件组成），并且能够在另一个页面上使用具有不同数据集的组件。这里有一篇关于组件的综合性文章，如果你想了解更多这方面的信息。
React 和 Vue 都擅长处理组件：小型的无状态的函数接收输入和返回元素作为输出。

##### Typescript，ES6 与 ES5React
专注于使用 Javascript ES6。Vue 使用 Javascript ES5 或 ES6。
Angular 依赖于 TypeScript。这在相关示例和开源项目中提供了更多的一致性（React 示例可以在 ES5 或 ES6 中找到）。这也引入了像装饰器和静态类型的概念。静态类型对于代码智能工具非常有用，比如自动重构，跳转到定义等等 - 它们也可以减少应用程序中的错误数量，尽管这个话题当然没有共识。Eric Elliott 在他的文章 “静态类型的令人震惊的秘密” 中不同意上面的观点。Daniel C Wang 表示，使用静态类型并没有什么坏处，同时有测试驱动开发（TDD）和静态类型挺好的。
你也应该知道你可以使用 Flow 在 React 中启用类型检查。这是 Facebook 为 JavaScript 开发的静态类型检查器。Flow 也可以集成到 VueJS 中。
如果你在用 TypeScript 编写代码，那么你不需要再编写标准的 JavaScript 了。尽管它在不断发展，但与整个 JavaScript 语言相比，TypeScript 的用户群仍然很小。一个风险可能是你正在向错误的方向发展，因为 TypeScript 可能 - 也许不太可能 - 随着时间的推移也会消失。此外，TypeScript 为项目增加了很多（学习）开销 - 你可以在 Eric Elliott 的 Angular 2 vs. React 比较 中阅读更多关于这方面的内容。
更新: James Ravenscroft 在对这篇文章的评论中写道，TypeScript 对 JSX 有一流的支持 - 可以无缝地对组件进行类型检查。所以，如果你喜欢 TypeScript 并且你想使用 React，这应该不成问题。

##### 模板 —— JSX 还是 HTMLReact
打破了长期以来的最佳实践。几十年来，开发人员试图分离 UI 模板和内联的 Javascript 逻辑，但是使用 JSX，这些又被混合了。这听起来很糟糕，但是你应该听彼得·亨特（Peter Hunt）的演讲 “React：反思最佳实践”（2013 年 10 月）。他指出，分离模板和逻辑仅仅是技术的分离，而不是关注的分离。你应该构建组件而不是模板。组件是可重用的、可组合的、可单元测试的。
JSX 是一个类似 HTML 语法的可选预处理器，并随后在 JavaScript 中进行编译。JSX 有一些怪癖 —— 例如，你需要使用 className 而不是 class，因为后者是 Javascript 的保留字。JSX 对于开发来说是一个很大的优势，因为代码写在同一个地方，可以在代码完成和编译时更好地检查工作成果。当你在 JSX 中输入错误时，React 将不会编译，并打印输出错误的行号。Angular 2 在运行时静默失败（如果使用 Angular 中的预编译，这个参数可能是无效的）。
JSX 意味着 React 中的所有内容都是 Javascript -- 用于JSX模板和逻辑。Cory House 在 2016 年 1 月的文章 中指出：“Angular 2 继续把 'JS' 放到 HTML 中。React 把 'HTML' 放到 JS 中。“这是一件好事，因为 Javascript 比 HTML 更强大。
Angular 模板使用特殊的 Angular 语法（比如 ngIf 或 ngFor）来增强 HTML。虽然 React 需要 JavaScript 的知识，但 Angular 会迫使你学习 Angular 特有的语法。
Vue 具有“单个文件组件”。这似乎是对于关注分离的权衡 - 模板，脚本和样式在一个文件中，但在三个不同的有序部分中。这意味着你可以获得语法高亮，CSS 支持以及更容易使用预处理器（如 Jade 或 SCSS）。我已经阅读过其他文章，JSX 更容易调试，因为 Vue 不会显示不规范 HTML 的语法错误。这是不正确的，因为 Vue 转换 HTML 来渲染函数 - 所以错误显示没有问题（感谢 Vinicius Reis 的评论和更正！）。
>旁注：如果你喜欢 JSX 的思路，并想在 Vue 中使用它，可以使用 babel-plugin-transform-vue-jsx。

##### 框架和库
Angular 是一个框架而不是一个库，因为它提供了关于如何构建应用程序的强有力的约束，并且还提供了更多开箱即用的功能。Angular 是一个 “完整的解决方案” - 功能齐全，你可以愉快的开始开发。你不需要研究库，路由解决方案或类似的东西 - 你只要开始工作就好了。
另一方面，React 和 Vue 是很灵活的。他们的库可以和各种包搭配。（在 npm 上有很多 React 的包，但 Vue 的包比较少，因为毕竟这个框架还比较新）。有了 React，你甚至可以交换库本身的 API 兼容替代品，如 Inferno。然而，灵活性越大，责任就越大 - React 没有规则和有限的指导。每个项目都需要决定架构，而且事情可能更容易出错。
另一方面，Angular 还有一个令人困惑的构建工具，样板，检查器（linter）和时间片来处理。如果使用项目初始套件或样板，React 也是如此。他们自然是非常有帮助的，但是 React 可以开箱即用，这也许是你应该学习的方式。有时，在 JavaScript 环境中工作要使用各种工具被称为 “Javascript 疲劳症”。Eric Clemmons 在他的文章 中说：

当开始使用框架，还有一堆安装的工具，你可能会不习惯。这些都是框架生成的。很多开发人员不明白，框架内部发生了什么 —— 或者需要花费很多时间才能搞明白。

Vue 似乎是三个框架中最轻量的。GitLab 有一篇关于 Vue.js（2016 年 10 月）的决定的博客文章：

Vue.js 完美的兼顾了它将为你做什么和你需要做什么。（...）Vue.js 始终是可及的，一个坚固，但灵活的安全网，保证编程效率和把操作 DOM 造成的痛苦降到最低。

他们喜欢简单易用 —— 源代码非常易读，不需要任何文档或外部库。一切都非常简单。Vue.js “对任何东西都不做大的假设”。还有一个关于 GitLab 决定的播客节目。
另一个来自 Pixeljets 的关于向 Vue 转变的博文。React “是 JS 界在意识层面向前迈出的一大步，它以一种实用简洁的方式向人们展示了真正的函数式编程。和 Vue 相比，React 的一大缺点是由于 JSX 的限制，组件的粒度会更小。这里是文章的引述：

对于我和我的团队来说，代码的可读性是很重要的，但编写代码很有趣也是非常重要的。在实现真正简单的计算器小部件时创建 6 个组件并不奇怪。在许多情况下，在维护，修改或对某个小部件进行可视化检查方面也是不好的，因为你需要绕过多个文件/函数并分别检查每个小块的 HTML。再次，我不是建议写巨石 - 我建议在日常开发中使用组件而不是微组件。

关于 Hacker news 和 Reddit 上的博客文章有趣的讨论 - 有来自 Vue 的持异议者和进一步支持者的争论。
状态管理和数据绑定构建用户界面很困难，因为处处都有状态 - 随着时间的推移而变化的数据带来了复杂性。定义的状态工作流程对于应用程序的增长和复杂性有很大的帮助。对于复杂度不大的应用程序，就不必定义的状态流了，像原生 JS 就足够了。
它是如何工作的？组件在任何时间点描述 UI。当数据改变时，框架重新渲染整个 UI 组件 - 显示的数据始终是最新的。我们可以把这个概念称为“ UI 即功能”。
React 经常与 Redux 在一起使用。Redux 以三个基本原则来自述：

单一数据源（Single source of truth）
State 是只读的（State is read-only）
使用纯函数执行修改（Changes are made with pure functions）

换句话说：整个应用程序的状态存储在单个 store 的状态树中。这有助于调试应用程序，一些功能更容易实现。状态是只读的，只能通过 action 来改变，以避免竞争条件（这也有助于调试）。编写 Reducer 来指定如何通过 action 来转换 state。
大多数教程和样板文件都已经集成了 Redux，但是如果没有它，你可以使用 React（你可能不需要在你的项目中使用 Redux）。Redux 在代码中引入了复杂性和相当强的约束。如果你正在学习React，那么在你要使用 Redux 之前，你应该考虑学习纯粹的 React。你绝对应该阅读 Dan Abramov 的“你可能不需要 Redux”。
有些开发人员 建议使用 Mobx 代替 Redux。你可以把它看作是一个 “自动的 Redux”，这使得事情一开始就更容易使用和理解。如果你想了解，你应该从介绍开始。你也可以阅读 Robin 的 Redux 和 MobX 的比较。他还提供了有关从 Redux 迁移到 MobX 的信息。如果你想查找其他 Flux 库，这个列表非常有用。如果你是来自 MVC 的世界，那么你应该阅读 Mikhail Levkovsky 的文章“Redux 中的思考（当你所知道的是 MVC）”。
Vue 可以使用 Redux，但它提供了 Vuex 作为自己的解决方案。
React 和 Angular 之间的巨大差异是 单向与双向绑定。当 UI 元素（例如，用户输入）被更新时，Angular 的双向绑定改变 model 状态。React 只有一种方法：先更新 model，然后渲染 UI 元素。Angular 的方式实现起来代码更干净，开发人员更容易实现。React 的方式会有更好的数据总览，因为数据只能在一个方向上流动（这使得调试更容易）。
这两个概念各有优劣。你需要了解这些概念，并确定这是否会影响你选择框架。文章“双向数据绑定：Angular 2 和 React”和这个 Stackoverflow 上的问题都提供了一个很好的解释。在这里你可以找到一些交互式的代码示例（3 年前的示例（，只适用于 Angular 1 和 React）。最后，Vue 支持单向绑定和双向绑定（默认为单向绑定）。
如果你想进一步阅读，这有一篇长文，是有关状态的不同类型和 Angular 应用程序中的状态管理（Victor Savkin）。
其他的编程概念Angular 包含依赖注入（dependency injection），即一个对象将依赖项（服务）提供给另一个对象（客户端）的模式。这导致更多的灵活性和更干净的代码。文章 “理解依赖注入” 更详细地解释了这个概念。
模型 - 视图 - 控制器模式（MVC）将项目分为三个部分：模型，视图和控制器。Angular（MVC 模式的框架）有开箱即用的 MVC 特性。React 只有 V —— 你需要自己解决 M 和 C。
灵活性与精简到微服务你可以通过仅仅添加 React 或 Vue 的 JavaScript 库到你的源码中的方式去使用它们。但是由于 Angular 使用了 TypeScript，所以不能这样使用 Angular。
现在我们正在更多地转向微服务和微应用。React 和 Vue 通过只选择真正需要的东西，你可以更好地控制应用程序的大小。它们提供了更灵活的方式去把一个老应用的一部分从单页应用（SPA）转移到微服务。Angular 最适合单页应用（SPA），因为它可能太臃肿而不能用于微服务。
正如 Cory House 所说:

JavaScript 发展速度很快，而且 React 可以让你将应用程序的一小部分替换成更好用的 JS 库，而不是期待你的框架能够创新。小巧，可组合的单一用途工具的理念永远不会过时。

有些人对非单页的网站也使用 React（例如复杂的表单或向导）。甚至 Facebook 都没有把 React 用在 Facebook 的主页，而是用在特定的页面，实现特定的功能。
体积和性能任何框架都不会十全十美：Angular 框架非常臃肿。gzip 文件大小为 143k，而 Vue 为 23K，React 为 43k。
为了提高性能，React 和 Vue 都使用了虚拟 DOM（Virtual DOM）。如果你对此感兴趣，可以阅读虚拟 DOM 和 DOM 之间的差异以及 react.js 中虚拟 DOM 的实际优势。此外，虚拟 DOM 的作者之一在 Stackoverflow 上回答了性能的相关问题。
为了检查性能，我看了一下最佳的 js 框架基准。你可以自己下载并运行它，或者查看交互式结果表。

Angular，React 和 Vue 性能比较（源文件）

内存分配（源文件）
总结一下：Vue 有着很好的性能和高深的内存分配技巧。如果比较快慢的话，这些框架都非常接近（比如 Inferno）。请记住，性能基准只能作为考虑的附注，而不是作为判断标准。
测试Facebook 使用 Jest 来测试其 React 代码。这里有篇 Jest 和 Mocha 之间的比较的文章 —— 还有一篇关于 Enzyme 和 Mocha 如何一起使用 的文章。Enzyme 是 Airbnb 使用的 JavaScript 测试工具（与 Jest，Karma 和其他测试框架一起使用）。如果你想了解更多，有一些关于在 React（这里和这里）测试的旧文章。
Angular 2 中使用 Jasmine 作为测试框架。Eric Elliott 在一篇文章中抱怨说 Jasmine “有数百种测试和断言的方式，需要仔细阅读每一个，来了解它在做什么”。输出也是非常臃肿和难以阅读。有关 Angular 2 与 Karma 和 Mocha 的整合的一些有用的文章。这里有一个关于 Angular 2 测试策略的旧视频（从2015年起）。
Vue 缺乏测试指导，但是 Evan 在 2017 年的展望中写道，团队计划在这方面开展工作。他们推荐使用 Karma。Vue 和 Jest 结合使用，还有 avoriaz 作为测试工具。
通用与原生 app通用 app 正在将应用程序引入 web、搬上桌面，同样将深入原生 app 的世界。
React 和 Angular 都支持原生开发。Angular 拥有用于原生应用的 NativeScript（由 Telerik 支持）和用于混合开发的 Ionic 框架。借助 React，你可以试试 react-native-renderer 来构建跨平台的 iOS 和 Android 应用程序，或者用 react-native 开发原生 app。许多 app（包括 Facebook；查看更多的展示）都是用 react-native 构建的。
Javascript 框架在客户端上渲染页面。这对于性能，整体用户体验和 SEO 是不利的。服务器端预渲染是一个好办法。所有这三个框架都有相应的库来实现服务端渲染。React 有 next.js，Vue 有 nuxt.js，而 Angular 有...... Angular Universal。
学习曲线Angular 的学习曲线确实很陡。它有全面的文档，但你仍然可能被吓哭，因为说起来容易做起来难。即使你对 Javascript 有深入的了解，也需要了解框架的底层原理。去初始化项目是很神奇的，它会引入很多的包和代码。因为有一个大的，预先存在的生态系统，你需要随着时间的推移学习，这很不利。另一方面，由于已经做出了很多决定，所以在特定情况下可能会很好。对于 React，你可能需要针对第三方库进行大量重大决策。仅仅 React 中就有 16 种不同的 flux 软件包来用于状态管理可供选择。
Vue 学习起来很容易。公司转向 Vue 是因为它对初级开发者来说似乎更容易一些。这里有一片说他们团队为什么从 Angular 转到 Vue的文章。另一位用户表示，他公司的 React 应用程序非常复杂，以至于新开发人员无法跟上代码。有了 Vue，初级和高级开发人员之间的差距缩小了，他们可以更轻松地协作，减少 bug，减少解决问题的时间。
有些人说他们用 React 做的东西比用 Vue 做的更好。如果你是一个没有经验的 Javascript 开发人员 - 或者如果你在过去十年中主要使用 jQuery，那么你应该考虑使用 Vue。转向 React 时，思维方式的转换更为明显。Vue 看起来更像是简单的 Javascript，同时也引入了一些新的概念：组件，事件驱动模型和单向数据流。这同样是很小的部分。
同时，Angular 和 React 也有自己的实现方式。它们可能会限制你，因为你需要调整自己的做法，才能顺畅的开发。这可能是一个缺点，因为你不能随心所欲，而且学习曲线陡峭。这也可能是一个好处，因为你在学习技术时必须学习正确的概念。用 Vue，你可以用老方法来做。这一开始可能会比较容易上手，但长此以往会出现问题。
在调试方面，React 和 Vue 的黑魔法更少是一个加分项。找出 bug 更容易，因为需要看的地方少了，堆栈跟踪的时候，自己的代码和那些库之间有更明显的区别。使用 React 的人员报告说，他们永远不必阅读库的源代码。但是，在调试 Angular 应用程序时，通常需要调试 Angular 的内部来理解底层模型。从好的一面来看，从 Angular 4 开始，错误信息应该更清晰，更具信息性。
Angular, React 和 Vue 底层原理你想自己阅读源代码吗？你想看看事情到底是怎么样的吗？
可能首先要查看 Github 仓库: React（github.com/facebook/re…）、Angular（github.com/angular/ang…）和 Vue（github.com/vuejs/vue）。
语法看起来怎么样？ValueCoders 比较 Angular，React 和 Vue 的语法。
在生产环境中查看也很容易 —— 连同底层的源代码。TodoMVC 列出了几十个相同的 Todo 应用程序，用不同的 Javascript 框架编写 —— 你可以比较 Angular，React 和 Vue 的解决方案。RealWorld 创建了一个真实世界的应用程序（中仿），他们已经准备好了 Angular（4+）和 React（带 Redux ）的解决方案。Vue 的开发正在进行中。
你可以看到许多真实的 app，以下是 React 的方案：

Do（一款很好用的笔记管理 app，用 React 和 Redux 实现）
sound-redux（用 React 和 Redux 实现的 Soundcloud 客户端）
Brainfock（用 React 实现的项目和团队管理解决方案）
react-hn 和 react-news（仿 Hacker news）
react-native-whatsapp-ui 和 教程（仿 Whatsapp 的 react-native 版）
phoenix-trello（仿 Trello）
slack-clone 和其他教程 (仿Slack)

以下是 Angular 版的 app：

angular2-hn 和 hn-ng2（仿 Hacker News，另一个由 Ashwin Sureshkumar 创建的很好的教程）
Redux-and-angular-2（仿 Twitter）

以下是 Vue 版的 app：

vue-hackernews-2.0 和 Loopa news（仿Hacker News）
vue-soundcloud（Soundcloud 演示）
