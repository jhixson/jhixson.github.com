var _t;
$(document).ready(function() {
	$('.links li').mouseenter(function(){
		$('a',this).animate({'color':'#fff','backgroundColor':'#7F4B16','backgroundPosition':'268px 3px'},250,'easeOutBack');
		$('span',this).show(100);
		clearTimeout(_t);
	}).mouseleave(function(){
		$('a',this).animate({'color':'#eee','backgroundColor':'#B26110','backgroundPosition':'317px 3px'},250,'easeInBack');
		$('span',this).hide(100);
		if(current < $('.overflow .links li').length)
			_t = setTimeout(scrollLinks,5000);
	});
	
	$('#searchbox input, #commentsForm input.text, #commentsForm textarea').each(function() {
		$(this).data('val',$(this).val());
	});
	$('#searchbox input, #commentsForm input.text, #commentsForm textarea').focus(function() {
		$(this).addClass('active');
		if($(this).val() == $(this).data('val'))
			$(this).val('');
	}).blur(function() {
		$(this).removeClass('active');
		if($(this).val() == '')
			$(this).val($(this).data('val'));
	});
	
	$('a.comment_box').toggle(function(e) {
		e.preventDefault();
		$('#wrapper').animate({'left':-315,'width':1215},500,'easeOutExpo',function() {
			$('#content').width(900).find('.comments').show();
			clearTimeout(_t);
		});
		
	},function(e) {
		e.preventDefault();
		$('#content').find('.comments').hide().end().width(585);
		$('#wrapper').animate({'left':0,'width':900},500,'easeOutExpo',function(){
			_t = setTimeout(scrollLinks,5000);
		});
	});
});

$(window).load(function() {
	linkBox(_start,_current);
	_t = setTimeout(scrollLinks,5000);
});

var _start = 0;
var _current = 5;
function linkBox(start,end) {
	var h = 0;
	for(var i = start; i < end; i++)
		h += ($('.overflow .links li:eq('+i+')').height() + 4);
	
	$('.overflow').height(h);
}

var _s = 0;
function scrollLinks() {
	_s += $('.overflow .links li:eq('+_start+')').height() + 4;
	$('.overflow .links').animate({'marginTop':-_s});
	_start++;
	_current++;
	linkBox(_start,_current);
	
	if(_current < $('.overflow .links li').length)
		_t = setTimeout(scrollLinks,5000);
}
