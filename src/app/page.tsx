import Main from "@/components/Main/Main";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import '../app/style.css'
import '../app/globals.css'
import styles from './page.module.css'

export default function Home() {
  return (
   <div className={styles.wrapper}>
  <div className={styles.container}>
  <Main />
  <Bar />
  <Footer />
  </div>
</div>
  );
}
