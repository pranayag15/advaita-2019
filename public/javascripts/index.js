// var animation = bodymovin.loadAnimation({
//     container: document.getElementById('bm'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'data.json'
//   })

  var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'blackferris.json'
  })
  var animation = bodymovin.loadAnimation({
    container: document.getElementById('roller'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'chotidabbi.json'
  })
  var animation = bodymovin.loadAnimation({
    container: document.getElementById('anilogo'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'testlogo2.json'
  })
   var animationupper = bodymovin.loadAnimation({
    container: document.getElementById('upper'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'upper.json'
  })
  setTimeout(function(){ animation.play(); }, 3400);
  setTimeout(function(){ animationupper.play(); }, 7800);
  
  var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
function iframe()
{
   document.getElementById("iframe").style.display = "block";
   document.getElementById("close12").style.display = "block";
   document.getElementById("notification").style.display = "none";
    // document.getElementById("youtube").style.font-size = "4vh";
}
function notification()
{
   document.getElementById("notification").style.display = "block";
   document.getElementById("close12").style.display = "block";
    document.getElementById("iframe").style.display = "none";
}

function close12()
{
   document.getElementById("iframe").style.display = "none";
    document.getElementById("notification").style.display = "none";
    document.getElementById("close12").style.display = "none";
}

$('#close12').on('click', function() {
    //$('#popup-youtube-player').stopVideo();
$('#iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
});
var load123 = 0;
$(window).ready(function(){
  load1();
  // myFunction();
});
          function load1()
          {
          if(load123 == 2){
           $('#loading').fadeOut('slow',function(){$(this).remove();});
          }
           load123 = load123 + 1;
          }
      
        setInterval(load1,1000);
       
//       $(document).ready(function() {
//   var music = document.getElementById("music");
 
//   var play_music_button = document.getElementById("play-music-button");

//   function playAudio() {
//     if (music.paused) {
//       music.play();
//       play_music_button.className = 'pause';
//     } else {
//       music.pause();
//       play_music_button.className = 'play';
//     }
//     music.addEventListener('ended',function() {
//       play_music_button.className = 'play';
//     });
//   }
//   play_music_button.addEventListener("click", playAudio);
// });


// window.onload = function()
// {
//   console.log( $("#music").get(0))
//   $("#music").get(0).play();
// }