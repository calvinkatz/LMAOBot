module.exports = {
  // Information
  name: 'pun',
  aliases: [''],
  description: 'LMAOBot will tell you a pun.',
  // Requirements
  // Custom Data
  responses: [
    'About a month before he died, my uncle had his back covered in lard. After that, he went down hill fast.',
    'I bought some shoes from a drug dealer. I don\'t know what he laced them with, but I\'ve been tripping all day.',
    'For Halloween we dressed up as almonds. Everyone could tell we were nuts.',
    'My dad died when we couldn\'t remember his blood type. As he died, he kept insisting for us to \'be positive\', but it\'s hard without him.',
    'Atheists don\'t solve exponential equations because they don\'t believe in higher powers.',
    'What\'s the difference of deer nuts and beer nuts? Beer nuts are a $1.75, but deer nut are under a buck.',
    'The future, the present and the past walked into a bar. Things got a little tense.',
    'Atheism is a non-prophet organization.',
    'I just found out I\'m colorblind. The diagnosis came completely out of the purple.',
    'I saw an ad for burial plots, and thought to myself this is the last thing I need.',
    'What do you call a dictionary on drugs? HIGH-Definition.',
    'Just burned 2,000 calories. That\'s the last time I leave brownies in the oven while I nap.',
    'What did E.T.\'s mother say to him when he got home? \'Where on Earth have you been?!\'',
    'Did you hear about the kidnapping at school? It\'s okay. He woke up.',
    'Two blondes were driving to Disneyland. The sign said, \'Disneyland Left\'. So they started crying and went home.',
    'Dr.\'s are saying not to worry about the bird flu because it\'s tweetable.',
    'Heard about the drug addict fisherman who accidentally caught a duck? Now he\'s hooked on the quack.',
    'I don\'t engage in mental combat with the unarmed.',
    'Oxygen is proven to be a toxic gas. Anyone who inhales oxygen will normally dies within 80 years.',
    'I ordered 2000 lbs. of chinese soup. It was Won Ton.',
    'Claustrophobic people are more productive thinking out of the box.',
    'Did you hear they banned fans from doing \'The Wave\' at all sports events? Too many blondes were drowning.',
    'A termite walks into a bar and says, \'Where is the bar tender?\'',
    'eBay is so useless. I tried to look up lighters and all they had was 13,749 matches',
    'Did you hear about the 2 silk worms in a race? It ended in a tie!',
    'What\'s the difference between a poorly dressed man on a bicycle and a nicely dressed man on a tricycle? A tire.',
    'A cop just knocked on my door and told me that my dogs were chasing people on bikes. My dogs don\'t even own bikes...',
    'I was addicted to the hokey pokey... but thankfully, I turned myself around.',
    'Why do the French eat snails? They don\'t like fast food.',
  ],
  // Function
  run: (client, command, msg, args) => {
    msg.channel.send(command.responses[Math.floor(Math.random() * command.responses.length)]);
  },
};