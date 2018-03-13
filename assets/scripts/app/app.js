(function() {
	// polyfill for closest function
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || 	Element.prototype.webkitMatchesSelector;
	}
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var el = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	function toggleExpander(e) {
		e.preventDefault();
		var contentElCls = e.currentTarget.nextElementSibling.classList;
		var openedClassName = 'expander__item__content--open';
		var titleOpenClass = 'expander__item__title--open';
		var clickedArrowImg = e.currentTarget.querySelector('img.expander__item__title__arrow');
		if (contentElCls.contains(openedClassName)) {
			contentElCls.remove(openedClassName);
			e.currentTarget.classList.remove(titleOpenClass);
		} else {
			contentElCls.add(openedClassName);
			e.currentTarget.classList.add(titleOpenClass);
		}

	};

	document.addEventListener('DOMContentLoaded', function () {
		forEachElement(document, '.expander__item__title', function(e) {
			e.onclick = toggleExpander;
		});

		forEachElement(document, '.expander__item__button--close', function(e) {
			e.onclick = function(evt) {
				var parentTitle = evt.currentTarget.closest('.expander__item').querySelector('.expander__item__title');
				parentTitle.click();
				parentTitle.scrollIntoView();
			}
		});
  	})
})();