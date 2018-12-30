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
  setTimeout(function(){ animation.play(); }, 4400);
  setTimeout(function(){ animationupper.play(); }, 8100);