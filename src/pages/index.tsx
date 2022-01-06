import styles from './index.less';

export default function IndexPage(props: any) {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {props.children}
    </div>
  );
}
