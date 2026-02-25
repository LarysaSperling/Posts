import styles from "./styles.module.css";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <a className={styles.link} href="#">Главная</a>
          <a className={styles.link} href="#">Музыка</a>
          <a className={styles.link} href="#">Сообщества</a>
          <a className={styles.link} href="#">Друзья</a>
        </nav>
      </div>
    </header>
  );
}