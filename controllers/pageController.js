var express = require("express");
var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


router.get("/",function(req,res){
  db.Article.find({}).then(function(dbarticle){
    console.log(dbarticle)
    res.render("index",{article:dbarticle});
    }).catch(function(err){
      res.json(err);
    })
 });

router.get("/saved",function(req,res){
  res.render("savedArticles");
})

router.get("/scrape",function(req,res){
  axios.get("http://www.sportsonearth.com/").then(function(response){
    var $ = cheerio.load(response.data);
    $("article h1").each(function(i,element){
      var result = {};
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      result.isSaved = false;
      // result.story = $(this).children("a").children()
      db.Article.create(result).then(function(dbarticle){
        res.render("scrapesuccessful");
      }).catch(function(error){
        res.json(error);
      })
    })
  })
})
module.exports = router;