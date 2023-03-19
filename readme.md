# Play Video in Adobe Premiere Timeline

This is a practice of Adobe Premiere Scripting and by-product for my other projects.

This script will automatically place clips of different colors to the timeline and "render" an image sequence, like playing a video. A demo video can be found [here](https://www.bilibili.com/video/BV1bP411Z7uk/).

[中文文档](https://github.com/Wushiwo233/PremiereTimelinePlayer/blob/master/readme-zh.md)

## How to use

1. Obtain an Adobe Premiere Pro.
You need at least CC 2019 version I guess, otherwise I cannot guarantee the correctness of the script. 
2. Enable loading of unsigned panels. 
    * For MacOS, type the following into Terminal and relaunch Finder: 
        ```shell
        defaults write /Users/<username>/Library/Preferences/com.adobe.CSXS.<cepver>.plist PlayerDebugMode 1
        ```
    * For Windows:
    Find `Computer\HKEY_CURRENT_USER\Software\Adobe\CSXS.<cepver>`.
    Add a new registry entry of name `PlayerDebugMode`, type String and value `1`.
    
    *Here, \<cepver> is decided by your Adobe Premiere Pro's version, and it is often the highest number among all versions in your computer.*
3. Add the extension. 
Download the code here and copy the root directionary into the following position:
    * For MacOS: `/Library/Application Support/Adobe/CEP/extensions`
    * For Windows: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`
4. Open your Premiere Pro, in the menu choose `Window > Extension > Play Video in Timeline`. Now you'll see the panel. 
5. Create a new project, a new sequence, create/import video/image media and give them different label colors. Make sure your label colors can fully cover the colors of your image sequence.
Then, add adequate video tracks.
6. Fill in the parameters and run the script.
About requirements of the input file and other parameters, please see the description below.

## Parameters

Before run the script, you should fill in the following parameters.
* **Full path of an input file**: You should first give a designated-format file (the format will be introduced later) as the input. Note that you should give the full path, including its position, name and file extension, like: `C:\this\is\some\path\input.txt`. 
* **Width** and **height**: Resolution of the image sequence. Should be integer.
Note that height shoule be no less than number of the video tracks.
For example, if the height is 30, then you should have no less than 30 video tracks in the sequence.
* **Timeline Length**: The video will be "rendered" at the beginning of your sequence. Here you can decide length of the timeline which will be "rendered". 
Note that this value divided by width (i.e. length of a pixel in timeline) shoule be multiple of 1 frame, no matter how the time base is set. 
For example, if the width is 30, then the timeline length should be multiple of 30 frames. If your time base is 30 fps, the timeline length should be multiple of 1 second. If your time base is 60 fps, the timeline length should be multiple of 0.5 seconds.
* **Number of Frames**: Number of frames you want to render. 
* **Frame duration**: The script continuously clear tracks, add clips of various colors into the timeline to "render" the input image, and in Premiere Pro, this may take a lot of time, usually tens of seconds. The time taken depends on the number of operations rendering a frame needs. It is impossible to implement a real-time rendering, so you should decide how long an image keeps before the next image begins to render, i.e. the interval between two images starting to render.

## Input Format

The input file should be a text file with *height* × *framecount* rows, each row has *width* characters. Each character represents a pixel to be rendered. A pixel can be one of the following 17 values:
| Value  | Color | Color Value (RGB) |
| :----: | ----  | ---- |
| # | Background | (32,32,32) *by default* |
| 0 | Violet | (166, 144, 224) | 
| 1 | Iris | (114, 154, 204) |
| 2 | Caribbean | (41, 214, 152) |
| 3 | Lavender | (227, 132, 227) |
| 4 | Cerulean | (47, 191, 222) |
| 5 | Forest | (81, 184, 88) |
| 6 | Rose | (247, 111, 164) |
| 7 | Mango | (237, 166, 59) |
| 8 | Purple | (151, 0, 151) |
| 9 | Blue | (60, 60, 255) |
| A | Teal | (0, 128, 128) |
| B | Magenta | (231, 50, 231) |
| C | Tan | (206, 193, 149) |
| D | Green | (29, 112, 33) |
| E | Brown | (139, 69, 19) |
| F | Yellow | (226, 226, 100) |

For example, the below is a frame of Bad Apple:
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
The input file is just concatenating multiple frames together. You can refer to `example.txt`, which is first 10 frames of rickroll, with each frame of size 40x30. ;)