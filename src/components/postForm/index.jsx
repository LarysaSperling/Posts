import { useForm } from "react-hook-form";
import { postsApi } from "../../api/posts";
import styles from "./styles.module.css";
import avatar from "../../assets/avatar.svg";

export default function PostForm({ onCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { title: "", text: "" },
  });

  const onSubmit = async (data) => {
    const res = await postsApi.create({
      title: data.title.trim(),
      
      text: data.text.trim(),
      createdAt: new Date().toISOString(),
    });

    reset();
    onCreated?.(res.data);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Написать пост</h2>

      <div className={styles.formWrap}>
        <img src={avatar} className={styles.avatar} alt="User avatar" />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label} htmlFor="title">
            Заголовок
          </label>
          <input
            id="title"
            className={styles.input}
            placeholder="Введите заголовок..."
            {...register("title", { required: "Введите заголовок" })}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}

          <label className={styles.label} htmlFor="text">
            Текст поста
          </label>
          <textarea
            id="text"
            className={styles.textarea}
            placeholder="Введите текст..."
            {...register("text", { required: "Введите текст поста" })}
          />
          {errors.text && <p className={styles.error}>{errors.text.message}</p>}

          <button className={styles.button} disabled={isSubmitting} type="submit">
            Публикация
          </button>
        </form>
      </div>
    </section>
  );
}