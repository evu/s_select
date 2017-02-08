var s_select = function(selector){
	
	var doc = document;
	
	var select;
	
	if (typeof selector === 'string') {
		select = doc.querySelector(selector);
	} else {
		select = selector;
	}
	
	var options = select.children;

	var u = {
		trigger: function(el, type){
			var e = doc.createEvent('HTMLEvents');
			e.initEvent(type, false, true);
			el.dispatchEvent(e);
		},
		hasClass: function(el, cls) {
			return (el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) ? true : false;
		},
		addClass: function(el, cls) {
			if (!this.hasClass(el, cls)) {
				el.className += " " + cls;
			}
		},
		removeClass: function(el, cls) {
			if (this.hasClass(el, cls)) {
				if (el.classList) {
					el.classList.remove(cls);
				} else {
					el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}
		}
	}

	var s_options = doc.createElement('ul');
	s_options.className = 's_options';

	var s_wrap = doc.createElement('div');
	s_wrap.className = 's_wrap';

	for	(var i = 0; i < options.length; i++) {
		var s_option = doc.createElement('li');
		s_option.className = 's_option';
		s_option.textContent = options[i].textContent;
		s_option.setAttribute('data-value', options[i].value);
		s_options.appendChild(s_option);
	}

	s_options.addEventListener('click', onOption);
	s_wrap.appendChild(s_options);
	select.parentNode.appendChild(s_wrap);
	select.style.display = 'none';

	function onOption(e){
		var target = e.target;

		if (target.nodeName == 'LI' && target !== s_options.children[0]) {

			if (s_options.children[0].getAttribute('data-value').length > 0) {
				s_options.removeChild(s_options.children[0]);
			}

			if (target.getAttribute('data-value').length == 0) {
				s_options.removeChild(s_options.children[0]);
			}

			var clone = target.cloneNode(true);
			s_options.insertBefore(clone, s_options.children[0]);

			select.value = target.getAttribute('data-value');
			u.trigger(select, 'change');
			u.removeClass(s_wrap, 's_wrap--active');

		} else {

			if (u.hasClass(s_wrap, 's_wrap--active')) {
				u.removeClass(s_wrap, 's_wrap--active');
			} else {
				u.addClass(s_wrap, 's_wrap--active');
			}
		}
	}
};
