title: Sublime完美配置 for myself
date: 2016-03-25 17:31:30
categories:
- 工具
tags:
- sublime
banner: /hexo.pure/images/posts/sublime.jpg
---
### 插件安装

需要注意的是，为了避免安装的目录乱，直接下载 portbale version

#### 1.安装插件管理器

ctrl+\` 打开调试窗口，在输入框内粘贴如下代码，然后回车即可自动安装，安装完成可能需要重启ST。

Code:

    import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

回车，稍等片刻就好了，会有提示。
<!-- more -->
#### 2.搜索安装插件快捷调用

这样就可以使用package control 进行插件安装了，ctrl+shift+p。输入install package，回车

弹出搜索框：输入要安装插件的name，回车就会安装，安装的时候，左下角会有 = 左右移动，说明在安装了，如果没有任何提示，那说明没有开始安装，就要找别的方法了。（太费事了，具体自己到网上搜索方法吧！）

>[info] 如果要移除package，c+s+p，输入remove package……

#### 3.基础用户设置

网上现在的教程都是比较老的，
![](/hexo.pure/images/posts/sublime/01.png)
如图所示，只有一个settings，没错，直接点击就行了，新窗口，左边为default设置，是不允许更改的，右边为user设置，自己可以更改：

我的默认设置：
``` json
{
    "auto_find_in_selection": true,
    "bold_folder_labels": true,
    "color_scheme": "Packages/User/SublimeLinter/Monokai (SL).tmTheme",
    "default_line_ending": "unix",
    "disable_tab_abbreviations": true,
    "draw_minimap_border": true,
    "ensure_newline_at_eof_on_save": true,
    "fade_fold_buttons": false,
    "font_face": "Microsoft YaHei Mono",
    "font_size": 14,
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "ignored_packages":
    [
        "Vintage"
    ],
    "save_on_focus_lost": true,
    "tab_size": 4,
    "theme": "Default.sublime-theme",
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "word_wrap": "true"
}
```
trim_trailing_white_space_on_save，自动移除行尾多余空格，处女座更安心了。

ensure_newline_at_eof_on_save，文件末尾自动保留一个空行，懂的人自然知道它的用处。

font_face 设置字体。Microsoft YaHei Mono 是一款混合字体，专为代码优化，看起来很舒服。当然你也可以使用你自己喜欢的字体，或者删掉本行，使用默认字体。

disable_tab_abbreviations 设置为 true ，禁用 Emmet 的 tab 键功能（请使用 ctrl+e），系统自带的 tab 功能还是可圈可点的。当然你也可以不设置它，以完全使用 Emmet 的 tab 补全功能。

translate_tabs_to_spaces 很明白就是把代码 tab 对齐转换为空格对齐，tab_size 配合设置空格数。这个需求因人而异了，不喜欢可以去掉。

draw_minimap_border，用于右侧代码预览时给所在区域加上边框，方便识别。

save_on_focus_lost，窗口失焦立即保存文件，嘛嘛再也不用担心你忘记保存了。

highlight_line，当前行高亮。word_wrap，设置自动换行。

fade_fold_buttons，默认显示行号右侧的代码段闭合展开三角号。

bold_folder_labels，侧边栏文件夹显示加粗，区别于文件。

highlight_modified_tabs，高亮未保存文件。

default_line_ending: “unix”, 使用 unix 风格的换行符。

auto_find_in_selection: true ，开启选中范围内搜索（而不是整个文档

#### 4.ChineseLocalization

完全汉化插件（不懂英文的福利，我也是在2018年春节前发现的。网上无意中看到的，我的英文还算ok吧，也没太在意这个插件）

#### 5.Emmet，前端神器
默认情况下使用快捷键ctrl+e可以自动扩展成适应于react的className形式。而使用tab来默认拓展则需要通过修改sublime快捷键，如下所示：
打开 preferences -> Key bindings - Users，把下面代码复制到[]内部。

```
{
  "keys": ["tab"],
  "command": "expand_abbreviation_by_tab",

  // put comma-separated syntax selectors for which
  // you want to expandEmmet abbreviations into "operand" key
  // instead of SCOPE_SELECTOR.
  // Examples: source.js, text.html - source
  "context": [
    {
      "operand": "source.js",
      "operator": "equal",
      "match_all": true,
      "key": "selector"
    },

    // run only if there's no selected text
    {
      "match_all": true,
      "key": "selection_empty"
    },

    // don't work if there are active tabstops
    {
      "operator": "equal",
      "operand": false,
      "match_all": true,
      "key": "has_next_field"
    },

    // don't work if completion popup is visible and you
    // want to insert completion with Tab. If you want to
    // expand Emmet with Tab even if popup is visible --
    // remove this section
    {
      "operand": false,
      "operator": "equal",
      "match_all": true,
      "key": "auto_complete_visible"
    },
    {
      "match_all": true,
      "key": "is_abbreviation"
    }
  ]
}
```

#### 6.SideBarEnhancements ，增强型侧边栏

![](/hexo.pure/images/posts/sublime/02.png)

如上图打开之后输入：

``` json
[
    // { "keys": ["ctrl+shift+c"], "command": "copy_path" },
    // firefox
    { "keys": ["f1"], "command": "side_bar_files_open_with",
             "args": {
                "paths": [],
                "application": "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe",
                "extensions":".*" //匹配任何文件类型
            }
    },
    //chrome
    { "keys": ["f2"], "command": "side_bar_files_open_with",
            "args": {
                "paths": [],
                "application": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                "extensions":".*"
            }
     },
    //ie
     { "keys": ["f3"], "command": "side_bar_files_open_with",
             "args": {
                "paths": [],
                "application": "C:\\Program Files\\Internet Explorer\\iexplore.exe",
                "extensions":".*"
            }
    },
    //safari
    { "keys": ["f4"], "command": "side_bar_files_open_with",
            "args": {
                "paths": [],
                "application": "C:\\software\\Browser\\Safari\\safari.exe",
                "extensions":".*"
            }
     },
     //opera
     { "keys": ["f5"], "command": "side_bar_files_open_with",
             "args": {
                "paths": [],
                "application": "C:\\software\\Browser\\opera\\opera.exe",
                "extensions":".*"
            }
    }
]
```

#### 7. HTML/CSS/js Prettify


然后找到这个文件文件夹

tools->HTML/CSS/JS Prettify->set prettify preference
修改文件目录（sublime版本）
![](/hexo.pure/images/posts/sublime/03.png)
修改路径：
![](/hexo.pure/images/posts/sublime/04.png)

找到这一样代码后面添加 vue

"allowed_file_extensions": ["htm", "html", "xhtml", "shtml", "xml", "svg", "vue"],

#### 7.1 vue syntax highlight
识别vue高亮。（wepy文件.wpy 文件后缀为.wpy，可共用Vue的高亮规则）
重新打开sublime就可以识别了。语法选中项为vue-component


#### 8.ConvertToUTF8
功能：文件转码成utf-8

简介：通过本插件，您可以编辑并保存目前编码不被 Sublime Text 支持的文件，特别是中日韩用户使用的 GB2312，GBK，BIG5，EUC-KR，EUC-JP ，ANSI等。ConvertToUTF8 同时支持 Sublime Text 2 和 3。

使用：安装插件后自动转换为utf-8格式

#### 9.IMESupport

功能：sublime中文输入法

简介：还在纠结 Sublime Text 中文输入法不能跟随光标吗？试试「IMESupport 」这个插件吧！目前只支持 Windows，在搜索等界面不能很好的跟随光标。

使用：Ctrl + Shift + P →输入pci →输入IMESupport →回车

#### 10.最新版sublime主题、字体相关设置：

preferences（首选项） -> color（配色方案）->弹出下图所示，选择monokai extended就ok了
![](/hexo.pure/images/posts/sublime/05.png)

修改左侧边栏样式：（继续往下看，不要着急操作）
preferences（首选项） -> theme（主题方案）->弹出下图所示，选择Default.sublime-theme
![](/hexo.pure/images/posts/sublime/06.png)

但是这个只是选择默认样式，如何修改呢。继续往下看：

>[warning] （默认的配置文件是不允许你修改的，你也找不到的，需要插件来查找和修改）

（1）安装插件 PackageResourceViewer
（2）打开 Open Resource
（3）找到 Theme - Default，回车
（4）找打 Default.sublime-theme，回车打开
（5）搜索 ‘sidebar_label’ 并且修改找到的第一个（在362行）,添加 ‘ "font.size": 14’，保存即可
其他相关颜色，背景等搜索网络教程解决吧。

#### 11.为了省去更改侧边栏样式的问题，直接更改主题是最快的方式，需要安装相关插件
 搜索 theme 可以发现有很多的主题， 网上推荐这个 Afterglow 不错（可显示侧边栏小图标）
 改之前的效果：（10-相关操作之后的样式 + sidebar）
![](/hexo.pure/images/posts/sublime/07.png)
Welcome to Afterglow Theme
  To activate the theme, add or replace your current theme settings with the code below.
  安装完afterglow之后，会有package control message。关于插件的相关信息，如果要修改需要设置里添加相关信息
``` json
  Settings for Afterglow
  {
      "theme": "Afterglow.sublime-theme",
      "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme"
  }

  Settings for Afterglow-blue
  {
      "theme": "Afterglow-blue.sublime-theme",
      "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme"
  }

  Settings for Afterglow-magenta
  {
      "theme": "Afterglow-magenta.sublime-theme",
      "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme"
  }

  Settings for Afterglow-orange
  {
      "theme": "Afterglow-orange.sublime-theme",
      "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme"
  }

  Settings for Afterglow-green
  {
      "theme": "Afterglow-green.sublime-theme",
      "color_scheme": "Packages/Theme - Afterglow/Afterglow.tmTheme"
  }


  If you know other settings (height of the tabs, sidebar options, ...), visit this page:
  https://github.com/YabataDesign/afterglow-theme/blob/master/README.md
