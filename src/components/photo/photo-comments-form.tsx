import React from "react";
import styles from "./photo-comments-form.module.css";
import { Comments } from "@/actions/photo-get";
import commentPost from "@/actions/comment-post";

type PhotoCommentsParams = {
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  single: boolean;
};

export default function PhotoCommentsForm({
  id,
  setComments,
  single,
}: PhotoCommentsParams) {
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { sucessful, data, error } = await commentPost(id, { comment });
    error ? setError(error) : setError("");
    if (sucessful && data) {
      setComments((comments) => [...comments, data]);
      setComment("");
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>Enviar</button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </form>
  );
}
