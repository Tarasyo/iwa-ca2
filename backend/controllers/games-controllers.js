var Game = require('../models/games');
var Genre = require('../models/genre');
const fs = require('fs');

//Req Res handele functions of the game

exports.createGame = function(req, res) { 
    var newgame = new Game(req.body);
    newgame.image = req.file.path;
    newgame.save(function (err, game) { 
        if (err) { 
            res.status(400).json(err);
        }

    res.json(game); 
});
};

exports.getGames = function(req, res) {
  Game.find({}, function (err, games) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(games);
  }); 
};

exports.getGame = function(req, res) {
  Game.findOne({_id: req.params.gid}, function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};

exports.getGameByGenreId = function(req, res) {
  Game.find({genreId: req.params.uid}, function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};

exports.updateGame = function(req, res) {
  Game.findOneAndUpdate({_id: req.params.gid}, req.body, {new: true},function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(game);
  }); 
};

exports.deleteGame = function(req, res) {
  Game.findByIdAndRemove(req.params.gid, function (err, game) {
    if (err) {
      res.status(400).json(err);
    } 
    var imagePath = game.image;
    fs.unlink(imagePath, err => {
        console.log(err);
    });
    res.json(game);
  }); 
};
