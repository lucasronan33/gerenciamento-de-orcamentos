import { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Form } from "..";
import { useBudget } from "../../../context/Budget";
import { budgetStatus } from "../../../utils/budget";
import { generateBudgetCode } from "../../../utils/masks";

export function BudgetContentBasic() {
  const { budget, updateBudget } = useBudget();

  const [paymentCompleted, setPaymentCompleted] = useState(
    budget.totals.amountPaid ? true : false,
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
        <Form.Label text="Numero do Orçamento *" htmlFor="budgetNumber" />
        <Form.LockedLabel
          placeholder="Numero do Orçamento"
          id="budgetNumber"
          name="budgetNumber"
          text={budget.basic?.code || ""}
        />
      </Form.ContainerInput>

      <Form.ContainerInput>
        <Form.Label text="Título do orçamento *" htmlFor={"titleBudget"} />
        <Form.Input
          type="text"
          placeholder="ex.: Nome do serviço"
          id="titleBudget"
          name="titleBudget"
          value={budget.basic.title || ""}
          onChange={(e) => updateBudget("basic", "title", e.target.value)}
        />
      </Form.ContainerInput>

      <Form.ContainerInput size="meidum">
        <Form.Label text="Status do Orçamento" htmlFor="budgetStatus" />

        <select
          value={budget.basic.status}
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
        <div className="flex items-center">
          <Checkbox
            name="payment-completed"
            id="payment-completed"
            className="w-fit"
            checked={budget.totals.amountPaid || paymentCompleted}
            onChange={() => {
              paymentCompleted === true
                ? updateBudget("totals", "amountPaid", 0)
                : updateBudget("totals", "amountPaid", budget.totals.total);
              setPaymentCompleted(!paymentCompleted);
            }}
          />
          <Form.Label
            htmlFor={"payment-completed"}
            text={"Pagamento Efetivado"}
          />
        </div>
        {paymentCompleted && (
          <Form.Input
            placeholder={"Valor pago"}
            value={budget.totals.amountPaid}
            onChange={(e) =>
              updateBudget("totals", "amountPaid", e.target.value)
            }
            type="number"
            min="0"
            step="0.01"
          />
        )}
      </Form.ContainerInput>

      <div
        className="
            w-full
            gap-[3vh]
            flex
            flex-wrap
            items-end
            "
      >
        <Form.ContainerInput>
          <Form.Label text="Data *" htmlFor="date" />
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
          <Form.Label htmlFor="time" text="Horário" />
          <TimePicker
            className="datePicker"
            defaultValue={null}
            slotProps={{
              textField: {
                id: "time",
              },
            }}
            name="time"
            value={dayjs(budget.basic.time, "HH:mm")}
            onChange={(date) => {
              if (!date) return;
              const formatedTime = date.format("HH:mm");
              updateBudget("basic", "time", formatedTime);
            }}
          />
        </Form.ContainerInput>
      </div>
    </>
  );
}
