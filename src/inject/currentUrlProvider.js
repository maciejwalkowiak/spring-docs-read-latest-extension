const supportedProjects = ['spring-boot', 'spring', 'spring-amqp', 'spring-data/jpa'];

function provideCurrentUrl(url) {
    if (url.startsWith("https://docs.spring.io")) {
        let regExp = /(https:\/\/docs.spring.io\/)(?<project>[^ $]*)(\/docs\/)(?<version>[^ /]*)\/(.*)/;
        const { groups: { project, version } } = regExp.exec(url);

        if (supportedProjects.includes(project) && version !== 'current') {
            return {project: project, url: url.replace(regExp, `$1${project}$3current/$5`)};
        } else {
            return null;
        }
    } else if (url.startsWith("https://cloud.spring.io/spring-cloud-static/spring-cloud-kubernetes/")) {
        let regExp = /(https:\/\/cloud.spring.io\/spring-cloud-static\/spring-cloud-kubernetes\/)(?<version>[^ /]*)\/(?<path>.*)/;
        const { groups: { path, version } } = regExp.exec(url);

        return {project: "spring-cloud-kubernetes", url: "https://docs.spring.io/spring-cloud-kubernetes/docs/current/" + path};
    }
}

if (typeof(module) !== "undefined") {
    module.exports = provideCurrentUrl
}