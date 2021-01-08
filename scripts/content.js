function updateClipbardElements() {
	// console.log('updateClipbardElements');
	const elements = document.getElementsByClassName('js-clipboard-copy');
	Array.from(elements).forEach(element => {
		const fileName = element.getAttribute('value').split('/').slice(-1)[0];
		element.setAttribute('value', fileName);
		/*
		const newElem = element.cloneNode(true);
		newElem.setAttribute('value', fileName);
		element.parentElement.insertBefore(newElem, element.nextSibling);
		*/
		// console.log(newElem);
	});
}

window.onload = function () {
	updateClipbardElements();

	// Watch diff file additions
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			updateClipbardElements();
		});
	});
	const containers = document.getElementsByClassName('js-diff-progressive-container');
	Array.from(containers).forEach(container => {
		observer.observe(container, {
			childList: true
		});
	});

	// Watch page transitions
	const tabs = document.getElementsByClassName('tabnav-tab');
	const fileTab = Array.from(tabs).filter(function (element, index, array) {
		if (element.href == null) {
			return false;
		}
		return element.href.endsWith('files');
	})[0];
	if (fileTab != null) {
		fileTab.addEventListener('click', function () {
			window.setTimeout(updateClipbardElements, 3000);
		}, false);
	}
};