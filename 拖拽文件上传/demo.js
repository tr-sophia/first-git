var content = document.getElementsByClassName('content')[0];
var val = document.getElementsByClassName('val')[0];
var text = document.getElementsByClassName('text')[0];

content.addEventListener('dragover',function(e){
    e.preventDefault();
});


//chuandi huoqu
content.addEventListener('drop',function(e){
    e.preventDefault();//取消浏览器自动打开
    file = e.dataTransfer.files[0];

    var loader=new FileLoader(file,events);

});





//用户自定义的
var events = {
    progressIng:function(per){
        val.style.width =per *250 +'px';
       
        text.innerHTML = Math.round(per * 100)+'%';//上下取整，四舍五入
        console.log( val.style.width+'px');
    },
    stepLoad :function(loaded){
        console.log('上传'+ loaded+'部分');

    },
    finish:function(){
        console.log('上传完成');
    }
}

