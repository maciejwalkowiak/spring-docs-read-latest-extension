chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

			const url = window.location.href;
			const currentUrl = provideCurrentUrl(url);

			if (currentUrl !== null) {
				const status = document.createElement("div")
				status.classList.add("spring-latest-docs-note")
				status.innerHTML = `
						This is the documentation for an older version of <strong>${currentUrl.project}</strong>. 
						<a href="${currentUrl.url}">
						   <strong>Read Latest</strong>
						</a>`;

				document.body.prepend(status);
				document.body.style.paddingTop += 20;
			}
        }
    }, 10);
});