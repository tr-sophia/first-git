var oAudio = document.getElementById('audio'),//音乐列表
    oImage =document.getElementById('image'),
    songList = document.getElementsByClassName('songlist')[0];
    oCurrentTime = document.getElementsByClassName('current-time')[0],//当前音乐时间
    allTime = document.getElementsByClassName('alltime')[0],//总时长
    oPlay = document.getElementsByClassName('play')[0],//播放按钮
    playBtn = oPlay.getElementsByClassName('iconfont')[0],//播放图标
    oProBox = document.getElementsByClassName('pro-box')[0],//进度条整体
    oProActive = document.getElementsByClassName('pro-active')[0],
    oRadioBox = document.getElementsByClassName('radio-box')[0],//进度条原点
    pre = document.getElementsByClassName('pre')[0],//上一首
    next = document.getElementsByClassName('next')[0],//下一首
    volume = document.getElementsByClassName('volume')[0],//声音按钮
    volumeBox = document.getElementsByClassName('volume-box')[0],//音量盒子
    volumeBar = document.getElementsByClassName('volume-bar')[0],//音量条
    bar = document.getElementsByClassName('bar')[0],//音量拖拽
    li = document.getElementsByTagName('li') ,//歌曲列表
    wrapper = document.getElementsByClassName('wrapper')[0];
    
var timer=null,
    timer2 = null,
    duration,  
    totalWidth = 252  ,
    imgArr = ['小半-陈粒.jpg','飞云之下-韩红 林俊杰.jpg','光年之外-邓紫棋.jpg','桃花笑-汪睿.jpg','漫步人生路-邓丽君.jpg'],
    //存放歌曲数组   
    songArr = ['小半-陈粒.mp3','飞云之下-韩红 林俊杰.mp3','光年之外-邓紫棋.mp3','桃花笑-汪睿.mp3','漫步人生路-邓丽君.mp3'],
    index = 0 ,//索引
    songLen = songArr.length;



//ondurationchange 网络请求
window.onload = function(){
    oAudio.src='./source/小半-陈粒.mp3'; 
    //初始播放时间为0 
    oCurrentTime.innerHTML =conversion(0)  ;
    oAudio.addEventListener('canplay',function(){
        //获取音乐时长
       duration=oAudio.duration; 
  
        // 音乐时长显示
       allTime.innerHTML = conversion(duration);
    })

    // 默认音量为0.5
    oAudio.volume = 0.5;
    // oAudio.load();
}   



//00:00 时间格式
function conversion(time) {
    
    var sec = parseInt(time%60) < 10 ? '0'+parseInt(time%60):parseInt(time%60);
    var min = parseInt(time/60) < 10 ? '0'+parseInt(time/60):parseInt(time/60);
    return min  +':' + sec;

}
//图片旋转/zanting
function imageRotate(){
    var deg =0;
    timer2= setInterval(function(){
        oImage.style.transform =' rotate('+deg+'deg)';
        deg+=5;
        if(deg>360){
            deg = 0;
        }
    },100);
}
function imagePause(){
   
    clearInterval(timer2);

}
// 播放/暂停
oPlay.onmouseup = function () {
    // 通过oAudio.paused属性判断当前状态，如果为暂停状态点击为播放，反之为暂停
    if (oAudio.paused) {
        musicPlay();
        imageRotate();
    } else {
        musicPause();
        imagePause();
    }
}

// 播放方法
function musicPlay() {
    // 图标切换为暂停图标
    playBtn.innerHTML = "&#xe669;"
    oAudio.play();
    // 启动定时器，时间间隔设置为200毫秒，相比1000更加准确
    timer = setInterval(current, 200);
}
// 暂停方法
function musicPause() {
    // 图标切换为开始图标
    playBtn.innerHTML = "&#xe630;"
    oAudio.pause();
    // 暂停时清除定时器，时间保持为当前
    clearInterval(timer);
}
// 时间计时器 进度条
function current() {
    oCurrentTime.innerHTML = conversion(oAudio.currentTime);
    newWidth = (oAudio.currentTime / duration) * totalWidth;
    oProActive.style.width = newWidth + 8+"px";
}

