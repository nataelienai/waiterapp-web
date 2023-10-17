import closeIcon from '../../assets/images/close-icon.svg';
import { IOrder } from '../../types/IOrder';
import { formatCurrency } from '../../utils/formatCurrency';

import { Actions, Body, OrderDetails, Overlay } from './styles';

interface IOrderModalProps {
  visible: boolean;
  order: IOrder | null;
  onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: IOrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const totalPrice = order.products.reduce(
    (total, { product, quantity }) => total + quantity * product.price,
    0,
  );

  return (
    <Overlay>
      <Body>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em produção'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div key={_id} className="item">
                <img
                  width="56"
                  height="28.51"
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type="button" className="primary">
            <span>👩‍🍳</span>
            <strong>Iniciar producação</strong>
          </button>

          <button type="button" className="secondary">
            <strong>Cancelar pedido</strong>
          </button>
        </Actions>
      </Body>
    </Overlay>
  );
}
