import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as postService from "../../services/postService";  

const PostForm = (props) => {
  const [postFormData, setPostFormData] = useState({
    title: "",
    category: "jackets/coats",
    size: "",
    avaibility: true,
    photo: "",
    moreInfo: "",
  });

  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setPostFormData(postData);
    };
    if (postId) fetchPost();
  }, [postId]);

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setPostFormData({
      ...postFormData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddPost(postFormData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title:</label>
        <input
          required
          type="text"
          name="title"
          value={postFormData.title}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category:</label>
        <select
          required
          name="category"
          value={postFormData.category}
          onChange={handleChange}
        >
          <option value="jackets/coats">jackets/coats</option>
          <option value="sweaters">shirts</option>
          <option value="tops">tops</option>
          <option value="pants">pants</option>
          <option value="jeans">jeans</option>
          <option value="shorts">shorts</option>
          <option value="skirts">skirts</option>
          <option value="dresses">dresse</option>
        </select>
        <label htmlFor="size-input">size:</label>
        <input
          required
          type="text"
          name="size"
          value={postFormData.size}
          onChange={handleChange}
        />
        <label htmlFor="avaibility-input">avaibility:</label>
        <input
          type="checkbox"
          name="avaibility"
          value={postFormData.avaibility}
          onChange={handleChange}
        />
        <label htmlFor="photo-input">photo:</label>
        <input
          type="text"
          name="photo"
          value={postFormData.photo}
          onChange={handleChange}
        />
        <label htmlFor="moreInfo-input">moreInfo:</label>
        <input
          type="text"
          name="moreInfo"
          value={postFormData.moreInfo}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default PostForm;
