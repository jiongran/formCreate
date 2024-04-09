
<template>
	<div class="body">
		<audio ref="audio" src="/mp3/clip.mp3" controls class="audio"></audio>
		<div class="containter">
			<ul class="lrcWrap" >
				<li v-for="item in list" :key="item.time">{{ item.words }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
const Lrc = `
[00:00.000] 作词 : 李宇春
[00:01.000] 作曲 : 李宇春
[00:02.000] 编曲 : 谭伊哲
[00:04.85]
[00:23.03]刚下的地铁还不算拥挤
[00:27.85]你那边飞机碰巧也落地
[00:32.53]东京下雨 淋湿巴黎
[00:34.92]收音机 你听几点几
[00:41.38]
[00:42.51]当半个地球外还有个你
[00:47.20]当相遇还没到对的时机
[00:52.01]夏天一去 又是冬季
[00:54.58]7-11 暖杯巧克力
[01:00.40]
[01:01.90]秒针转动 DI DI DA
[01:04.16]小小时差 DI DI DA
[01:06.59]我早茶月光洒在你头发
[01:11.04]
[01:11.47]平行的画 DI DI DA
[01:13.85]几时交叉 DI DI DA
[01:16.41]下个路口再见吧
[01:19.66]
[01:41.15]忙碌会议你头脑转不停
[01:46.27]我街头散步偷偷喘口气
[01:51.07]伦敦叹息 倾听悉尼
[01:53.46]同时期 就像在一起
[01:58.34]
[02:00.71]我偏爱弗朗明哥的热情
[02:05.52]你倾心维也纳古典钢琴
[02:10.53]不曾相遇 未曾熟悉
[02:12.91]深呼吸 你会在哪里
[02:18.87]
[02:20.35]秒针转动 DI DI DA
[02:22.47]小小时差 DI DI DA
[02:24.97]我早茶月光洒在你头发
[02:29.39]
[02:29.80]平行的画 DI DI DA
[02:32.30]几时交叉 DI DI DA
[02:34.74]下个路口再见吧
[02:37.81]
[02:39.81]秒针转动 DI DI DA
[02:42.12]小小时差 DI DI DA
[02:44.50]我早茶月光洒在你头发
[02:48.88]
[02:49.31]平行的画 DI DI DA
[02:51.88]几时交叉 DI DI DA
[02:54.26]下个路口再见吧
[02:57.62]
[02:58.19]木吉他 : 李爱
[02:58.73]合音 : 李宇春/张石荻
[02:58.96]录音 : 杜一超 (远洋录音棚)
[02:59.18]混音 : 张博 (BOB STUDIO)
[02:59.40]
[02:59.61]OP : 北京太合麦田音乐文化发展有限公司
[02:59.81]SP : Rock Music Publishing Co., Ltd
[03:00.01]OP : 北京太合麦田音乐文化发展有限公司
[03:00.20]SP : Rock Music Publishing Co., Ltd
[03:00.40]ISRC CN-A65-09-680-02
[03:00.61]ISRC TW-A45-09-963-02
[03:00.79]
`
const audio =ref()
const list =ref([])
onMounted(()=>{
function getTime(string){
    var str = string.substring(1)
    var array = str.split(':')
    return +array[0]*60+ +array[1]
}
function parseLrc(Lrc){
    var str = Lrc.split('\n')
    return str.map(item =>{
        let strData = item.split(']')
		return {
            time:getTime(strData[0]),
            words:strData[1]
        	}
    })
}

function getIndex(){
    const currentTime = audio.value.currentTime;
    for(var i =0;i<lrcData.length;i++){
        if(currentTime < lrcData[i].time){
            return i-1
        }
    }
    return lrcData.length -1
}


var lrcData = parseLrc(Lrc)
list.value = parseLrc(Lrc)
const setOffsetRn = () =>{
	const containter1 = document.getElementsByClassName('containter')[0]
	const ul1 = document.getElementsByClassName('lrcWrap')[0]
	const containterHeight = containter1.clientHeight;
	const liHeight = ul1.children[0].clientHeight;
	const maxOffsetHeight = ul1.clientHeight - containterHeight
	function setOffset(){
		var idx = getIndex()
		var offset =  liHeight * idx  + liHeight / 2 - containterHeight / 2
		console.log('offset',offset)
		if(offset < 0){
			offset = 0
		}
		if(offset > maxOffsetHeight){
			offset = maxOffsetHeight
		}
		ul1.style.transform = `translateY(-${offset}px)`
		var li = ul1.querySelector('.active')
		if(li){
			li.classList.remove('active')
		}

		li = ul1.children[idx]
		if(li){
			li.classList.add('active')
		}
	}
	setOffset()
}
nextTick(()=>{
	setOffsetRn()
})
audio.value.addEventListener('timeupdate',()=>{
    setOffsetRn()
})
})
</script>
<style scoped>
.body{
	padding:40px;
	background: #000;
	color:#eee;
	max-width: 400px;
    margin: 20px auto;
}
.containter{
	text-align: center;
	height:400px;
	overflow: hidden;
}
audio{
	width:100%;
	display: inherit;
	margin: 20px auto;
}
.containter .lrcWrap{
	transition: 0.2s;
	list-style-type: none;
}
.containter .lrcWrap li{
	height:30px;
	line-height: 30px;
	transition: 0.2s;
	margin-top: 0!important;
}
.containter .lrcWrap li.active{
	color:#fff;
	transform: scale(1.25);
}
</style>