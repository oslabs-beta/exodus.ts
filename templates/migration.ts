module.exports = {
  async fwd(client, db) {
    
    await db.collection('food').updateOne({item:'whiskey'}, {$set:{price:25}});
    console.log('migration executed on food collections and whiskey item')
  },

  async back(client, db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};