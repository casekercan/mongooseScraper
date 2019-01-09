var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");



module.exports = function (router) {
    router.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticles) {
            var articles = {
                dbArticles: dbArticles
            };
            res.render("index", articles);
        }).catch(function (err) {
            console.log(err);
        });
    });

    router.get("/scrape", function (req, res) {
        axios.get("https://techcrunch.com/").then(function (response) {

            var $ = cheerio.load(response.data);

            $(".post-block").each(function (i, element) {

                var title = $(element).find(".post-block__title").children().text().trim();
                var link = $(element).find(".post-block__title").children().attr("href");
                var summary = $(element).find(".post-block__content").text().trim();

                db.Article.create({
                    title: title,
                    link: link,
                    summary: summary
                });

            });
        });
    });

    router.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id }).populate("note").then(function (result) {
            var article = {
                result: result
            };
            res.render("article", article);
        }).catch(function (err) {
            console.log(err);
        });
    });

    router.post("/articles/:id", function (req, res) {
        db.Note.create(req.body).then(function (note) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: note._id }, { new: true })
        }).then(function (result) {
            var article = {
                result: result
            };
            res.render("article", article);
        }).catch(function (err) {
            console.log(err);
        });
    })
}

