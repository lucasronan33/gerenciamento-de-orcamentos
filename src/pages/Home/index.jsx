import "./style.css";

import {
  ChevronDown,
  Copy,
  EllipsisVertical,
  FileText,
  Grid3x2,
  Pen,
  Plus,
  Printer,
  Rows3,
  Trash2,
  Users,
} from "lucide-react";
import BudgetStatusFilter from "../../components/BudgetStatusFilter";
import { Button } from "../../components/Button";
import CardBudget, { statusClasses } from "../../components/Cards/CardBudget";
import DashboardsHeader from "../../components/DashboardsHeader";
import { Card } from "../../components/DashboardsHeader/styles";
import Header from "../../components/Header";
import { useBudget } from "../../context/Budget";
// import TableContent from '../../components/TableContent';
import { ConfirmDeleteModal } from "@/components/Cards/styled";
import { Form } from "@/components/Form";
import { ViewBudget } from "@/components/ViewBudget";
import {
  createBudgetRequest,
  deleteBudgetRequest,
} from "@/store/modules/budget/actions";
import { budgetStatus } from "@/utils/budget";
import {
  formatCurrency,
  generateBudgetCode,
  isEmptyObject,
} from "@/utils/masks";
import { Checkbox } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
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
                  key={i + crypto.randomUUID()}
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
        <CardBudget key={budget._id + crypto.randomUUID()} budget={budget} />
      ))
    )}
  </div>
);

