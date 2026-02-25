import { useForm } from "react-hook-form";
import { postsApi } from "../../api/posts";
import styles from "./styles.module.css";

export default function PostForm({ onCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (data) => {
    const res = await postsApi.create({
      title: data.title.trim(),
      content: data.content.trim(),
      createdAt: new Date().toISOString(),
    });

    reset();

   
    onCreated?.(res.data);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Написать пост</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className={styles.label}>
          Заголовок
        </label>
        <input
          id="title"
          className={styles.input}
          placeholder="Введите заголовок..."
          {...register("title", {
            required: "Введите заголовок",
            minLength: { value: 2, message: "Минимум 2 символа" },
          })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <label htmlFor="content" className={styles.label}>
          Текст поста
        </label>
        <textarea
          id="content"
          className={styles.textarea}
          rows={5}
          placeholder="Введите текст..."
          {...register("content", {
            required: "Введите текст поста",
            minLength: { value: 5, message: "Минимум 5 символов" },
          })}
        />
        {errors.content && (
          <p className={styles.error}>{errors.content.message}</p>
        )}

        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Публикация"}
        </button>
      </form>
    </div>
  );
}