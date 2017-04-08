$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.attr("name");
		var dbox='item_'+id;
		$.ajax({
			type:"delete",
			url:'/admin/delarticle?id='+id,
		})
		.done(function(results){
			if(results.success===1){
				 console.log($('#dbox'));	
			}
			else{
				console.log('fail');
			}
		});
		
	});
	$('.comments').click(function(){
		var $textarea = $('.textarea');
		if ($textarea.is(":visible")) {
			$textarea.hide();
		}
		else {
			$textarea.show();
		}
	});
	// var str='',sOl;
	// for (var k= article.length-1; k>0; k--) {
	// 	article[k].author=user.name;
	// 	str =str+ '<li>'+article[k].title+'</li>';
	// }

	// $('.information ol').append(str);
})

