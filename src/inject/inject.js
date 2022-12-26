const supportedProjects = ['spring-boot', 'spring-framework'];

function addLaterVersionHeader(project, urlLatestVersion) {
	const status = document.createElement('div');
	status.classList.add('spring-latest-docs-note');
	status.id = 'spring-latest-docs-note';
	status.innerHTML = `
						<div>This is the documentation for an older version of <strong>${project}</strong>. 
						<a href="${urlLatestVersion}">
						   <strong>Read Latest</strong>
						</a>
            			</div>
            			<button id='spring-latest-docs-note-close'>Close</button>`;

	document.body.prepend(status);

	const closeButton = document.getElementById('spring-latest-docs-note-close')
	closeButton.addEventListener('click', function() {
				const div = document.getElementById('spring-latest-docs-note')
				document.body.removeChild(div)
			}
	);
}

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

			const url = window.location.href;

			if (url.startsWith("https://docs.spring.io")) {
				let regExp = /(https:\/\/docs.spring.io\/)(?<project>[^ $]*)(\/docs\/)(?<version>[^ /]*)\/(.*)/;
				const { groups: { project, version } } = regExp.exec(url);

				if (supportedProjects.includes(project) && version !== 'current') {
					const urlLatestVersion = url.replace(regExp, `$1${project}$3current/$5`)

					addLaterVersionHeader(project, urlLatestVersion);
				}
			}
        }
    }, 10);
});