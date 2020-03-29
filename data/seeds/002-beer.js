
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('beers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('beers').insert([
        {id: 1, name: 'Red Oak Bavarian Amber Lager', tagline: 'Smooth and pure', description: 'Unpasteurized, unfiltered, pure Bavarian lager and the flagship beer of the Red Oak Brewery', image_url: 'https://redoakbrewery.com/wp-content/uploads/2019/04/Red-Oak-cropped.png', abv: 5.0},
        {id: 2, name: 'Blue Moon Belgian White', tagline: 'Refreshing wheat ale', description: 'A wheat beer brewed with Valencia orange peel for a subtle sweetness and bright, citrus aroma', image_url: 'https://www.bluemoonbrewingcompany.com/sites/bluemoon/files/styles/beers/public/beers/2018-06/BlueMoon-BelgianWhite.png?itok=AonO8W6_', abv: 5.4},
        {id: 3, name: 'Sam Adams Boston Lager', tagline: 'Full flavored lager', description: 'A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish', image_url: 'https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F', abv: 5.0}
      ]);
    });
};
