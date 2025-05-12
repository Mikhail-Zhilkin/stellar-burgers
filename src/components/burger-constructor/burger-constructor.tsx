import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrderModal } from '../../slices/orderSlice';
import { clearConstructor } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.constructorSlice);
  const isAuth = useSelector((state) => state.userSlice.isAuthenticated);

  const orderRequest = useSelector((state) => state.orderSlice.orderRequset);

  const orderModalData = useSelector((state) => state.orderSlice.orderModal);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
    }
    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    if (orderRequest) {
      return <Preloader />;
    }

    dispatch(createOrder(ingredients))
      .then(() => dispatch(clearConstructor()))
      .catch((err) => console.log(err));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
