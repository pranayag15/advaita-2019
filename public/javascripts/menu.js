// $(document).ready(function () {

//     $('span').click(function() {
//         $('.overlay').toggleClass('anim');
//     });

//     $('.animation').click(function(){
//         $('.anim').toggleClass('reverse-animation');
//     })
// });
$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
  });