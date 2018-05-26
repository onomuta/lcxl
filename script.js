
navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFailure);
var midi = null;
var inputs = [];
var outputs = [];
var output = null;
var chs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var ch = 1;

function onMIDISuccess(m){
  midi = m;
  var it = midi.inputs.values();
  for(var o = it.next(); !o.done; o = it.next()){
    inputs.push(o.value);
  }
  var ot = midi.outputs.values();
  for(var o = ot.next(); !o.done; o = ot.next()){
    outputs.push(o.value);
  }
  
  output = outputs[0];
  outputs.forEach(function(element, index) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(element.name));
    option.setAttribute('value', index);
    document.getElementById('select-midi-output-device').appendChild(option);
  });
  document.getElementById('select-midi-output-device').onchange = function() {
    output = outputs[this.value];
  };
  
  for(var cnt=0;cnt < inputs.length;cnt++){
    inputs[cnt].onmidimessage = onMIDIEvent;
  }
}



chs.forEach(function(value, index) {
  var option = document.createElement('option');
  option.appendChild(document.createTextNode(value));
  option.setAttribute('value', index);
  document.getElementById('select-midi-output-ch').appendChild(option);
});
document.getElementById('select-midi-output-ch').onchange = function() {
  ch = chs[this.value];
};



function onMIDIEvent(e){
  if(e.data[2] != 0){ 
    // なにかをうけとったときの処理
    // console.log(e.data[2]);
    // console.log(e.data[1]);
  }
}

function onMIDIFailure(){
  console.log("munen!");
};

function sendCC(cc, val){
  // if(outputs.length > 0){
  //   outputs[0].send([0xB0, cc, val]);
  // }
  if(output){
    output.send([0xB0 + ch-1, cc, val]);
  }
}

// KNOB
$(function() {
  $(".knob").trigger(
    'configure',{
      min:0,
      max:127,
      step:1,
      angleOffset:210,
      angleArc:300,
      width:60,
      height:60,
      displayInput:false,
      lineCap:'round',
      thickness:0.4,
      bgColor: '#222',
      fgColor:'#0c5'
    }
  );
});
$("#knob1-1").knob({ 'change' : function (v) {sendCC(13, Math.round(v))}, });
$("#knob1-2").knob({ 'change' : function (v) {sendCC(14, Math.round(v))}, });
$("#knob1-3").knob({ 'change' : function (v) {sendCC(15, Math.round(v))}, });
$("#knob1-4").knob({ 'change' : function (v) {sendCC(16, Math.round(v))}, });
$("#knob1-5").knob({ 'change' : function (v) {sendCC(17, Math.round(v))}, });
$("#knob1-6").knob({ 'change' : function (v) {sendCC(18, Math.round(v))}, });
$("#knob1-7").knob({ 'change' : function (v) {sendCC(19, Math.round(v))}, });
$("#knob1-8").knob({ 'change' : function (v) {sendCC(20, Math.round(v))}, });

$("#knob2-1").knob({ 'change' : function (v) {sendCC(16, Math.round(v))}, });
$("#knob2-2").knob({ 'change' : function (v) {sendCC(17, Math.round(v))}, });
$("#knob2-3").knob({ 'change' : function (v) {sendCC(18, Math.round(v))}, });
$("#knob2-4").knob({ 'change' : function (v) {sendCC(19, Math.round(v))}, });
$("#knob2-5").knob({ 'change' : function (v) {sendCC(20, Math.round(v))}, });
$("#knob2-6").knob({ 'change' : function (v) {sendCC(21, Math.round(v))}, });
$("#knob2-7").knob({ 'change' : function (v) {sendCC(22, Math.round(v))}, });
$("#knob2-8").knob({ 'change' : function (v) {sendCC(23, Math.round(v))}, });

$("#knob3-1").knob({ 'change' : function (v) {sendCC(49, Math.round(v))}, });
$("#knob3-2").knob({ 'change' : function (v) {sendCC(50, Math.round(v))}, });
$("#knob3-3").knob({ 'change' : function (v) {sendCC(51, Math.round(v))}, });
$("#knob3-4").knob({ 'change' : function (v) {sendCC(52, Math.round(v))}, });
$("#knob3-5").knob({ 'change' : function (v) {sendCC(53, Math.round(v))}, });
$("#knob3-6").knob({ 'change' : function (v) {sendCC(54, Math.round(v))}, });
$("#knob3-7").knob({ 'change' : function (v) {sendCC(55, Math.round(v))}, });
$("#knob3-8").knob({ 'change' : function (v) {sendCC(56, Math.round(v))}, });

