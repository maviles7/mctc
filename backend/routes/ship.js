const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  const { name, phone, email, location, message, postTitle, postOwnerEmail } =
    req.body;

  // Validate required fields
  if (!name || !email || !postTitle || !postOwnerEmail) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: postOwnerEmail,
      subject: `Borrow Request for "${postTitle}"`,
      text: `
        Hello,

        ${name} wants to borrow your item: "${postTitle}".

        Contact Details:
        - Name: ${name}
        - Phone: ${phone}
        - Email: ${email}
        - Location: ${location}

        Message:
        ${message}

        Please respond to the requester to coordinate further.

        Best regards,
        Mi Closet Ti Closet Team
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
