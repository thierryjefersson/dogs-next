import { Photo } from "@/actions/photos-get";
import Link from "next/link";
import Image from "next/image";

export default function FeedPhotos({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid animate-left grid-cols-2 justify-center gap-4 md:grid-cols-3">
      {photos.map((photo, i) => (
        <li
          className="group md:[&:nth-child(2)]:col-span-2 md:[&:nth-child(2)]:row-span-2"
          key={photo.id + i + Math.random() * 1000}
        >
          <Link
            href={`/foto/${photo.id}`}
            className="grid overflow-hidden rounded-md"
            scroll={false}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              width={1000}
              height={1000}
              priority={i <= 6}
              className="col-span-1 col-start-1 row-span-1 row-start-1"
              sizes="(max-width: 768px) 50vw, 80vw"
            />
            <span className="col-span-1 col-start-1 row-span-1 row-start-1 hidden size-full items-center justify-center bg-black bg-opacity-[.3] text-white before:mr-1 before:inline-block before:h-2.5 before:w-4 before:bg-[url('/images/visualizacao.svg')] before:bg-no-repeat before:content-[''] group-hover:flex">
              {photo.acessos}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
