"use client";

import { PhotoSelected } from "@/actions/photo-get";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import Link from "next/link";
import PhotoDelete from "./photo-delete";
import styles from "./photo-content.module.css";
import PhotoComments from "./photo-comments";

export default function PhotoContent({
  data,
  single,
}: {
  data: PhotoSelected;
  single: boolean;
}) {
  const { user } = useUser();

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image
          width={1000}
          height={1000}
          src={data.photo.src}
          alt={data.photo.title}
        />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user?.username === data.photo.author ? (
              <PhotoDelete id={data.photo.id} />
            ) : (
              <Link href={`/perfil/${data.photo.author}`}>
                @{data.photo.author}
              </Link>
            )}
            <span className={styles.visualizacoes}>{data.photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${data.photo.id}`}>{data.photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{data.photo.peso} kg</li>
            <li>{data.photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments
        id={data.photo.id}
        comments={data.comments}
        single={single}
      />
    </div>
  );
}
