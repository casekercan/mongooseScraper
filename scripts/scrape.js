var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {

    axios.get("https://techcrunch.com/").then(function (response) {

        var $ = cheerio.load(response.data);
        var articles = [];

        // Now, we grab every post-block within an article tag, and do the following:
        $(".post-block").each(function (i, element) {
            var titleToAdd = $(this).children("post-block__header").children("post-block__title").children("a").text().trim();
            var linkToAdd = $(this).children("post-block__header").children("post-block__title").children("a").attr("href");
            var summaryToAdd = $(this).children("post-block__content").text().trim();

            if (titleToAdd && linkToAdd && summaryToAdd) {
                var articleToAdd = {
                    title: titleToAdd,
                    link: linkToAdd,
                    summary: summaryToAdd,
                };
                articles.push(articleToAdd);
            }

        });
        cb(articles);
    });
};

module.exports = scrape;
