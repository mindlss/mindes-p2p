const FileOffer = require('../schemas/FileOffer');

// Function to delete File Offers older than 24 hours
async function deleteOldFileOffers() {
  const time = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const result = await FileOffer.deleteMany({ createdAt: { $lt: time } });
    console.log(`GC: Deleted ${result.deletedCount} old File Offers`);
  } catch (err) {
    console.error(err);
  }
}

setInterval(deleteOldFileOffers, 60 * 60 * 1000);
console.log('Garbage Collector Started');
