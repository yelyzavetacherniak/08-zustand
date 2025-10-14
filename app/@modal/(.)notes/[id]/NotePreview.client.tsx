"use client";

import css from "./NotePreview.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "../../../../lib/api";
import { Note } from "../../../../types/note";
import Modal from "../../../../components/Modal/Modal";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note | null>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleRouter = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleRouter}>
      <div className={css.container}>
        <button
          className={css.backBtn}
          onClick={handleRouter}
        >
          Back
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created at: {note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