//结束
oAudio.onended = function(){
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    oProActive.style.width = 8 +'px';
   
    musicPlay();
}
// 进度条拖拽
oRadioBox.onmousedown = function(){
    clearInterval(timer);
    var c= oAudio.currentTime;
    document.body.onmousemove = function(e){
       var newX =  e.clientX - oProBox.getBoundingClientRect().left;
       if(newX<8){
        newX = 8;
       }else if(newX > 260){
        newX = 260;
       } 
       oProActive.style.width = newX + 'px';
       c = (newX-8)/totalWidth*duration;
      
       oCurrentTime.innerHTML = conversion(c);
    }
    document.body.onmouseup = function(){
        document.body.onmousemove=null;
        document.body.onmouseup= null;
        musicPlay();

        oAudio.currentTime = c;
    }
}
// 点击播放进度条任意位置，可以直接在此处播放
oProBox.onclick = function (e){
    c = ((e.clientX-oProBox.getBoundingClientRect().left)/totalWidth*duration);
    oCurrentTime.innerHTML = conversion(c);
    oProActive.style.width = e.clientX-oProBox.getBoundingClientRect().left + 'px';
    oAudio.currentTime = c;
}




// 上一曲
pre.onclick = function prevMusic() {
    clearInterval(timer);
    index--;
    if (index < 0) {
        index = songLen - 1;
    }
    oAudio.src = './source/' + songArr[index];
    oAudio.load();
    oImage.src='./source/' + imgArr[index];
    musicPlay();
}
// 下一曲

next.onclick=function nextMusic() {
    clearInterval(timer);
    index++;
    if (index > songLen - 1) {
        index = 0
    }
    oAudio.src = './source/' + songArr[index];
    oAudio.load();
    oImage.src='./source/' + imgArr[index];
    musicPlay();
}


function select() {
    for (let i = 0; i < li.length; i++) {
       li[i].onclick = function () {
               oAudio.src = './source/' +this.innerText +'.mp3';
               oImage.src ='./source/' + this.innerText +'.jpg';
               
                oAudio.load();
                musicPlay();
                console.log(1);
        }
    }console.log(2);
}
select();
// 切换歌曲是需要重新加载一下，获取歌曲时长等信息
oAudio.ondurationchange = function () {
    duration = oAudio.duration;
    oCurrentTime.innerHTML = conversion(0);
    allTime.innerHTML = conversion(duration);
    oAudio.volume = 0.5;
}



// 音量调节
// 音量调节条出现
volume.onclick = function (e) {
    volumeBox.style.border = "2px solid #fff";
    volumeBox.style.height = "150px";
    e.stopPropagation();
}
// 音量调节条消失
wrapper.onclick = function (e) {
    volumeBox.style.height = "0";
    volumeBox.style.border = "none";
}
// 拖动音量条来调节音量
bar.onmousedown = function (e) {
    document.onmousemove = function (e) {
        newY = e.clientY - volumeBox.getBoundingClientRect().top;
        var newHeight = 150 - newY;
        if (newHeight > 150) {
            newHeight = 150;
        }
        if (newHeight < 0) {
            newHeight = 0;
        }
        volumeBar.style.height = newHeight + "px";
        oAudio.volume = newHeight / 150;
    }
    document.onmouseup = function (e) {
        e.stopPropagation();
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
// 点击音量调节条任意位置，调剂音量
volumeBox.onclick = function (e) {
    e.stopPropagation();
    oAudio.volume = (150 - (e.clientY - volumeBox.getBoundingClientRect().top)) / 150;
    volumeBar.style.height = 150 - (e.clientY - volumeBox.getBoundingClientRect().top) + "px";
}