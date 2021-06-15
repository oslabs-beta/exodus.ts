export const migration = {
  async fwd(client:any, db:any) {
    
    await db.collection('food').updateOne({item:'whiskey'}, {$set:{price:25}});
    console.log('migration executed on food collections and whiskey item')
  },

  async back(client:any, db:any) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};