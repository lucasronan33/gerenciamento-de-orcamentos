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
import { budgetStatus } from "@/utils/budget";
import dayjs from "dayjs";
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

        {layoutSelected === "row" ? (
          <LayoutRow data={{ budgets, filteredBudgets }} />
        ) : (
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

const LayoutRow = ({ data }) => {
  const rowData = (obj = {}) => [
    {
      header: "Cód.",
      data: obj.basic.code,
      align: "text-start",
    },
    {
      header: "Orc.",
      data: obj.basic.title,
      align: "text-start",
    },
    {
      header: "Cliente",
      data: obj.client.name,
      align: "text-start",
    },
    {
      header: "Itens",
      data: obj.items.length,
    },
    {
      header: "Valor",
      data: obj.totals.total,
      align: "text-end",
    },
    {
      header: "Status",
      data: budgetStatus.map((item) =>
        item.value === obj.basic.status ? item.text : false,
      ),
    },
    {
      header: "Data",
      data: dayjs(obj.basic.date).format("DD/MM/YYYY"),
    },
    {
      header: "Validade",
      data: dayjs(obj.basic.validUntil).format("DD/MM/YYYY"),
    },
  ];
  return (
    <div
      className="
          w-full
          h-[40vh]
          gap-3
          mx-auto
          flex
          flex-col
          items-start
          bg-secondary/50
          border
          border-border-dark
          rounded-xl
          overflow-auto
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
        <table className="w-full border-separate border-spacing-0">
          <tr>
            {rowData(data.filteredBudgets[0]).map((row, i) => (
              <th
                key={row.header + i}
                className="
                px-5
                py-1
                not-first:border-l
                border-l-border-dark
                bg-secondary-dark
                sticky
                top-0
                z-20
                "
              >
                {row.header}
              </th>
            ))}
          </tr>
          {data.filteredBudgets.map((budget) => {
            const date = (value) => {
              return dayjs(value).format("DD/MM/YYYY");
            };
            return (
              <tr
                key={budget._id}
                className="
              h-10
              hover:bg-blueHover
              "
              >
                {rowData(budget).map((line, index) => (
                  <td
                    key={line.header + line.data + index}
                    className={`
                    ${line.align ? line.align : ""}
                    px-5
                    not-first:border-l
                    border-t
                    border-border-dark
                    `}
                  >
                    {line.data}
                  </td>
                ))}
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};
