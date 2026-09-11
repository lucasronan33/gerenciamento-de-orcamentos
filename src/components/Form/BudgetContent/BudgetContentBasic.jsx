import { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Plus, Trash2Icon } from "lucide-react";
import { Form } from "..";
import { useBudget } from "../../../context/Budget";
import { budgetStatus } from "../../../utils/budget";
import { generateBudgetCode } from "../../../utils/masks";

export function BudgetContentBasic() {
  const { budget, setBudget, updateBudget } = useBudget();

  const [paymentCompleted, setPaymentCompleted] = useState(
    budget.totals.amountPaid.length > 0 ? true : false,
  );

  useEffect(() => {
    if (!budget.basic.code) {
      const code = generateBudgetCode();
      updateBudget("basic", "code", code);
    }
  }, [updateBudget, budget.basic.code]);

  return (
    <>
      <Form.ContainerInput>
        <Form.Label
          text="Numero do Orçamento"
          htmlFor="budgetNumber"
          required
        />
        <Form.LockedLabel
          placeholder="Numero do Orçamento"
          id="budgetNumber"
          name="budgetNumber"
          text={budget.basic?.code || ""}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label
          text="Título do orçamento"
          htmlFor={"titleBudget"}
          required
        />
        <Form.Input
          type="text"
          placeholder="ex.: Nome do serviço"
          id="titleBudget"
          name="titleBudget"
          value={budget.basic.title || ""}
          onChange={(e) => updateBudget("basic", "title", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label
          text="Status do Orçamento"
          htmlFor="budgetStatus"
          required
        />

        <select
          value={budget.basic.status}
          id="budgetStatus"
          name="budgetStatus"
          onChange={(e) => {
            updateBudget("basic", "status", e.target.value);
            if (e.target.value === "finished" && !budget.totals.amountPaid) {
              setPaymentCompleted(true);
              updateBudget("totals", "amountPaid", budget.totals.total);
            }
          }}
        >
          {budgetStatus.map((value, index) => (
            <option
              key={value.value + Math.floor(Math.random() * 99)}
              value={value.value}
            >
              {value.text}
            </option>
          ))}
        </select>
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text="Data" htmlFor="date" required />
        <DatePicker
          className="datePicker"
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              id: "date",
            },
          }}
          name="date"
          defaultValue={null}
          value={dayjs(budget.basic.date)}
          onChange={(date) => {
            if (!date) return;
            updateBudget("basic", "date", new Date(date));
          }}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text="Valido até" htmlFor="validUntil" />
        <DatePicker
          className="datePicker"
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              id: "validUntil",
            },
          }}
          name="validUntil"
          defaultValue={null}
          value={dayjs(budget.basic.validUntil)}
          onChange={(date) => {
            if (!date) return;
            updateBudget("basic", "validUntil", new Date(date));
          }}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <div className="flex items-center">
          <Checkbox
            name="payment-completed"
            id="payment-completed"
            className="w-fit"
            checked={budget.totals.amountPaid.length > 0 || paymentCompleted}
            onChange={() => {
              if (paymentCompleted === true) {
                const newBudget = { ...budget };
                newBudget.totals.amountPaid = [];
                setBudget(newBudget);
              } else {
                updateBudget("totals", "amountPaid", [
                  {
                    value: budget.totals.total,
                    date: new Date(),
                  },
                ]);
              }
              setPaymentCompleted(!paymentCompleted);
            }}
          />
          <Form.Label
            htmlFor={"payment-completed"}
            text={"Pagamento Efetivado"}
          />
        </div>
        <div
          className="
          w-fit
          flex
          justify-start
          flex-col
          gap-5"
        >
          {paymentCompleted && (
            <>
              {budget.totals.amountPaid.map((payment, i) => (
                <div
                  className="
                  flex
                  max-sm:flex-col
                  gap-3
                "
                >
                  <Form.ContainerInput>
                    <Form.Label htmlFor={"value" + i} text={"Valor"} />
                    <Form.Input
                      name={"value" + i}
                      placeholder={"Valor pago"}
                      value={payment.value}
                      onChange={(e) => {
                        setBudget((prev) => {
                          const nextAmountPaid = [...prev.totals.amountPaid];
                          nextAmountPaid[i] = {
                            ...nextAmountPaid[i],
                            value: e.target.value,
                          };

                          return {
                            ...prev,
                            totals: {
                              ...prev.totals,
                              amountPaid: nextAmountPaid,
                            },
                          };
                        });
                      }}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </Form.ContainerInput>
                  <Form.ContainerInput>
                    <Form.Label text={"Data"} />
                    <DatePicker
                      className="datePicker"
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          id: "date",
                        },
                      }}
                      defaultValue={null}
                      value={dayjs(payment.date)}
                      onChange={(date) => {
                        if (!date) return;

                        setBudget((prev) => {
                          const nextAmountPaid = [...prev.totals.amountPaid];
                          nextAmountPaid[i] = {
                            ...nextAmountPaid[i],
                            date: new Date(date),
                          };

                          return {
                            ...prev,
                            totals: {
                              ...prev.totals,
                              amountPaid: nextAmountPaid,
                            },
                          };
                        });
                      }}
                    />
                  </Form.ContainerInput>

                  <div
                    onClick={() => {
                      if (budget.totals.amountPaid.length < 2) {
                        updateBudget("totals", "amountPaid", []);
                        setPaymentCompleted(!paymentCompleted);
                        return;
                      }
                      const newAmountPaid = [...budget.totals.amountPaid];

                      const filteredAmountPaid = newAmountPaid.filter(
                        (item, index) => index !== i,
                      );
                      updateBudget("totals", "amountPaid", filteredAmountPaid);
                    }}
                    className="
                    self-end
                    max-sm:w-full
                    sm:ml-3
                    sm:p-3
                    py-1
                    h-fit
                    flex
                    items-center
                    justify-center
                    rounded-md
                    text-rejected
                    cursor-pointer
                    duration-150
                    outline
                    outline-rejected
                    hover:inset-shadow-sm
                    hover:inset-shadow-black
                    hover:outline
                    hover:bg-rejected-dark
                    hover:outline-rejected-dark
                    hover:text-white
                    "
                  >
                    <Trash2Icon />
                  </div>
                </div>
              ))}
              <div
                className="
            w-1/4
            m-auto
            "
              >
                <div
                  onClick={() => {
                    const newAmountPaid = [...budget.totals.amountPaid];
                    newAmountPaid.push({ value: 0, date: new Date() });

                    updateBudget("totals", "amountPaid", newAmountPaid);
                  }}
                  className="
                  py-1
                  flex
                  justify-center
                  items-center
                  rounded-xl
                  border
                  border-border-dark
                  hover:bg-blueHover
                  hover:inset-shadow-sm
                  hover:inset-shadow-primary-dark
                  hover:border
                  hover:border-blueHover
                  hover:cursor-pointer
                "
                >
                  <Plus />
                </div>
              </div>
            </>
          )}
        </div>
      </Form.ContainerInput>
    </>
  );
}
