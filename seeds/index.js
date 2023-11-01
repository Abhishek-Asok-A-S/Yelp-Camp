const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors, numbers } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
  await Campground.deleteMany({});
  // const c= new Campground({title:'purple field'})
  // await c.save();
  for (let i = 0; i < 50; i++) {
    const ramdom1000 = Math.floor(Math.random() * 1000);
    const price =Math.floor(Math.random()*20) +10;
    

    const camp = new Campground({
      author:'651e6bc2545a1eb020d773a7',
      location: `${cities[ramdom1000].city},
            ${cities[ramdom1000].state}`,
      title: `${sample(descriptors)} ${sample(places)} `,
      // image:'https://picsum.photos/200',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere,facilis doloremque beatae incidunt officiis quam distinctio in fugit, perspiciatis vel saepe blanditiis temporibus harum. Neque ipsa laborum eius exercitationem voluptatum!',
      price,
      images:[
        {
          url: 'https://res.cloudinary.com/dsc4wq3f3/image/upload/v1696766556/Yelp_camp/zfxek8xatuczlkt1lemb.jpg',
          filename: 'Yelp_camp/zfxek8xatuczlkt1lemb',
        },
        {
          url: 'https://res.cloudinary.com/dsc4wq3f3/image/upload/v1696766557/Yelp_camp/xdgp5wuhbdqgfybq1gmj.webp',
          filename: 'Yelp_camp/xdgp5wuhbdqgfybq1gmj',
        },
        {
          url: 'https://res.cloudinary.com/dsc4wq3f3/image/upload/v1696766558/Yelp_camp/y7yawbpvg2sjjekcvnz1.webp',
          filename: 'Yelp_camp/y7yawbpvg2sjjekcvnz1',
        }
      ]
    });
    await camp.save();
  }
};
seedDB().then(()=>{
    mongoose.connection.close()
})

