const express = require("express");
const Contact = require("../Modal/formModal");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vamshimamidala2521@gmail.com",
    pass: "yzxt xzld qxir wgwy",
  },
});

router.post("/contact", async (req, res) => {
  const { name, email, phone,  service, message } = req.body;

  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();

    const mailOptions = {
      from: "vamshimamidala2521@gmail.com",
      to: "vamshimamidala12@gmail.com",
      subject: "New Contact details Received",
      text: `
        Name: ${name}
         Email: ${email}
        Phone: ${phone}
        Service:${service}
        Message:${message}
        
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Contact submitted and email sent", contact: savedContact });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to submit Contact" });
  }
});


router.get('/contact', async (req, res) => {
    try {
      const newcontact = await Contact.find(); // Fetch all features from the database
      res.status(200).json(newcontact); // Send the retrieved features as a response
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Contact', details: error.message });
    }
  });
// Delete a restaurant feature by ID
router.delete('/contact/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedcontact = await Contact.findByIdAndDelete(id);
  
      if (!deletedcontact) {
        return res.status(404).json({ message: 'Contact details not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting Contact', error });
    }
  });
module.exports = router;