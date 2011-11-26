var _t;
$(document).ready(function() {
	$('.links').delegate('li','mouseenter', function(){
		$('a',this).animate({'color':'#fff','backgroundColor':'#7F4B16','backgroundPosition':'268px 3px'},250,'easeOutBack');
		$('span',this).show(100);
		clearTimeout(_t);
	}).delegate('li','mouseleave',function(){
		$('a',this).animate({'color':'#eee','backgroundColor':'#B26110','backgroundPosition':'317px 3px'},250,'easeInBack');
		$('span',this).hide(100);
		if(_current < $('.overflow .links li').length)
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
	
	getReddit();
	if('.photobox')
		getPhotos();
		
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

function getPhotos() {
	$.getJSON('https://api.instagram.com/v1/users/319716/media/recent?access_token=319716.7a1643b.71fae0877eaf4eb090a3d4a316268126&callback=?',function(json) {
		console.log(json);
		$.each(json.data,function() {
				$('#slider ul').append('<li><img src="'+this.images.low_resolution.url+'" alt="" /></li>');
				$('#strip ul').append('<li><img src="'+this.images.low_resolution.url+'" alt="" width="54" height="54" /></li>');
		});
		
		var img_count = $('#slider li').length;
		$('#slider ul').width(306*img_count);
		//$('#strip ul').width(54*img_count);
		
		$('#next_photo').click(function(e) {
				e.preventDefault();
				var ul = $('#slider ul:not(:animated)');
				var max = ul.width() - 306;
				var right = parseInt(ul.css('right'));
				ul.animate({'right': Math.min(right+306,max)},550,'easeOutQuart');
		});
		
		$('#prev_photo').click(function(e) {
				e.preventDefault();
				var ul = $('#slider ul:not(:animated)');
				var right = parseInt(ul.css('right'));
				ul.animate({'right': Math.max(right-306,0)},550,'easeOutQuart');
		});
		
		$('#strip li').click(function(e) {
				//$(this).addClass('active');
				var pos = $('#strip li').index($(this));
				var ul = $('#slider ul:not(:animated)');
				var max = ul.width() - 306;
				ul.animate({'right': pos*306},550,'easeOutQuart');
		});
		
		/*
		$('#slider').easySlider({
			auto: false,
			continuous: true
		});
		
		$('#slider').bxGallery({
			maxheight: 306,
			thumbwidth: 75,
			thumbplacement: 'bottom',
			thumbcontainer: 90
		});
		*/
	});
}

function getReddit() {
	$.getJSON('http://www.reddit.com/user/hixsonj/liked/.json?jsonp=?',function(json) {
		$.each(json.data.children, function() {
			$('ul.links').append('<li><a href="'+this.data.url+'">'+this.data.title+'</a><span>'+this.data.subreddit+'</span></li>');
		});
	});
}
