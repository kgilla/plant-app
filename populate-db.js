#! /usr/bin/env node

console.log(
  "Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:password@cluster0-mbdj7.mongodb.net/db_name?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const Plant = require("./models/plant");
const Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let categories = [];

const categoryCreate = (name, description, cb) => {
  categoryInfo = { name, description };
  category = new Category(categoryInfo);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New category:" + category);
    categories.push(category);
    cb(null, category);
  });
};

const plantCreate = (name, description, category, price, stock, cb) => {
  plantInfo = { name, description, category, price, stock };
  plant = new Plant(plantInfo);

  plant.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New plant:" + plant);
    cb(null, plant);
  });
};

const createCategories = (cb) => {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Tropical",
          "Originating from the tropical climates of the world, these plants prefer moist soil conditions, high humidity, and indirect sunlight",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Succulent",
          "These Plants prefer arid dry conditions and are no stranger to heat. Succulents store most of their water inside their leaves and as such can go quite a while without a watering",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Ferns",
          "Ferns tend to thrive much like tropical plants do, prefering moist soil conditions, high humidity, and indirect sunlight. These plants work wonders for filtering air inside a home and produce lush growth that's easy on the eyes",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Trailing Plants",
          "These plants love to  trail and vine their ways around a space to get more sunlight and to extend their root systems. They are generally not very fussy plants and can help add beautiful accents to a house",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Flowering",
          "These plants produce amazing flowering given the appropriate conditions, adding a colorful addition to your home. These plants may need additional care during the season they are blooming but the extra effort will be definitely worth it!",
          callback
        );
      },
    ],
    cb
  );
};

