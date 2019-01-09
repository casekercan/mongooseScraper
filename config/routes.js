module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("index");
    });

    router.get("/article/:id", function (req, res) {
        res.render("article");
    });
}