```
https://github.com/YabataDesign/afterglow-theme/blob/master/README.md

我选择的主题是：（决定侧边栏的样式效果）
![](/hexo.pure/images/posts/sublime/08.png)
配色方案是：（决定编辑部分的样式效果）
![](/hexo.pure/images/posts/sublime/09.png)
由于默认的侧边的样式效果看不清问，颜色几乎和背景融为一体，网上好多人说好看，还是那句话，萝卜白菜各有所爱，关键是看不清……
修改
像 10 中提到的那样，利用 PackageResourceViewer 插件，修改样式文件
![](/hexo.pure/images/posts/sublime/10.png)
字体大小有 12,13，他默认是 14 修改font.size 为自己合适的大小
```
// Sidebar entry font size 14
    {
        "class": "sidebar_label",
        "settings": ["sidebar_size_14"],
        "font.size": 16,
        "color": [200, 200, 200] // 03
    },
```

```
//  修改文件夹名称样式
"parents": [{"class": "tree_row","attributes": ["expandable"]}],

还有 hover，selected 等 自己可以自行配置相关的样式
```
it's mine.
![](/hexo.pure/images/posts/sublime/11.png)

STATUS BAR
    label_control
        修改下图部位的样式（编辑器最下边文字样式）
        ![](/hexo.pure/images/posts/sublime/12.png)
        ![](/hexo.pure/images/posts/sublime/13.png)

BOTTOM PANEL ICONS - GROUP 2
    icon_reverse + icon_wrap
        修改下图中部位样式
        ![](/hexo.pure/images/posts/sublime/14.png)


#### 12.YUI Compressor
压缩JS和CSS文件

快捷键： ctrl + b

#### 13.JsFormat
刚开始在JSX文件格式化后惨不忍睹，其实配置一个属性就可以支持JSX语法格式化。
菜单->Preferences->Package Settings->JsFormat->Settings-User加入以下代码

    {
        "e4x": true,//支持jsx格式化
        "format_on_save": true//保存立即格式化，对于严格代码规范的人来说，把没有必要格式化的代码也格式化了
    }
#### 14.代码检查
1.首先安装SublimeLinter、SublimeLinter-jshint、SublimeLinter-jsxhint、SublimeLinter-contrib-eslint插件。

2.然后命令行全局安装

    npm install -g eslint
    npm install -g babel-eslint
    npm install -g eslint-plugin-react
    npm install -g jsxhint

3.以ES6语法检查为例，在项目工程根目录新建.eslintrc,输入

    {
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
                "jsx": true
            }
        },
        "rules": {
            "semi": ["error", "always"]
        }
    }

详细配置参考 http://eslint.org/docs/user-guide/configuring
#### 15.React ES6 Snippets
ES6 Snippets，代码提示
这个没找到，找到了 react native snippets
#### 16.Babel
es6/es2015、JSX代码高亮

设置①：view > Syntax > Babel > JavaScript (Babel)
设置②：点击编辑器右下角 > Babel > JavaScript (Babel)

#### react
https://www.jianshu.com/p/0427629bd111
