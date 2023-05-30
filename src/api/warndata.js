const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.MONGOOSE
);

const warnSchema = new mongoose.Schema({
  guild: String,
  memberId: String,
  warns: [
    {
      moderator: String,
      reason: String,
      time: Date,
    },
  ],
});

// Create a model based on the schema
const Warn = mongoose.model("Warn", warnSchema);

// Command handler for the !warn command
async function handleWarnCommand(interaction, reason, user) {
  // Get the guild ID, member ID, moderator ID, reason, and current time
  const guildId = interaction.guildId;
  const memberId = user;
  const moderatorId = interaction.user.id;
  const time = new Date();

  try {
    // Check if the member has any previous warns
    let existingWarns = await Warn.findOne({
      guild: guildId,
      memberId: memberId,
    });

    if (!existingWarns) {
      // If the member has no previous warns, create a new document
      existingWarns = new Warn({
        guild: guildId,
        memberId: memberId,
        warns: [],
      });
    }

    // Add the new warn to the member's warns array
    existingWarns.warns.push({
      moderator: moderatorId,
      reason: reason,
      time: time,
    });

    // Save the updated warns document to the database
    await existingWarns.save();

  } catch (err) {
    console.error("Error saving warn:", err);
  }
}

async function getExistingWarns(guildId, memberId) {
  if (guildId) {
    return await Warn.findOne({
      guild: guildId,
      memberId: memberId,
    }).exec();
  } else {
    return await Warn.findOne({ memberId: memberId }).exec();
  }
}
module.exports = {
  getExistingWarns,
  handleWarnCommand
};