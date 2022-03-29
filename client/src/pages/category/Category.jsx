import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./category.css";

function Category() {
  const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

  const [category, setCategory] = useState({});
  const [post, setPosts] = useState([]);
  const categoryName = useParams().categoryName;

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(`/posts/getAll`);
      const post = res.data; //filter((item) => item.category);

      const promise = new Promise((resolve, reject) => {
        const formatedPost = [];
        post.forEach(async (element, index) => {
          const res = await axios.get(`/users?userId=${element.userId}`);
          const newData = element;
          newData.userData = res.data;
          formatedPost.push(newData);
          if (post.length === formatedPost.length) resolve(formatedPost);
        });
      });

      promise.then((data) => {
        console.log(data);
        setPosts(data);
      });
    };
    fetchCategory();
  }, [categoryName]);

  const styles = [
    "testimonial grid-col-span-2 flow bg-primary-400 quote text-neutral-100",
    "testimonial flow bg-secondary-400 text-neutral-100",
    "testimonial flow bg-neutral-100 text-secondary-400",
    "testimonial grid-col-span-2 flow bg-secondary-500 text-neutral-100",
    "testimonial flow bg-neutral-100 text-secondary-400",
  ];

  return (
    <div className="mainContainer">
      <h1>Page "Category" : {categoryName}</h1>
      {post ? (
        <div className="testimonial-grid">
          {post.map((item, index) => {
            return (
              <article className={styles[index] || styles[0]} key={item._id}>
                <div className="flex">
                  <div>
                    <img
                      src={
                        item.userData.avatar
                          ? `${MEDIA}/${item.userData.avatar}`
                          : `${MEDIA}/profile/defaultAvatar.jpg`
                      }
                    />
                  </div>
                  <div>
                    <h2 className="name">{item.userData.username}</h2>
                  </div>
                </div>
                <p>{item.title}</p>
                <p>{item.content}</p>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Category;