function createPlants(cb) {
  async.parallel(
    [
      function (callback) {
        plantCreate(
          "Aloe",
          "Aloes are good indoor plants if you're busy and have a bright spot in your home. These houseplants have a bold texture that works particularly well with modern and contemporary decorating schemes, but they also fit in well if your tastes run more Mediterranean, eclectic, or exotic. While aloes are traditionally thought of for their foliage when grown as indoor plants, they can bloom with tall stems of brightly colored flowers if they get enough light. Aloe vera is the most common type of aloe, but there are plenty of other varieties available. Many have variegated foliage, which adds to their visual appeal. ",
          categories[1],
          12,
          20,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Boston Fern",
          "For over a hundred years, Boston ferns have played a starring role inside and out of America homes. This voluptuous, easy-care, fern grows just as well on porches and patios as it does gracing your front hall or living room. Boston ferns graceful produce arching branches covered with soft, emerald-green fronds. Indoors, Boston ferns will also help remove toxins such as toluene and xylene from the air. Hardy from zones 10-12.",
          categories[2],
          15,
          12,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Dracaena",
          "Dracaenas are a group of houseplants you just can't go wrong with. Why? They're among the easiest and most common indoor plants around. Young plants are small and bushy, making them perfect residents of desks and tabletops. Older dracaenas develop woody stems and can become tree like. In fact, after years and years, many healthy dracaenas can reach 5 or 6 feet tall. They're ideal for adding a bold splash of texture to your indoor decor. Add interest by selecting varieties variegated with contrasting colors. Striped-type dracaena offers just that: Beautiful leaves that look good by themselves or in combination with other plants. When they're young, they form low mounds that look a bit like stars; as they grow, they pick up some height, eventually becoming tree-like (though it takes a while in your average living room).",
          categories[0],
          24,
          8,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Palm",
          "Houseplant palms are perfect for adding a bold, tropical touch to your home. There's a variety of beautiful palm trees that thrive as houseplants in bright rooms. It's easy to decorate with these plants: Use palms to break up a section of blank wall, to fill an empty corner, to soften the edges of windows or furniture, or act as a living sculpture at the end of a side table. A row of houseplant palms can make for a lovely living screen or room divider, too! An easy way to dress up any palm is to grow it in an attractive container. Look for pots that match your decor style or color scheme. Tall, narrow pots are especially fun for houseplant palms because they accent the trees' elegant, upright shapes.",
          categories[0],
          19,
          14,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Croton",
          " One of the boldest houseplants around, you can't miss crotons because of their colorful foliage. Often boldly marked with bright yellow, orange, red, and even black, crotons are perfect for adding a tropical touch to indoor decor. They're particularly eye-catching in bright dining rooms and living rooms where their foliage helps energize a room.",
          categories[0],
          10,
          25,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Peace Lily",
          "Peace lily is a common houseplant that bears broad, dark green leaves and charming, white calla-like flowers on tall stems above the foliage. When in bloom, the plant looks best when grouped in clusters of three or more. Peace lily fits in well in just about every style of interior design, particular country and causal looks. Large specimens look great on the floor; smaller peace lily plants are perfect for tabletops or plant stands. Because peace lily is one of the most efficient houseplants at filtering indoor pollutants from the air, it's a great pick for bedrooms. ",
          categories[4],
          17,
          34,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Ivy",
          "Ivy is one of the most common houseplants around. A classic favorite, it's been loved for generations because ivy is easy to grow as an indoor plant. It tolerates low light, inconsistent watering, and continues to grow. Plus, because ivy is a vine, you can grow it in a hanging basket, let it trail over the sides of a pot, or let ivy climb to become a living curtain. There's a wide variety of ivies available; some have colorful variegated foliage or different leaf shapes. Shop around to make sure you find the best ivy for you -- or start a collection of this easy to grow houseplant! ",
          categories[3],
          13,
          23,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Philodendron",
          " Philodendron is a classic, and practically no-fail houseplant because it's so easy to grow. Happily, this makes it a pretty common indoor plant to find at your local garden center. The philodendron family is a pretty big one, too -- so you can find a variety of plants that grow in a range of shapes, sizes, and colors. Many of the traditional philodendron varieties are vines perfect for growing on a totem, up a trellis, or in a hanging basket and some offer pleasing variegated foliage. These are counted as some of the most easy to grow houseplants of all time. Upright-growing philodendrons are just as easy, but typically have larger leaves.",
          categories[3],
          24,
          12,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Cactus",
          "Looking for a plant you don't have to water much? A cactus might be your answer! Most cacti come from dryland areas and are used to being able to survive weeks without rainfall. Cactus houseplants have that same characteristic: Just give cacti a bright, sunny spot and you can enjoy the easy-care houseplants without a lot of tending. There's a wide variety of cacti to grow; they offer a plethora of shapes, colors, and sizes so you can find one that suits your personality and decor style. If they get enough light, many will bloom, producing cheery flowers in white, pink, red, orange, yellow, or purple. Some of the more common groups of cacti include Cereus, Echinocactus, Espostoa, Ferocactus, Mammillaria, Notocactus, Opuntia, Parodia, Pilosocereus, and Rebutia.",
          categories[1],
          24,
          5,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Jade",
          "Crassulas are in an amazingly diverse family of succulents. They offer fashionable looks with low water needs indoors and out. One of the most popular crassula species is jade plant (Crassula ovata). Jade plant grows a tree-like trunk and thick, fleshy dark green leaves. Other types feature different leaf sizes and colors -- from low-growing calico kitten to pine-like Crassula tetragona. Most of the crassula varieties we grow are well suited to bright spots indoors. Enjoy these easy-care succulents on window sills and under plant lights. They thrive on desks and tabletops. A collection of several different crassulas gives your favorite space a fun sculptural look.",
          categories[1],
          16,
          26,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Pothos",
          "A perfect houseplant for beginners, pothos is one of the easiest you can grow -- and one of the most popular. This hardy indoor plant features dark green leaves splashed and marbled in shades of yellow, cream, or white. Pothos is wonderfully versatile in the home: You can grow it in hanging baskets to trail down, let it climb a totem or trellis, or grow horizontally along a tabletop or mantle. ",
          categories[3],
          8,
          25,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Asparagus Fern",
          "A longtime favorite for adding texture to spaces indoors and out, asparagus fern is so versatile, you can grow it as a houseplant or outside in hanging baskets and container gardens. The plant's fine texture looks great no matter where you grow it! Indoors, asparagus fern hangs beautifully from baskets in front of windows. It's also a fine choice for coffee tables and other large horizontal surfaces. Upright varieties, such as foxtail fern, are perfect for small planters on desks or tabletops, as well as larger planters on the floor.",
          categories[2],
          18,
          13,
          callback
        );
      },
      function (callback) {
        plantCreate(
          "Bromeliad",
          "Bromeliads are bold, stylish houseplants that work especially well in contemporary, modern, and tropical decor styles. Bromeliads have colorful, long-lasting blooms (which last for weeks) that contrast beautifully against the strappy green leaves. You'll typically see them flower in shades of pink, red, orange, and yellow. ",
          categories[4],
          24,
          9,
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createCategories, createPlants],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Success!");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
