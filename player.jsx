var srcFilename = "";

var WIDTH = 40;
var HEIGHT = 30;
var TIMELINE_LENGTH = 10;
var FRAME_COUNT = 50;
var FRAME_DURATION = 10000;

var TPS = 254016000000;

// Util

function test() {
    return 233;
}

function getTime(seconds) {
    var t = new Time();
    t.seconds = seconds;
    return t;
}

function getClipStartAtTime(track, time) {
    for (var i=0; i<track.clips.length; i++) {
        var clip = track.clips[i];
        if (time == clip.start.seconds) {
            return clip;
        }
    }
    return null;
}

var srcFile;
var project = app.project;
var items = project.rootItem;
var sequence = project.activeSequence;
var hexNum = "0123456789ABCDEF"
var dstItemList = {};

function loadBadApple(src, width, height, timeline_length, frame_count, frame_duration) {
    srcFilename = src;
    WIDTH = width;
    HEIGHT = height;
    TIMELINE_LENGTH = timeline_length;
    FRAME_COUNT = frame_count;
    FRAME_DURATION = frame_duration;
    // Read Files
    srcFile = File(srcFilename);
    srcFile.open("r");

    // Load media.

    for (var i=0; i<project.rootItem.children.length; i++) {
        $.writeln(project.rootItem.children[i].type, " ", project.rootItem.children[i].getColorLabel(), " ", project.rootItem.children[i].name);
        if (project.rootItem.children[i].type == 1) {
            dstItemList[hexNum[project.rootItem.children[i].getColorLabel()]] = project.rootItem.children[i];
        }
    }
}

function renderFrame() {
    // Now "render" the screen with BadApple!!=
    for (var y=0; y<HEIGHT; y++) {
        var targetTrack = sequence.videoTracks[HEIGHT-1-y];
        var line = srcFile.readln();
        // First, remove the target row.
        var clipList = targetTrack.clips;
        for (var i=clipList.length-1; i>=0; i--) {
            clipList[i].remove(0, 0);
        }
        var x = 0;
        while (x < WIDTH) {
            if (line[x] == "#") {
                x++;
            } else {
                var color = line[x];
                if (color == ".") {
                    color = "C";
                }
                var len = 1;
                while (x+len < WIDTH && line[x+len] == line[x]) {
                    len++;
                }
                // Insert clip.
                var clipStart = TIMELINE_LENGTH * x / WIDTH;
                var clipDuration = TIMELINE_LENGTH * len / WIDTH;
                var dstItem = dstItemList[color];
                targetTrack.insertClip(dstItem, String(clipStart*TPS), HEIGHT-1-y, 0);
                var clip = getClipStartAtTime(targetTrack, clipStart);
                clip.end = getTime(clipStart + clipDuration);
                x += len;
            }
        }
    }
}