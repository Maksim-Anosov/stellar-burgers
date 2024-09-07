import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(selectIngredients);

  if (!ingredients.loading && ingredients.ingredients.length === 0) {
    return <p className='message'>Нет ни одного ингредиента</p>;
  }

  if (!ingredients.loading && ingredients.error) {
    return (
      <p className='error'>Запрос завершился с ошибкой: {ingredients.error}</p>
    );
  }

  return (
    <>
      {ingredients.loading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
