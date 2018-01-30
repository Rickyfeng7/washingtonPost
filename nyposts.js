var NYPosts = function (params) {
	if(typeof params !== 'object') {
		return false;
	}

	var error_resp = {
		status: "ERROR",
		reason: "",
		data: [],
	}

	var success_resp = {
		status: "OK",
		reason: "",
		data: [],
	}

	params.apikey = "b4d636c1934244799b4bf05e4442777b";

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	$.ajax({
		url: url,
		data: params
	}).done(function(result){
		success_resp.data = {
			docs: result.response.docs,
			meta: result.response.meta
		}
		params.success(success_resp);
	}).fail(function(result){
		error_resp.reason = "Something is wrong!";
		params.fail(error_resp);
	})
}