function NYPosts (params) {
	if(typeof params !== 'object') {
		console.log("params object is not defined")
		return false;
	}

	if(typeof params.q !== 'string' || params.q.trim() === "") {
		console.log("q parameter is not defined")
		return false;
	}

	if(typeof params.fq !== 'undefined' && typeof params.fq !== 'string') {
		console.log("data type of \"fq\" parameter is wrong");
		return false;
	}

	if(typeof params.begin_year !== 'undefined' && parseInt(params.begin_year) < 1900) {
		console.log("Start year is wrong");
		return false;
	} else {
		params.begin_date = params.begin_year + "0101";
	}

	if(typeof params.end_year !== 'undefined' && parseInt(params.end_year) < 1900) {
		console.log("End year is wrong");
		return false;
	} else {
		params.end_date = params.end_year + "0101";
	}

	console.log(params);


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

	var newParams = {
		apikey: "b4d636c1934244799b4bf05e4442777b"
	};

	for(var i in params) {
		if(typeof params[i] !== 'function') {
			newParams[i] = params[i];
		}
	}

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	$.ajax({
		url: url,
		data: newParams
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