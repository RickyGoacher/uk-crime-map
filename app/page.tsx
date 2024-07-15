import Image from "next/image";
import styles from "./page.module.css";
import dynamic from 'next/dynamic'



const DynamicHeader = dynamic(() => import('./components/Map'), {
  ssr: false,
})

export default function Home() {

  return (
    <main className={styles.main}>
      <DynamicHeader/>
    </main>
  );
}
