"use client";

import photosGet, { Photo } from "@/actions/photos-get";
import React from "react";
import FeedPhotos from "./feed-photos";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/helper/loading";

// DUAS FORMAS DE UTILIZACAO, COM INTERSECTION-OBSERVER (LIBRARIE) E COM FUNCOES NATIVAS DO JS/REACT

export default function Feed({
  photos,
  user,
}: {
  photos: Photo[];
  user?: string;
}) {
  const [photosFeed, setPhotosFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinite, setInfinite] = React.useState(
    photos.length < 6 ? false : true,
  );
  const [scrollTrigger, isInView] = useInView({ threshold: 0.9 });

  const loadMorePhotos = React.useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const currentPage = page + 1;
    setPage((prevPage) => prevPage + 1);
    const { data: newPhotos } = await photosGet(
      { page: currentPage, total: 6, user: user ? user : 0 },
      { cache: "no-store" },
    );
    if (newPhotos) {
      if (newPhotos.length < 6) setInfinite(false);
      setPhotosFeed((currentPhotos) => [...currentPhotos, ...newPhotos]);
    }
    setLoading(false);
  }, [loading, page, user]);

  React.useEffect(() => {
    if (isInView && infinite) {
      loadMorePhotos();
    }
  }, [isInView, infinite, loadMorePhotos]);

  // const fetching = React.useRef(false);
  // function infiniteScroll() {
  //   if (fetching.current) return;
  //   fetching.current = true;
  //   setLoading(true);
  //   setTimeout(() => {
  //     setPage((currentPage) => currentPage + 1);
  //     fetching.current = false;
  //     setLoading(false);
  //   }, 1000);
  // }

  // React.useEffect(() => {
  //   if (page === 1) return;
  //   async function getNewPhotos() {
  //     const { data: newPhotos } = await photosGet({ page, total: 6, user: 0 });
  //     if (newPhotos) {
  //       setPhotosFeed((currentPhotos) => [...currentPhotos, ...newPhotos]);
  //       if (newPhotos.length < 6) setInfinite(false);
  //     }
  //   }
  //   getNewPhotos();
  // }, [page]);

  // React.useEffect(() => {
  //   if (infinite) {
  //     window.addEventListener("scroll", infiniteScroll);
  //     window.addEventListener("wheel", infiniteScroll);
  //   } else {
  //     window.removeEventListener("scroll", infiniteScroll);
  //     window.removeEventListener("wheel", infiniteScroll);
  //   }

  //   return () => {
  //     window.removeEventListener("scroll", infiniteScroll);
  //     window.removeEventListener("wheel", infiniteScroll);
  //   };
  // }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className="mx-auto my-4 flex h-24">
        {loading && <Loading modal={false} />}
        {!infinite && (
          <p className="m-auto text-center text-[#888]">
            Não existem mais postagens.
          </p>
        )}
      </div>
      <div ref={scrollTrigger} className="h-1"></div>
    </div>
  );
}
