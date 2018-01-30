class Comments{
    ajaxHandlerComments(cb,key){
    	/*$.ajax({
			url:'https://api.duoshuo.com/threads/counts.jsonp',
			type:'get',
			data:{
				short_name : 'bamzc',
				threads : key
			},
			dataType:'jsonp',
			success:function (res) {
				if(res.code == 0){
					cb(res.response[key]);
				}
				
			}
		});*/
    }
}

let cm = new Comments();

let comments = $('.comments-link');

/*if(comments.length > 0){
	comments.each((k,v) => {
		let comments_a = $(v).find('a');
		cm.ajaxHandlerComments(function(res){
			comments_a.find('i').html(res.comments);
		},comments_a.data('thread-key'));
	});
}*/

export default cm;