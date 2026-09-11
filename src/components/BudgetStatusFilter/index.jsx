import { Checkbox } from "@mui/material";
import { Search } from "lucide-react";
import { useBudget } from "../../context/Budget";
import { Container } from "../../styles/GlobalStyles";
import { budgetStatus } from "../../utils/budget";
import { Card } from "../DashboardsHeader/styles";
import { Form } from "../Form";
import { DivContainerFilter, InptSearch } from "./styles";

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
    <Container>
      <Card className="card-filter">
        <DivContainerFilter>
          <InptSearch>
            <Search className="search-icon" />
            <input
              type="text"
              className="input-search"
              placeholder="Buscar por número, cliente ou e-mail"
              value={searchBudget}
              onChange={(e) => {
                inputFilterBudgets(e.target.value);
              }}
            />
          </InptSearch>
        </DivContainerFilter>

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
              color="warning"
              className="w-fit"
            />
            <label
              htmlFor="paymentCheck"
              onClick={(e) => e.stopPropagation()}
              className="
              h-[5vh]
              text-sm
              font-bold
              cursor-pointer
              "
            >
              Pagamento pendente
            </label>
          </div>
        </Form.ContainerInput>
      </Card>
    </Container>
  );
}
