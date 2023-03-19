# Play Video in Adobe Premiere Timeline

这是我的一个 Adobe Premiere 脚本练习，也是一个做其他工程过程中的副产物。
这个脚本可以将各种颜色标签的素材摆放到时间轴上从而在时间轴上“渲染”一张张图像，就像在时间轴上放视频一样。你可以在[这里](https://www.bilibili.com/video/BV1bP411Z7uk/)找到演示视频。

## 如何使用

1. 下载 Adobe Premiere Pro.
我猜这个脚本最低需要 CC 2019 版本，更低版本我不确定能不能跑。
2. 允许加载未签名的面板。
    * 对于 MacOS 系统，在 Terminal 中输入下列命令并重启 Finder：
        ```shell
        defaults write /Users/<username>/Library/Preferences/com.adobe.CSXS.<cepver>.plist PlayerDebugMode 1
        ```
    * 对于 Windows 系统:
    在注册表中找到 `Computer\HKEY_CURRENT_USER\Software\Adobe\CSXS.<cepver>` 一项。
    添加一个名为 `PlayerDebugMode`、类型为 String 且值为 `1` 的新表项。
    
    *注意，这里的 \<cepver> 由你的 Premiere Pro 版本所决定，通常你在表项对应文件夹中找到的数值最大的版本就是你要允许 debug 的版本。*
3. 添加本扩展。
下载本仓库的代码并将整个目录拷贝到以下位置：
    * MacOS 系统：`/Library/Application Support/Adobe/CEP/extensions`
    * Windows 系统：`C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`
4. 打开你的 Premiere Pro, 选择菜单中的 `窗口 > 扩展 > Play Video in Timeline`。现在你应该可以看到面板了。
5. 新建新项目、新建新序列，新建 / 导入一些视频 / 图像类型的媒体并且给这些媒体不同的颜色标签。请保证你的颜色标签可以覆盖你后续要渲染的视频的所有颜色。
接下来，添加足够多的视频轨道。
6. 在面板中补全参数，运行脚本。
关于输入文件的要求和参数的说明将在下面被介绍。

## 参数

在运行脚本之前，你需要补全以下的参数：
* **Full path of an input file**（输入文件的完整路径）：你需要将一个指定格式（后续介绍）的文件作为输入。注意这里你需要给出完整的路径，包括输入文件所在的文件夹、文件名和扩展名，例如：`C:\this\is\some\path\input.txt`。
* **Width**（宽度） 和 **height**（高度）：要渲染的图像序列中每一帧的分辨率，必须为整数.
注意高度不可以少于视频轨道的数量。
例如，当你的输入序列高度为 30，那么你的序列就需要有不少于 30 个视频轨道。
* **Timeline Length**（时间轴长度）：你的输入图像序列将会在时间轴的开始处渲染，而这里你可以决定时间轴开始的多长一部分被拿来渲染。
注意时间轴长度除以宽度（换言之，要渲染的每一个像素在时间轴的长度）必须为整数帧，不管你的帧率设置的是多少。
例如，当你的输入序列宽度为 30，那么你的时间轴长度必须为 30 帧的整数倍。当你的帧率为 30 fps 时，时间轴长度就必须是 1 秒的整数倍；当你的帧率为 60 fps 时，时间轴长度就必须是 0.5 秒的整数倍。
* **Number of Frames**（帧数）：你想要渲染的图像序列中图像的个数。
* **Frame duration**（每帧持续时间）：这个脚本会不停的清空视频轨道、添加各种颜色的剪辑从而做到“渲染”你的图像序列。在 Premiere Pro 中，这需要消耗非常多时间，例如数十秒，而渲染一帧需要的时间取决于渲染这一帧需要做的操作的数量。想要实时在时间轴渲染图像显然是不可能的，所以你可以在这里决定原视频中的每一帧在时间轴中展示多长时间。换言之，这个参数是两张图片开始渲染的时间间隔。

## 输入文件格式

输入文件必须是一个有*高度*×*总帧数*行，且每一行有*宽度*个字符的文件。每一个字符代表要渲染的一个像素，并且它可以是如下 17 种取值中的一种：
| 字符值  | 颜色 | 颜色值 (RGB) |
| :----: | ----  | ---- |
| # | 背景色 | *默认为* (32,32,32) |
| 0 | 紫色 | (166, 144, 224) | 
| 1 | 鸢尾花色 | (114, 154, 204) |
| 2 | 加勒比海蓝色 | (41, 214, 152) |
| 3 | 淡紫色 | (227, 132, 227) |
| 4 | 天蓝色 | (47, 191, 222) |
| 5 | 森林绿色 | (81, 184, 88) |
| 6 | 玫瑰红 | (247, 111, 164) |
| 7 | 芒果黄色 | (237, 166, 59) |
| 8 | 紫色 | (151, 0, 151) |
| 9 | 蓝色 | (60, 60, 255) |
| A | 深青色 | (0, 128, 128) |
| B | 洋红色 | (231, 50, 231) |
| C | 棕黄色 | (206, 193, 149) |
| D | 绿色 | (29, 112, 33) |
| E | 棕色 | (139, 69, 19) |
| F | 黄色 | (226, 226, 100) |

（表中你会发现有两个紫色……因为 Adobe 就是这么笨比翻译的……总之表格是按照右键标签选择颜色的顺序）

例如，下面是 Bad Apple 中的一帧：
```
CCCCCCCCCCCCCCCCCCCCCCCC#####CCCCCCCCCCC
CCCCCCCCCCCCCCCCCCCCCCCCC#####CCCCCCCCCC
CCCCCCCCCCCCCCCCCCCCCCCCC########CCCCCCC
CCCCCCCCCCCCCCCCCCCCCCC###########CCCCCC
CCCCCCCCCCCCCCCCCCCCC#############CCCCCC
CCCCCCCCCCCCCCCCCCCC##############CCCCCC
CCCCCCCCCCCCCCCCCCCC###############CCCCC
CCCCCCCCCCCCCCCCCCCC###############CCCCC
CCCCCCCCCCCCCCCCCCC################CCCCC
CCCCCCCCCCCCCCCCCCC#################CCCC
CCCCCCCCCCCCCCCCCCCC################CCCC
CCCCCCCCCCCCCCCCCCCCC###############CCCC
CCCCCCCCCCCCCCCCCCCCCC##############CCCC
CCCCCCCCCCCCCCCCCCCCCC##############CCCC
CCCCCCCCCCCCCCCCCCCCCC##############CCCC
CCCCCCCCCCCCCCCCCCCCCCC#############CCCC
CCCCCCCCCCCCCCCC###CCCCC############CCCC
CCCCCCCCCCCCCC#####CCCCC############CCCC
CCCCCCCCCCCCCC#####CCCCC##########C#CCCC
CCCCCCCCCCCCCC#####CCCCC##########CCCCCC
CCCCCCCCCCCCCC######CCCC##########CCCCCC
CCCCCCCCCCCCCCC######CCC##########CCCCCC
CCCCCCCCCCCCCCCC######C##########CCCCCCC
CCCCCCCCCCCCCCCCC################CCCCCCC
CCCCCCCCCCCCCCCC#################CCCCCCC
CCCCCCCCCCCCCCCC#################CCCCCCC
CCCCCCCCCCCCCCCC##################CCCCCC
CCCCCCCCCCCCCCCC##################CCCCCC
CCCCCCCCCCCCCCCC##################CC#CCC
CCCCCCCCCCCCCCC####################CCCCC
```
把每一帧图像依次拼接在一起，就可以作为输入文件了。具体的格式你可以参考 `example.txt`，里面是*你被骗了.mp4*的前 10 帧，每一帧的大小是 40x30。