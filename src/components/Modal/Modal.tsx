'use client'
import styles from './Modal.module.css'

type ModalProps = {
    items: string[] 
  }

export function Modal({items}:ModalProps) {
  const uniqueItems = Array.from(new Set(items)).filter(Boolean);

  if (uniqueItems.length === 0) return null;

  if (!items || items.length === 0) {
    return null 
  }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <ul className={styles.listItem}>
                   
                    { uniqueItems.map((item)=>(
                          <li key={item} className={styles.item}><a href='#'>{item}</a></li>
                    ))}
                  
                </ul>
            </div>
        </div>
    )
}
