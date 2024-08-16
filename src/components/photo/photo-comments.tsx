"use client";

import React from "react";
import styles from "./photo-comments.module.css";
import { Comments } from "@/actions/photo-get";
import { useUser } from "@/context/user-context";
import PhotoCommentsForm from "./photo-comments-form";

type PhotoCommentsParams = {
  id: number;
  comments: Comments[];
  single: boolean;
};

const PhotoComments = (props: PhotoCommentsParams) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef<HTMLUListElement | null>(null);
  const { user } = useUser();

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
        ref={commentsSection}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <strong>{comment.comment_author}:</strong>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          id={props.id}
          setComments={setComments}
          single={props.single}
        />
      )}
    </>
  );
};

export default PhotoComments;