const LayoutRow = ({ data }) => {
  const { setBudgetOpen, setBudget, setViewBudget, viewBudget } = useBudget();

  const [budgetsSelected, setBudgetsSelected] = useState([]);
  const [budgetMenuOpen, setBudgetMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

  const rowData = (budget = {}) => [
    {
      header: "Cód.",
      data: budget.basic.code,
      align: "text-start",
    },
    {
      header: "Cliente",
      data: budget.client.name,
      align: "text-start ",
    },
    {
      header: "Orc.",
      data: budget.basic.title,
      align: "text-start",
    },
    {
      header: "Itens",
      data: budget.items.length,
      align: "text-end",
    },
    {
      header: "Valor",
      data: formatCurrency(budget.totals.total),
      align: "text-end",
    },
    {
      header: "Status",
      data:
        budgetStatus.find((item) => item.value === budget.basic.status)?.text ??
        "",
    },
    {
      header: "Data",
      data: dayjs(budget.basic.date).format("DD/MM/YYYY"),
      align: "text-end",
    },
    {
      header: "Validade",
      data: dayjs(budget.basic.validUntil).format("DD/MM/YYYY"),
      align: "text-end",
    },
  ];

  const budgetMenu = () => [
    {
      icon: Pen,
      text: "Editar",
      action: (budget) => {
        setBudgetOpen(budget);
        setBudget(budget);
        setBudgetMenuOpen(false);
      },
    },
    {
      icon: Copy,
      text: "Duplicar",
      action: (budget) => {
        const copy = { ...budget };
        copy.basic.code = generateBudgetCode();

        dispatch(createBudgetRequest(copy));
        setBudgetMenuOpen(false);
      },
    },
    {
      icon: Printer,
      text: "Imprimir",
      action: (budget) => {
        setViewBudget(budget);
        setBudget(budget);
        setBudgetMenuOpen(false);
      },
    },
    {
      icon: Trash2,
      text: "Deletar",
      action: () => {
        setIsDeleteModalOpen(true);
      },
    },
  ];

  const handleDelete = async (budget) => {
    if (!budget) {
      setIsDeleteModalOpen(false);
      setBudgetMenuOpen(false);
      return;
    }
    try {
      setIsDeleting(true);
      dispatch(deleteBudgetRequest(budget));
      setIsDeleteModalOpen(false);
      setBudgetMenuOpen(false);
    } catch {
      setIsDeleteModalOpen(false);
      setBudgetMenuOpen(false);
    } finally {
      setIsDeleting(false);
      setBudgetMenuOpen(false);
    }
  };

  const firtsBudget = data.filteredBudgets[0];

  return (
    <div
      className="
      w-full
      flex
      flex-col
      gap-3
      "
    >
      {budgetsSelected.length > 0 && (
        <table
          className="
          p-3
          gap-1
          bg-secondary
          border
          border-border-dark
          rounded-md
          border-separate
          border-spacing-1
          "
        >
          <thead>
            <tr>
              <td
                className="
              font-bold
              text-sm
              text-start
              "
              >
                Valor:
              </td>
              <td
                className="
              font-bold
              text-sm
              text-start
              "
              >
                Data:
              </td>
              <td
                className="
              font-bold
              text-sm
              text-start
              "
              >
                Validade:
              </td>
              <td
                className="
              font-bold
              text-sm
              text-start
              "
              >
                Status:
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input type="number" min={0.1} placeholder="R$" />
              </td>
              <td>
                <Form.ContainerInput>
                  <DatePicker
                    className="datePicker"
                    format="DD/MM/YYYY"
                    defaultValue={null}
                  />
                </Form.ContainerInput>
              </td>
              <td>
                <Form.ContainerInput>
                  <DatePicker
                    className="datePicker"
                    format="DD/MM/YYYY"
                    defaultValue={null}
                  />
                </Form.ContainerInput>
              </td>
              <td>
                {rowData(firtsBudget).map((line, index) => {
                  if (budgetStatus.map((obj) => obj.text).includes(line.data)) {
                    const currentBudgetStatus = budgetStatus.reduce(
                      (obj, item) => {
                        if (item.value === firtsBudget.basic.status)
                          obj = item.text;
                        return obj;
                      },
                      {},
                    );

                    return (
                      <div
                        key={crypto.randomUUID()}
                        className="
                        w-full
                        h-full
                        px-3
                        py-3
                        flex
                        items-center
                        justify-between
                        border
                        border-border-dark
                        rounded-md
                        duration-300
                        hover:bg-blueHover
                        cursor-pointer
                      "
                      >
                        <div
                          className={
                            !isEmptyObject(currentBudgetStatus)
                              ? `
                    w-fit
                    flex
                    items-center
                    justify-center
                    px-5
                    py-1.25
                    gap-2
                    text-xs
                    text-center
                    border
                    rounded-[10px]
                ${statusClasses[currentBudgetStatus.toLowerCase()]}
                  `
                              : ""
                          }
                        >
                          {!isEmptyObject(currentBudgetStatus)
                            ? currentBudgetStatus
                            : ""}
                        </div>

                        <ChevronDown />
                      </div>
                    );
                  }
                })}
              </td>
              <td>
                <div
                  className="
                  w-fit
                  h-full
                  p-2
                  flex
                  items-center
                  rounded-md

                  text-gray-500
                  hover:text-blueDocument
                  border-2
                  border-secondary-dark
                  bg-secondary-dark
                  inset-shadow-sm
                  inset-shadow-primary-dark
                  hover:border-blueHover
                  hover:bg-blueHover
                  hover:inset-shadow-sm
                  hover:inset-shadow-secondary
                  cursor-pointer
                  "
                >
                  <Copy />
                </div>
              </td>
              <td>
                <div
                  className="
                  w-fit
                  h-full
                  p-2
                  flex
                  items-center
                  rounded-md

                  border-2
                  text-rejected
                  hover:text-white
                  border-rejected
                  bg-rejected
                  inset-shadow-sm
                  inset-shadow-black/20
                  hover:border-rejected-dark
                  hover:bg-rejected-dark
                  hover:inset-shadow-sm
                  hover:inset-shadow-secondary
                  cursor-pointer
                  "
                >
                  <Trash2 />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div
        className="
          w-full
          min-h-[40vh]
          h-[40vh]
          max-h-fit
          resize-y
          gap-3
          mx-auto
          flex
          flex-col
          items-start
          border
          border-border-dark
          rounded-xl
          overflow-auto

          scrollbar-thumb-purpleHover
          "
      >
        {viewBudget && <ViewBudget />}
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
          <table
            key={crypto.randomUUID()}
            className="
          w-full
          border-separate
          border-spacing-0
          max-sm:text-xs
          "
          >
            <thead
              className="
                sticky
                inset-0
                z-1
                bg-secondary-dark
              "
            >
              <tr>
                <th
                  className="
                sticky
                inset-0
                z-3
                bg-secondary-dark
                duration-300
                hover:bg-primary-dark
                cursor-pointer
                group
                "
                >
                  <Checkbox
                    checked={
                      budgetsSelected.length > 0 &&
                      budgetsSelected.length === data.filteredBudgets.length
                        ? true
                        : false
                    }
                    onChange={() =>
                      setBudgetsSelected(
                        budgetsSelected.length < data.filteredBudgets.length
                          ? [...data.filteredBudgets]
                          : [],
                      )
                    }
                    sx={{
                      color: "var(--color-secondaryText-dark)",
                    }}
                    className={`
                  group-hover:opacity-100  
                  group-focus:opacity-100  
                  ${budgetsSelected.length > 0 ? "opacity-100" : "opacity-0"}
                  `}
                  />
                </th>
                {rowData(data.filteredBudgets[0]).map((row, i) => (
                  <th
                    key={row.header + i + crypto.randomUUID()}
                    className={`
                  ${row.align}
                  px-5
                  py-2
                  max-sm:py-3
                  bg-secondary-dark
                  sticky
                  top-0
                  z-3
                  duration-300
                  hover:bg-primary-dark
                  cursor-pointer`}
                  >
                    {row.header}
                  </th>
                ))}
                <th
                  className="
                sticky
                inset-0
                z-3
                "
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.filteredBudgets.map((budget) => (
                <tr
                  key={budget._id + crypto.randomUUID()}
                  className="
                h-10
                group
                relative
                duration-300
                bg-secondary
                hover:bg-blueHover
                focus:bg-blueHover
                "
                >
                  <td
                    className="
                  duration-300
                  bg-secondary
                  group-hover:bg-blueHover
                  group-focus:bg-blueHover
                  border-t
                  border-border-dark
                  "
                  >
                    <Checkbox
                      checked={
                        budgetsSelected.find((val) => val._id === budget._id)
                          ? true
                          : false
                      }
                      onChange={() =>
                        setBudgetsSelected(
                          budgetsSelected.find((val) => val._id === budget._id)
                            ? [
                                ...budgetsSelected.filter(
                                  (val) => val._id !== budget._id,
                                ),
                              ]
                            : [...budgetsSelected, budget],
                        )
                      }
                      sx={{
                        color: "var(--color-secondaryText-dark)",
                      }}
                      className={`
                      duration-300
                    group-hover:opacity-100  
                    group-focus:opacity-100  
                    ${budgetsSelected.length > 0 ? "opacity-100" : "opacity-0"}
                  `}
                    />
                  </td>
                  {rowData(budget).map((line, index) => {
                    if (
                      budgetStatus.map((obj) => obj.text).includes(line.data)
                    ) {
                      const currentBudgetStatus = budgetStatus.reduce(
                        (obj, item) => {
                          if (item.value === budget.basic.status)
                            obj = item.text;
                          return obj;
                        },
                        {},
                      );

                      return (
                        <td
                          key={
                            line.header +
                            line.data +
                            index +
                            crypto.randomUUID()
                          }
                          className={`
                          ${line.align ? line.align : ""}
                          duration-300
                          bg-secondary
                          group-focus:bg-blueHover
                          group-hover:bg-blueHover
                          px-5
                          border-t
                          border-border-dark
                    `}
                        >
                          <div
                            className={
                              !isEmptyObject(currentBudgetStatus)
                                ? `
                              flex
                              items-center
                              justify-center
                              px-5
                              py-1.25
                              gap-2
                              text-xs
                              text-center
                              border
                              rounded-[10px]
                ${statusClasses[currentBudgetStatus.toLowerCase()]}
                  `
                                : ""
                            }
                          >
                            {!isEmptyObject(currentBudgetStatus)
                              ? currentBudgetStatus
                              : ""}
                            {["approved", "producing", "finished"].includes(
                              budget.basic.status,
                            ) &&
                              (!budget.totals.amountPaid ||
                                budget.totals.amountPaid <
                                  budget.totals.total) && (
                                <div
                                  className="
                                w-2
                                aspect-square
                                bg-producing-dark
                                rounded-full
                                "
                                />
                              )}
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={line.header + line.data + index}
                        className={`
                    ${line.align ? line.align : ""}
                    duration-300
                    bg-secondary
                    group-hover:bg-blueHover
                    group-focus:bg-blueHover
                    px-5
                    border-t
                    border-border-dark
                    `}
                      >
                        <span
                          className="
                      line-clamp-1
                      "
                        >
                          {line.data}
                        </span>
                      </td>
                    );
                  })}
                  <td
                    className="
                  relative
                  border-t
                  border-border-dark
                  "
                  >
                    <EllipsisVertical
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();

                        setBudgetsSelected([]);
                        setBudgetMenuOpen({ ...budget });
                        setMenuPosition(rect);
                      }}
                      className="
                    text-secondaryText-dark
                    opacity-0
                    group-hover:opacity-100
                    cursor-pointer
                    "
                    />
                    {budgetMenuOpen?.basic?.code === budget.basic.code &&
                      createPortal(
                        <div
                          onClick={() => setBudgetMenuOpen(false)}
                          className="
                        w-full
                        h-full
                        fixed
                        inset-0
                        z-1
                        bg-black/20
                        backdrop-blur-[2px]
                        "
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            style={{
                              top: menuPosition.bottom,
                              right: window.innerWidth - menuPosition.left,
                            }}
                            className="
                          w-fit
                      absolute
                      py-3
                      right-[50%]
                      z-2
                      flex
                      flex-col
                      text-xs
                      rounded-xl
                      rounded-tr-none
                      bg-purpleHover
                      shadow-xl
                      shadow-blueHover
                      "
                          >
                            {budgetMenu(budget).map((menu, menuIndex) => {
                              const Icon = menu.icon;
                              return (
                                <div
                                  key={menuIndex + crypto.randomUUID()}
                                  onClick={() => menu.action(budget)}
                                  className={`
                        px-5
                        py-2
                        gap-3
                        flex
                        items-center
                        cursor-pointer
                        duration-300
                        ${
                          menu.text === "Deletar"
                            ? "hover:bg-rejected-dark"
                            : "hover:bg-blueHover"
                        }
                        ${
                          menu.text === "Deletar"
                            ? "hover:text-red-900"
                            : "hover:text-primary"
                        }
                        
                        not-first:border-t
                        border-border-dark
                        `}
                                >
                                  <Icon size={"0.9rem"} />
                                  {menu.text}
                                </div>
                              );
                            })}
                          </div>
                        </div>,
                        document.body,
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isDeleteModalOpen && budgetMenuOpen && (
          <ConfirmDeleteModal>
            <button
              type="button"
              className="confirm-delete-overlay"
              aria-label="Fechar confirmacao"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <div className="confirm-delete-content">
              <h2>Excluir orçamento?</h2>
              <p>
                Esta acao vai remover o orçamento
                <strong> {budgetMenuOpen.basic.title} </strong>
                do historico.
              </p>
              <div className="confirm-delete-actions">
                <Button.Cancel
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                >
                  Cancelar
                </Button.Cancel>
                <Button.Primary
                  onClick={() => handleDelete(budgetMenuOpen)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </Button.Primary>
              </div>
            </div>
          </ConfirmDeleteModal>
        )}
      </div>
    </div>
  );
};

const DeleteModal = (budget, isDeleteModalOpen) => {
  if (!isDeleteModalOpen) return;
  return;
};
