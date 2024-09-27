import styles from './constructor-page.module.css';
import { ingredientsApi } from '../../services/slices/ingredientsSlice';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const { data, isLoading, error } = ingredientsApi.useGetIngredientsQuery();
  const ingredients = data?.data;

  if (!isLoading && ingredients?.length === 0) {
    return <p className='message'>Нет ни одного ингредиента</p>;
  }

  if (!isLoading && error) {
    return (
      <p className='error'>
        Запрос завершился с ошибкой: {JSON.stringify(error)}
      </p>
    );
  }

  return (
    <>
      {isLoading ? (
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
