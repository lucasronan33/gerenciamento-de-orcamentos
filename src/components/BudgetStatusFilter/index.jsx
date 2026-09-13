import { Checkbox } from "@mui/material";
import { Search } from "lucide-react";
import { useBudget } from "../../context/Budget";
import { budgetStatus } from "../../utils/budget";
import { Form } from "../Form";

const status = [...budgetStatus];
status.push({
  value: "all states",
  text: "Todos os status",
});

export default function BudgetStatusFilter() {
  const {
    inputFilterBudgets,
    filterBudgets,
    filterSelected,
    searchBudget,
    paymentPending,
    setPaymentPending,
  } = useBudget();

  return (
    <div
      className="
      grid
      sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
      gap-3
    "
    >
      <div
        className="
        grow
        flex
      "
      >
        <div
          className="
          w-full
          h-[5vh]
          relative
          items-center
          rounded-xl
          flex
          bg-primary-dark
        "
        >
          <Search
            className="
            w-auto
            px-3
            z-3
            absolute
            right-0
            text-secondaryText-dark
            pointer-events-none
            "
          />
          <input
            type="text"
            placeholder="Buscar por número, cliente ou e-mail"
            value={searchBudget}
            onChange={(e) => {
              inputFilterBudgets(e.target.value);
            }}
          />
        </div>
      </div>

      <div
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          relative
        "
      >
        <div
          className="
            w-full
            h-[5vh]
            flex
            items-center
            bg-primary-dark
            rounded-xl
            relative
          "
        >
          <select
            value={filterSelected}
            onChange={(e) => {
              filterBudgets(e.target.value);
            }}
          >
            {status.map((value) => (
              <option key={value.value} value={value.value}>
                {value.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Form.ContainerInput>
        <div
          onClick={() => setPaymentPending(!paymentPending)}
          className="
            flex
            flex-1
            justify-center
            bg-primary-dark
            rounded-md
            self-stretch
            outline
            outline-border-dark
            items-center
            cursor-pointer
            "
        >
          <Checkbox
            id="paymentCheck"
            name="paymentCheck"
            checked={paymentPending}
            onChange={() => setPaymentPending(!paymentPending)}
            className="w-fit"
            sx={{
              color: "var(--color-secondaryText-dark)",
              "&.Mui-checked": {
                color: "var(--color-warning)",
              },
            }}
          />
          <label
            htmlFor="paymentCheck"
            onClick={(e) => e.stopPropagation()}
            className="
              h-[5vh]
              flex
              items-center
              text-sm
              font-bold
              cursor-pointer
              "
          >
            Pagamento pendente
          </label>
        </div>
      </Form.ContainerInput>
    </div>
  );
}
