import { SaveIcon, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "..";
import { useItem } from "../../../context/Item";
import {
  createItemRequest,
  itemReset,
  updateItemRequest,
} from "../../../store/modules/item/actions";
import { Button } from "../../Button";

const units = ["Unidade", "Peça", "Kg", "M", "M²", "M³", "Litro", "Hora"];
export function ItemsRegister() {
  const { item, updateItem, resetItemState } = useItem();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, success } = useSelector((state) => state.item || {});
  const dispatch = useDispatch();

  const total = useMemo(() => {
    const taxes = Number(item.taxes / 100) + 1;
    const value = Number(item.unityPrice) * taxes;

    return value.toFixed(2);
  }, [item.taxes, item.unityPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item._id) {
      dispatch(updateItemRequest(item));
      return;
    }
    dispatch(createItemRequest(item));
  };
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(itemReset());
    resetItemState();
  };
  useEffect(() => {
    if (success && isLoggedIn) {
      dispatch(itemReset());
    }
  }, [isLoggedIn, success, dispatch, item]);

  useEffect(() => {
    if (!isLoggedIn) return;
    return () => {
      dispatch(itemReset());
    };
  }, [isLoggedIn, dispatch]);
  return (
    <form className="container-settings" onSubmit={handleSubmit}>
      <Form.ContainerInput>
        <Form.Label htmlFor="code" text="Código/ID" />
        <Form.Input
          type="text"
          placeholder="Código do produto"
          name="code"
          value={item.code}
          onChange={(e) => updateItem("code", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label htmlFor="name" text="Nome do Item/Produto" />
        <Form.Input
          type="text"
          placeholder="Ex.: Caneta"
          name="name"
          value={item.name}
          onChange={(e) => updateItem("name", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label htmlFor="category" text="Categoria" />
        <Form.Input
          type="text"
          placeholder="Ex.: Escritório"
          name="category"
          value={item.category}
          onChange={(e) => updateItem("category", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="xx-large">
        <Form.Label htmlFor="unity" text="Unidade" />
        <select
          name="unity"
          value={item.unity}
          onChange={(e) => updateItem("unity", e.target.value)}
        >
          {units.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </Form.ContainerInput>
      <Form.ContainerInput size="small">
        <Form.Label htmlFor="unityPrice" text="Preço Unit. *" />
        <Form.Input
          type="number"
          name="unityPrice"
          min="0"
          step="0.01"
          value={item.unityPrice}
          onChange={(e) => updateItem("unityPrice", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="medium">
        <Form.Label htmlFor="itemTaxes" text="Impostos sob produto (%)" />
        <Form.Input
          type="number"
          name="itemTaxes"
          min="0"
          value={item.taxes}
          onChange={(e) => updateItem("taxes", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="xx-large">
        <Form.Label htmlFor="obsItem" text="Obs. do item" />
        <Form.Input
          type="text"
          placeholder="Ex.: Usado somente para limpeza"
          name="obsItem"
          value={item.obsItem}
          onChange={(e) => updateItem("obsItem", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="medium">
        <Form.Label text="Total" />
        <Form.LockedLabel text={`R$ ${total}`} />
      </Form.ContainerInput>

      {item.taxes > 0 && (
        <Form.ContainerInput size="medium">
          <div className="taxes-card-item">{`Impostos (${item.taxes}%)`}</div>
        </Form.ContainerInput>
      )}

      <div
        className="
        flex
        justify-end
        w-full
      "
      >
        <div
          className="
          w-[50%]
          max-sm:w-full
          flex
          flex-wrap
          gap-5
      "
        >
          <Button.Cancel onClick={resetItemState}>
            <X />
            Limpar
          </Button.Cancel>

          <Button.Primary>
            <SaveIcon />
            {item?._id
              ? !isLoading
                ? "Atualizar"
                : "Atualizando..."
              : !isLoading
                ? "Cadastrar"
                : "Cadastrando..."}
          </Button.Primary>
        </div>
      </div>
    </form>
  );
}
