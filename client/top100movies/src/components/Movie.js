import styles from "./styles/Movie.module.css";
import { AspectRatio, Image } from "@chakra-ui/react";

export default function Movie({ movie, onPosterClicked }) {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <>
      <AspectRatio ratio={2 / 3}>
        <Image
          boxShadow={"3xl"}
          borderRadius={"2xl"}
          className={`img-thumbnail poster ${styles["poster"]}`}
          src={poster}
          alt={`Poster for ${movie.title}`}
          onClick={() => onPosterClicked(movie)}
        />
      </AspectRatio>
    </>
  );
}
