import { Save, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";
import { useBudget } from "../../context/Budget";
import {
  budgetReset,
  createBudgetRequest,
  updateBudgetRequest,
} from "../../store/modules/budget/actions";
import { Button } from "../Button";
import { Form } from "../Form";
import { Subtitle, Title } from "../Header/styles";

export default function NewBudget() {
  const dispatch = useDispatch();
  const { budget, setBudget, initialState, budgetOpen, setBudgetOpen } =
    useBudget();
  const [active, setActive] = useState("Básico");
  const options = ["Básico", "Cliente", "Itens", "Condições"];
  const tabs = [
    { key: "Básico", component: <Form.Content.Basic /> },
    { key: "Cliente", component: <Form.Content.Client /> },
    { key: "Itens", component: <Form.Content.Items /> },
    { key: "Condições", component: <Form.Content.Conditions /> },
  ];

  const handleButtonActive = (option) => {
    setActive(option);
  };
  const handleCancel = () => {
    dispatch(budgetReset());
    setBudgetOpen(false);
    setBudget(initialState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = [];

    if (!budget.client || !Object.keys(budget.client).length > 0)
      formErrors.push({
        field: "CLIENTE",
        message: "Nenhum cliente selecionado!",
      });

    if (!budget.items || !budget.items.length > 0)
      formErrors.push({
        field: "ITENS",
        message: "Nenhum item selecionado!",
      });

    if (!budget.basic.date || !Date(budget.basic.date))
      formErrors.push({
        field: "DATA",
        message: "Data ou formato da data invalido",
      });

    if (budget.basic.validUntil && !Date(budget.basic.validUntil))
      formErrors.push({
        field: "VALIDO ATÉ",
        message: "Data ou formato da data invalido",
      });

    if (!budget.basic.title || budget.basic.title === "")
      formErrors.push({
        field: "NOME",
        message: "Nome é um campo obrigatório",
      });

    if (budget.basic.time && !validator.isTime(budget.basic.time))
      formErrors.push({
        field: "HORÁRIO",
        message: "Horario ou formato do horario invalido",
      });

    if (budget.totals.amountPaid && budget.totals.amountPaid < 0)
      formErrors.push({
        field: "VALOR PAGO",
        message: "Não pode ser menor que 0",
      });

    if (formErrors.length > 0) {
      formErrors.forEach((value) =>
        toast.error(
          <div>
            <strong>{value.field}: </strong>
            {value.message}{" "}
          </div>,
          { autoClose: 5000, hideProgressBar: true },
        ),
      );
      return;
    }

    try {
      if (budget._id) {
        dispatch(updateBudgetRequest(budget));
      } else {
        dispatch(createBudgetRequest(budget));
      }
      if (budgetOpen) {
        setBudgetOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (!budgetOpen) return;
  return (
    <div
      className="
        w-full
        h-full
        fixed
        flex
        bg-black/30
        backdrop-blur-sm
        inset-0
        z-10
        overflow-auto
        "
      onMouseDown={handleCancel}
    >
      <div
        className="
        max-h-[95%]
        sm:w-[80%]
        m-auto
        gap-5
        flex
        flex-col
        rounded-4xl
        overflow-auto
        bg-button-dark
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="
          sm:pt-15
          sm:px-15
          px-10
          pt-10
          pb-5
          sm:sticky
          sm:top-0
          sm:z-15
          flex
          flex-col
          gap-5
          bg-button-dark/90
          backdrop-blur-2xl
          "
        >
          <div className="flex flex-col">
            <Title>Novo Orçamento</Title>
            <Subtitle>Preencha as informações do orçamento</Subtitle>
          </div>

          <div className="nav-budget">
            {options.map((item) => (
              <Button.Nav
                key={item}
                onClick={() => handleButtonActive(item)}
                active={active}
                item={item}
                type="button"
              >
                {item}
              </Button.Nav>
            ))}
          </div>
        </div>

        <div
          className="
          w-full
          m-auto
          sm:px-10
          px-5
        "
        >
          <Form.Root>
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`tab-budget-content ${active === tab.key ? "content-budget-active" : ""}`}
              >
                {tab.component}
              </div>
            ))}
          </Form.Root>
        </div>

        <div
          className="
          px-10
          py-10
          z-15
          mt-10
          sticky
          bottom-0
          flex
          flex-wrap
          gap-y-3
          gap-x-50
          bg-button-dark/90
          backdrop-blur-2xl
        "
        >
          <Button.Cancel onClick={handleCancel}>
            <X /> Cancelar
          </Button.Cancel>
          <Button.Primary onClick={handleSubmit} type="submit">
            <Save />
            {budget._id ? "Atualizar Orçamento" : "Criar Orçamento"}
          </Button.Primary>
        </div>
      </div>
    </div>
  );
}
