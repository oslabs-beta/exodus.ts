export const migration = {
  async fwd(client:any, db:any) {
    // write the statements to forward your migration here 
    // Example:
    // await db.collection('food').updateOne({item: 'boba'}, {$set: {price: 25}});
  },

  async back(client:any, db:any) {
    // write the statements to rollback your migration here (if possible)
    // Example:
    // await db.collection('food').updateOne({item: 'boba'}, {$set: {price: 0}});
  },
};