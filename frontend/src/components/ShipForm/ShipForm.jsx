import { useState } from "react";

const ShipForm = ({ postOwner, postTitle, handleSendAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "", 
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendAlert({
      ...formData,
      username: postOwner.username, // Include the post owner's username
      postTitle, // Include the post title
      postOwnerEmail: postOwner.email, // Include the post owner's email
    });
    alert("Your request has been sent to the post owner!");
    setFormData({ name: "", phone: "", email: "", location: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>request to borrow: {postTitle}</h2>
      <label htmlFor="name">your name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="phone">phone number:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">your email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="location">let them know your general location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <label htmlFor="message">do you have a message for them:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Request</button>
    </form>
  );
};

export default ShipForm;