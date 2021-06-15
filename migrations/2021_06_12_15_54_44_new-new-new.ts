export const migration =  {
  async fwd(client:any, db:any) {

    await db.collection('food').updateOne({item:'milk'}, {$set:{quantity:100}});

  },

  async back(client:any, db:any) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('food').updateOne({item:'milk'}, {$set:{quantity:0}});
  },
};