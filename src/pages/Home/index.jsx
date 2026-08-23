import "./style.css";

import { FileText, Plus, Users } from "lucide-react";
import BudgetStatusFilter from "../../components/BudgetStatusFilter";
import { Button } from "../../components/Button";
import CardBudget from "../../components/Cards/CardBudget";
import DashboardsHeader from "../../components/DashboardsHeader";
import { Card } from "../../components/DashboardsHeader/styles";
import Header from "../../components/Header";
import { useBudget } from "../../context/Budget";
// import TableContent from '../../components/TableContent';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { budgets, setBudgetOpen, filteredBudgets } = useBudget();
  const navigate = useNavigate();

  const iconsMenu = [
    {
      title: "Novo orçamento",
      icon: FileText,
      action: () => setBudgetOpen(true),
    },
    {
      title: "Novo cliente",
      icon: Users,
      action: () => navigate("/clients"),
    },
  ];

  return (
    <div>
      <Header />
      <DashboardsHeader />
      <BudgetStatusFilter />
      {/* <TableContent /> */}
      <div
        className="
          max-w-[90%]
          my-7.5
          mx-auto
          grid
          items-start
          grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
          gap-5
          text-center
        "
      >
        {budgets.length < 1 ? (
          <Card className="cardHomeNewBudget">
            <FileText className="iconFile" />
            <h3>Nenhum orçamento criado</h3>
            <p>Clique no botão "Novo Orçamento" para começar</p>
            <Button.Root
              className="button-header"
              onClick={() => setBudgetOpen(true)}
            >
              <Plus />
              Novo Orçamento
            </Button.Root>
          </Card>
        ) : filteredBudgets.length < 1 ? (
          <Card className="cardHomeNewBudget">
            <FileText className="iconFile" />
            <h3>Nenhum orçamento encontrado</h3>
            <p>Tente ajustar os filtros de busca</p>
          </Card>
        ) : (
          filteredBudgets.map((budget) => (
            <CardBudget key={budget._id} budget={budget} />
          ))
        )}
      </div>

      <Button.FixedMenu children={iconsMenu} />
    </div>
  );
}
