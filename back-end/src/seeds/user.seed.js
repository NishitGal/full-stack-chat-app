import User from "../modals/user.modal.js";
import { connectDB } from "../lib/db.js";
import { config } from "dotenv";

config();

const seedUsers = [
    // Female Users
    {
      email: "emma.thompson@example.com",
      fullname: "Emma Thompson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      email: "olivia.miller@example.com",
      fullname: "Olivia Miller",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      email: "sophia.davis@example.com",
      fullname: "Sophia Davis",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      email: "ava.wilson@example.com",
      fullname: "Ava Wilson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      email: "isabella.brown@example.com",
      fullname: "Isabella Brown",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      email: "mia.johnson@example.com",
      fullname: "Mia Johnson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      email: "charlotte.williams@example.com",
      fullname: "Charlotte Williams",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      email: "amelia.garcia@example.com",
      fullname: "Amelia Garcia",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  
    // Male Users
    {
      email: "james.anderson@example.com",
      fullname: "James Anderson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "william.clark@example.com",
      fullname: "William Clark",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "benjamin.taylor@example.com",
      fullname: "Benjamin Taylor",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "lucas.moore@example.com",
      fullname: "Lucas Moore",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "henry.jackson@example.com",
      fullname: "Henry Jackson",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "alexander.martin@example.com",
      fullname: "Alexander Martin",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "daniel.rodriguez@example.com",
      fullname: "Daniel Rodriguez",
      password: "12345678",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];
  

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function.
seedDatabase();
