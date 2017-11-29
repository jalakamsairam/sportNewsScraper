var express = require("express");
var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


router.get("/", function (req, res) {
  console.log("inside the '/'");
  console.log(req, res);
  db.Article.find({}).then(function (dbarticle) {
    console.log("the articles from database are", dbarticle);
    res.render("index", { article: dbarticle });
  }).catch(function (err) {
    res.json(err);
  })
});

router.put("/:id", function (req, res) {
  console.log(req.params.id);
  var query = { _id: (req.params.id) }
  console.log(query);
  // console.log(title);
  db.Article.findByIdAndUpdate(query, { $set: { 'isSaved': true } }, function (err, data) {
    if (err) { console.log(error) }
    res.end();
  })
})

router.get("/scrapesuccessful", function (req, res) {
  res.render("scrapesuccessful")
})

router.get("/saved", function (req, res) {
    db.Article.find({isSaved:true}).then(function(dbArticles){
      console.log("the articles from the database are",dbArticles);
      res.render("savedArticles",{article:dbArticles})
    })
    
 
})

router.get("/scrape", function (req, res) {
  axios.get("http://www.sportsonearth.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    $("article h1").each(function (i, element) {
      var result = {};
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      result.isSaved = false;
      // result.story = $(this).children("a").children()
      db.Article.create(result).
        then(function (dbarticle) {
          console.log(i)
          // res.render("scrapesuccessful");
          res.redirect("/scrapesuccessful");
        })//.catch(function(error){
      //   res.json(error);
      // })
    })
  })
})
module.exports = router;