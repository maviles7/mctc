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
    if (postId) {
      props.handleUpdatePost(postId, postFormData);
    } else {
      props.handleAddPost(postFormData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{postId ? "edit post" : "new post"}</h1>
        <label htmlFor="title-input">title:</label>
        <input
          required
          type="text"
          name="title"
          value={postFormData.title}
          onChange={handleChange}
        />
        <label htmlFor="category-input">category:</label>
        <select
          required
          name="category"
          value={postFormData.category}
          onChange={handleChange}
        >
          {}
          <option value="jackets/coats">jackets/coats</option>
          <option value="sweaters">shirts</option>
          <option value="fancy tops">fancy tops</option>
          <option value="casual tops">casual tops</option>
          <option value="pants">pants</option>
          <option value="jeans">jeans</option>
          <option value="shorts">shorts</option>
          <option value="skirts">skirts</option>
          <option value="dresses">dresses</option>
          <option value="bags">bags</option>
          <option value="accessories">accessories</option>
          <option value="athletic/sporty">athletic/sporty</option>
        </select>
        <label htmlFor="size-input">sizing info:</label>
        <input
          required
          type="text"
          name="size"
          value={postFormData.size}
          onChange={handleChange}
        />
        <label htmlFor="avaibility-input">currently available to share:</label>
        <input
          type="checkbox"
          name="avaibility"
          value={postFormData.avaibility}
          onChange={handleChange}
        />
        <label htmlFor="photo-input">link to photo:</label>
        <input
          type="text"
          name="photo"
          value={postFormData.photo}
          onChange={handleChange}
        />
        <label htmlFor="moreInfo-input">additional info:</label>
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
