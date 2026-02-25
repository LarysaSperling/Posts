import { useForm } from "react-hook-form";
import { postsApi } from "../../api/posts";
import styles from "./styles.module.css";
import avatar from "../../assets/avatar.svg";

export default function PostForm({ onCreated }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
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

      <div className={styles.formWrap}>
        <img className={styles.avatar} src={avatar} alt="avatar" />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className={styles.label}>Заголовок</label>
          <input
            id="title"
            className={styles.input}
            placeholder="Введите заголовок..."
            {...register("title", { required: "Введите заголовок" })}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label htmlFor="content" className={styles.label}>Текст поста</label>
          <textarea
            id="content"
            className={styles.textarea}
            placeholder="Введите текст..."
            {...register("content", { required: "Введите текст поста" })}
          />
          {errors.content && <p className={styles.error}>{errors.content.message}</p>}

          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Публикация
          </button>
        </form>
      </div>
    </div>
  );
}