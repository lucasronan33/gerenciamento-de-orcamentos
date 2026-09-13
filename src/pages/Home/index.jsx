import "./style.css";

import { FileText, Grid3x2, Plus, Rows3, Users } from "lucide-react";
import BudgetStatusFilter from "../../components/BudgetStatusFilter";
import { Button } from "../../components/Button";
import CardBudget from "../../components/Cards/CardBudget";
import DashboardsHeader from "../../components/DashboardsHeader";
import { Card } from "../../components/DashboardsHeader/styles";
import Header from "../../components/Header";
import { useBudget } from "../../context/Budget";
// import TableContent from '../../components/TableContent';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const layout = [
  {
    name: "grid",
    icon: Grid3x2,
  },
  {
    name: "row",
    icon: Rows3,
  },
];

export default function Home() {
  const { budgets, setBudgetOpen, filteredBudgets } = useBudget();
  const navigate = useNavigate();

  const [layoutSelected, setLayoutSelected] = useState("grid");

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
      {/* <TableContent /> */}
      <div
        className="
          max-w-[90%]
          m-auto
          flex
          flex-col
          p-7.5
          gap-5
          text-center
          rounded-2xl
          border
          border-border-dark
          bg-secondary-dark
        "
      >
        <BudgetStatusFilter />

        <div
          className="
          flex
          h-fit
          gap-3
          "
        >
          {layout.map((l, i) => {
            const Link = l.icon;
            if (layoutSelected === l.name)
              return (
                <div
                  key={i}
                  onClick={() => setLayoutSelected(l.name)}
                  className="
                  p-3
                  rounded-md
                  border
                  text-purpleHover
                  border-blueHover
                  bg-blueHover
                  inset-shadow-sm
                  inset-shadow-secondary
                  cursor-pointer
                "
                >
                  <Link
                    className="
                    drop-shadow-sm
                    drop-shadow-purpleHover
                    "
                  />
                </div>
              );
            return (
              <div
                key={i}
                onClick={() => setLayoutSelected(l.name)}
                className="
                p-3
                rounded-md
                bg-secondary
                border
                border-border-dark
                text-gray-500
                hover:text-blueDocument
                hover:border-blueHover
                hover:bg-blueHover
                hover:inset-shadow-sm
                hover:inset-shadow-secondary
                group
                duration-300
                cursor-pointer
              "
              >
                <Link
                  className="
                    group-hover:drop-shadow-sm
                    group-hover:drop-shadow-blueDocument
                    "
                />
              </div>
            );
          })}
        </div>

        {layoutSelected === "grid" && (
          <LayoutGrid data={{ budgets, filteredBudgets }} />
        )}
      </div>

      <Button.FixedMenu children={iconsMenu} />
    </div>
  );
}

const LayoutGrid = ({ data }) => (
  <div
    className="
          w-full
          gap-3
          mx-auto
          grid
          items-start
          sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
          "
  >
    {data.budgets.length < 1 ? (
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
    ) : data.filteredBudgets.length < 1 ? (
      <Card className="cardHomeNewBudget">
        <FileText className="iconFile" />
        <h3>Nenhum orçamento encontrado</h3>
        <p>Tente ajustar os filtros de busca</p>
      </Card>
    ) : (
      data.filteredBudgets.map((budget) => (
        <CardBudget key={budget._id} budget={budget} />
      ))
    )}
  </div>
);
