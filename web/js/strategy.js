var Strategy = (function() {
	// 定义各种策略
	var s = {
		"notEmpty": function(str) {
			// 定义正则表达式
			var reg = /^\s*$/;
			// 判定
			if (reg.test(str)) {
				return "用户名不能为空!";
			}
		},
		"allEn": function(str) {
			// 定义正则表达式
			var reg = /^[a-zA-Z]{6,10}$/;
			// 判定
			if (reg.test(str)) {
				return "";
			}
			return "请输入6~10位的英文字符";
		},
		"fiveToTen": function(str) {
			// 定义正则表达式
			var reg = /^[a-zA-Z0-9]{5,10}$/;
			// 判定
			if (reg.test(str)) {
				return "";
			}
			return "请保持在5到10位之间！";
		}
	}

	return {
		add: function(type, handler) {
			// 判定是否已经存在该策略
			if (s[type]) {
				throw new Error("该策略已经存在");
			}
			s[type] = handler;
		},
		use: function(type, str) {
			if (s[type]) {
				return s[type](str);
			}
			throw new Error(type + "策略不存在");
		}
	}
})();