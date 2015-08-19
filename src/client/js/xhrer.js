define([], function() {
    /**
     * A helper function to create an XmlHttpRequest object. Sets up a function such that the response is returned as JSON back to the caller.
     *
     * @param {Function} readyStateFn - The callback to run when the readyState is set to finished.
     * @returns {Object} - An instance of the correct XmlHttp object for the browser at hand.
     */
    var _createXhrObj = function (readyStateFn) {
	var xhr;
	
	if (window.ActiveXObject) {
	    try {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch(e) {
		alert(e.message);
		xhr = null;
	    }
	} else {
	    xhr = new XMLHttpRequest();
	}
	
	if (readyStateFn) {
	    xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.response) {
		    readyStateFn(JSON.parse(xhr.response));
		}
	    }
	}
	    
	return xhr;
    }
    
    return {
	/**
	 * Does a GET using the given URL. Fires the specified callback once the request has been completed.
	 *
	 * @param {String} url - The URL to perform the GET request to.
	 * @returns {Object} - The request object created for this code.
	 */
	get : function(url, callback) {
	    var request = _createXhrObj(callback);
	    request.open("GET", url);
	    request.setRequestHeader('Content-type', 'application/json');
	    request.send();

	    return request;
	}
    };
});