// SLIDER
$( ".slider" ).slider({
  orientation: "vertical",
  max: 127,
  range: "min",
});
$( "#slider1" ).slider({
  slide: function( event, ui ) {
    sendCC(77, Math.round(ui.value));
  }
});
$( "#slider2" ).slider({
  slide: function( event, ui ) {
    sendCC(78, Math.round(ui.value));
  }
});
$( "#slider3" ).slider({
  slide: function( event, ui ) {
    sendCC(79, Math.round(ui.value));
  }
});
$( "#slider4" ).slider({
  slide: function( event, ui ) {
    sendCC(80, Math.round(ui.value));
  }
});
$( "#slider5" ).slider({
  slide: function( event, ui ) {
    sendCC(81, Math.round(ui.value));
  }
});
$( "#slider6" ).slider({
  slide: function( event, ui ) {
    sendCC(82, Math.round(ui.value));
  }
});
$( "#slider7" ).slider({
  slide: function( event, ui ) {
    sendCC(83, Math.round(ui.value));
  }
});
$( "#slider8" ).slider({
  slide: function( event, ui ) {
    sendCC(84, Math.round(ui.value));
  }
});

//BTN
var pressedBtn = -1;

$( "#btn1A" ).mousedown(function() { pushNoteBtn(41,this) });
$( "#btn2A" ).mousedown(function() { pushNoteBtn(42,this) });
$( "#btn3A" ).mousedown(function() { pushNoteBtn(43,this) });
$( "#btn4A" ).mousedown(function() { pushNoteBtn(44,this) });
$( "#btn5A" ).mousedown(function() { pushNoteBtn(57,this) });
$( "#btn6A" ).mousedown(function() { pushNoteBtn(58,this) });
$( "#btn7A" ).mousedown(function() { pushNoteBtn(59,this) });
$( "#btn8A" ).mousedown(function() { pushNoteBtn(60,this) });
$( "#btn1B" ).mousedown(function() { pushNoteBtn(73,this) });
$( "#btn2B" ).mousedown(function() { pushNoteBtn(74,this) });
$( "#btn3B" ).mousedown(function() { pushNoteBtn(75,this) });
$( "#btn4B" ).mousedown(function() { pushNoteBtn(76,this) });
$( "#btn5B" ).mousedown(function() { pushNoteBtn(89,this) });
$( "#btn6B" ).mousedown(function() { pushNoteBtn(90,this) });
$( "#btn7B" ).mousedown(function() { pushNoteBtn(91,this) });
$( "#btn8B" ).mousedown(function() { pushNoteBtn(92,this) });

//上下左右ノートナンバー確認
$( "#funcN" ).mousedown(function() { pushNoteBtn(101, this) });
$( "#funcS" ).mousedown(function() { pushNoteBtn(102, this) });
$( "#funcW" ).mousedown(function() { pushNoteBtn(103, this) });
$( "#funcE" ).mousedown(function() { pushNoteBtn(104, this) });
$( "#func1" ).mousedown(function() { pushNoteBtn(105, this) });
$( "#func2" ).mousedown(function() { pushNoteBtn(106, this) });
$( "#func3" ).mousedown(function() { pushNoteBtn(107, this) });
$( "#func4" ).mousedown(function() { pushNoteBtn(108, this) });


function pushBtn(cc,t){
  t.classList.add("active");
  sendCC(cc, 127);
  pressedBtn = cc;
}

$("body").mouseup(function() {
  releaseBtn()
});
$("body").mouseleave(function(){
  releaseBtn()
});


var pressedBtn = -1;


// offのときにccとnoteがごちゃごちゃ

document.onmouseup = function() {
  releaseBtn();
  releaseNote();
};


function pushNoteBtn(note,t){
  t.classList.add("active");
  outputs[0].send([0x90,note,0x7f]);
  pressedBtn = note;
}

function releaseBtn(){
  if(pressedBtn != -1 ){
    sendCC(pressedBtn, 0);
    $(".btn").removeClass("active");
    pressedBtn = -1;
  }
}
function releaseNote(){
  if(pressedBtn != -1 ){
    outputs[0].send([0x80,pressedBtn,0x00]);
    document.querySelector(".active").classList.remove("active");
    pressedBtn = -1;
  }
}
