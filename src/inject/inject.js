const supportedProjects = ['spring-boot', 'spring'];

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

			const url = window.location.href;

			if (url.startsWith("https://docs.spring.io")) {
				let regExp = /(https:\/\/docs.spring.io\/)(?<project>[^ $]*)(\/docs\/)(?<version>[^ /]*)\/(.*)/;
				const { groups: { project, version } } = regExp.exec(url);

				if (supportedProjects.includes(project) && version !== 'current') {
					const currentUrl = url.replace(regExp, `$1${project}$3current/$5`)

					const status = document.createElement("div")
					status.classList.add("spring-latest-docs-note")
					status.innerHTML = `
						This is the documentation for an older version of <strong>${project}</strong>. 
						<a href="${currentUrl}">
						   <strong>Read Latest</strong>
						</a>`;

					document.body.prepend(status);
					document.body.style.paddingTop += 20;
				}
			}
        }
    }, 10);
});