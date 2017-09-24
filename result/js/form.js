"use strict";

function Myform(){
	
	var self = this,
        result_field = document.getElementById("result");

	this.ajax = function(method, url, data) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open(method, url, true);
			req.addEventListener("load", function() {
                req.status === 200 ?
                    resolve(req.responseText)
                    :
                    reject(new Error("Request failed: " + req.statusText));
			});
			req.addEventListener("error", function() {
                reject(new Error("Request failed: " + req.statusText));
			});
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			req.send(data);
		});
	};
	
	this.send = function(){
		var error = false;
		var form = document.forms[0];
		var name = form.name.value;
		var email = form.email.value;
		var phone = form.phone.value;
		var message = form.message.value;
		form.email.onfocus	= function(){
			form.email.style.backgroundColor = "#ffffff";
		};
		form.message.onfocus	= function(){
			form.message.style.backgroundColor = "#ffffff";
		};
		if(!email || !/.+@.+\..+/i.test(email)){
			form.email.style.backgroundColor = "#ff8c69";
			error = true;
		}
		if(!message || !/.+/i.test(message)){
			form.message.style.backgroundColor = "#ff8c69";
			error = true;
		}
		if(error)return;
		var data = "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message;
		self.ajax("POST", "/controller.php", data)
			.then(function(result) {
				result_field.innerHTML = result;
				form.name.value = "";
				form.email.value = "";
				form.phone.value = "";
				form.message.value = "";
			})
            .catch(function(error) {
                result_field.innerHTML = error;
			});
	}
}