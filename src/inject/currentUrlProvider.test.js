const provideCurrenturl = require("./currentUrlProvider");

test('provides current url for spring boot reference', () => {
    expect(provideCurrenturl("https://docs.spring.io/spring-boot/docs/2.1.13.RELEASE/reference/html/boot-features-external-config.html"))
        .toStrictEqual({project: "spring-boot", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html"});
});

test('does not provide current url for the latest spring boot url', () => {
    expect(provideCurrenturl("https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html"))
        .toBeNull();
});

test('provides current url for spring cloud kubernetes reference', () => {
    expect(provideCurrenturl("https://docs.spring.io/spring-boot/docs/2.1.13.RELEASE/reference/html/boot-features-external-config.html"))
        .toStrictEqual({project: "spring-boot", url: "https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html"});
});

test('spring cloud kubernetes', () => {
    expect(provideCurrenturl("https://cloud.spring.io/spring-cloud-static/spring-cloud-kubernetes/1.1.0.RC2/reference/html/#leader-election"))
        .toStrictEqual({project: "spring-cloud-kubernetes", url: "https://docs.spring.io/spring-cloud-kubernetes/docs/current/reference/html/#leader-election"});
});