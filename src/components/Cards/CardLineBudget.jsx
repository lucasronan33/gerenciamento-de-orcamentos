import dayjs from "dayjs";
import {
  BrushCleaning,
  ChevronDown,
  Copy,
  EllipsisVertical,
  FileText,
  Pen,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { statusClasses } from "../../components/Cards/CardBudget";
import { Card } from "../../components/DashboardsHeader/styles";
import { useBudget } from "../../context/Budget";
import {
  createBudgetRequest,
  deleteBudgetRequest,
} from "../../store/modules/budget/actions";
import { budgetStatus } from "../../utils/budget";
import {
  formatCurrency,
  generateBudgetCode,
  isEmptyObject,
} from "../../utils/masks";
import { Button } from "../Button";
import { ViewBudget } from "../ViewBudget";
import { ConfirmDeleteModal } from "./styled";
// import TableContent from '../../components/TableContent';
import { Form } from "@/components/Form";
import { Checkbox } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { createPortal } from "react-dom";

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
export const LayoutRow = ({ data }) => {
  const { setBudgetOpen, setBudget, setViewBudget, viewBudget } = useBudget();

  const [budgetsSelected, setBudgetsSelected] = useState([]);
  const [budgetMenuOpen, setBudgetMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

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

  const handleMultipleDelete = async (budget) => {
    if (!budget.length > 0) {
      setIsDeleteModalOpen(false);
      setBudgetMenuOpen(false);
      return;
    }
    try {
      setIsDeleting(true);
      budget.map((b) => dispatch(deleteBudgetRequest(b)));
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

  return (
    <div
      className="
      w-full
      flex
      flex-col
      gap-3
      "
    >
      {budgetsSelected.length > 0 &&
        createPortal(<Footer budgets={budgetsSelected} />, document.body)}
      {budgetsSelected.length > 0 && (
        <Filter
          budgets={budgetsSelected}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      <div
        className="
          w-full
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
                        <BudgetMenu
                          budget={budget}
                          actions={{
                            setViewBudget,
                            setBudget,
                            setBudgetMenuOpen,
                            setBudgetOpen,
                            setIsDeleteModalOpen,
                          }}
                          menuPosition={menuPosition}
                        />,
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

        {isDeleteModalOpen && budgetsSelected.length > 0 && (
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
                Esta ação irá{" "}
                <span
                  className="
                font-bold
                text-rejected-dark"
                >
                  remover
                </span>{" "}
                os orçamentos do seu histórico:
                <div
                  className="
                  max-h-[30vh]
                  overflow-auto
                  pt-2
                "
                >
                  {budgetsSelected.map((b, i) => (
                    <p
                      key={i}
                      className="
                      py-0.5
                    "
                    >
                      <span>{`${i + 1}: `}</span>
                      <span
                        className="
                        font-bold
                        "
                      >
                        {b.basic.title}{" "}
                      </span>
                    </p>
                  ))}
                </div>
              </p>
              <div className="confirm-delete-actions">
                <Button.Cancel
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                >
                  Cancelar
                </Button.Cancel>
                <Button.Primary
                  onClick={() => handleMultipleDelete(budgetsSelected)}
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

const Footer = ({ budgets }) => (
  <footer
    className="
            w-full
            fixed
            bottom-0
            bg-primary-dark/75
            backdrop-blur-xl
            shadow-xl
            shadow-purpleHover
            "
  >
    <div
      className="
              w-[90%]
              m-auto
              flex
              justify-end
              gap-5
              text-sm
              py-2
              "
    >
      <span
        className="
              h-full
              px-3
              py-2
              flex
              rounded-md
              rounded-bl-none
              bg-sketch
              text-sketch-dark
              items-center
              "
      >
        {`Selecionados: ${budgets.length}`}
      </span>

      {budgets.reduce(
        (prev, acc) =>
          prev + acc.totals.amountPaid.reduce((p, a) => p + a.value, 0),
        0,
      ) < budgets.reduce((prev, acc) => prev + acc.totals.total, 0) && (
        <div
          className="
              px-3
              py-2
              rounded-md
              rounded-bl-none
              bg-producing
              text-producing-dark
              "
        >
          Pendente:
          <span
            className="
              pl-2
              font-semibold
              "
          >
            {formatCurrency(
              budgets.reduce((prev, acc) => prev + acc.totals.total, 0) -
                budgets.reduce((prev, acc) => {
                  const status = ["sketch", "sent", "rejected"];

                  if (status.includes(acc.basic.status)) {
                    return prev + acc.totals.total;
                  }
                  return (
                    prev +
                    acc.totals.amountPaid.reduce((p, a) => p + a.value, 0)
                  );
                }, 0),
            )}
          </span>
        </div>
      )}

      <div
        className="
              px-3
              py-2
              rounded-md
              rounded-bl-none
              bg-finished
              text-finished-dark
              "
      >
        Total:
        <span
          className="
              pl-2
              font-semibold
              "
        >
          {formatCurrency(
            budgets.reduce((prev, acc) => prev + acc.totals.total, 0),
          )}
        </span>
      </div>
    </div>
  </footer>
);

const Filter = ({ budgets, setIsDeleteModalOpen }) => {
  const [modalStatusOpen, setModalStatusOpen] = useState(false);
  const dispatch = useDispatch();

  const firtsBudget = budgets[budgets.length - 1];

  const handleCopy = () => {
    const copy = [...budgets];
    copy.map((budget) => (budget.basic.code = generateBudgetCode()));
    copy.map((budget) => dispatch(createBudgetRequest(budget)));
  };

  return (
    <section
      className="
            w-full
            flex
            flex-col
            p-3
            gap-3
            bg-secondary
            border
            border-border-dark
            rounded-md
            "
    >
      <div
        className="
            w-full
            flex
            gap-3
            "
      >
        <div
          className="
              w-fit
              h-full
              flex
              flex-col
              gap-1
              self-stretch
              "
        >
          <span
            className="
                text-sm
                text-start
                font-bold
                "
          >
            Valor:
          </span>
          <input type="number" min={0.1} placeholder="R$" />
        </div>
        <div
          className="
              w-fit
              h-full
              flex
              flex-col
              gap-1
              text-sm
              text-start
              font-bold
              "
        >
          <span
            className="
                text-sm
                text-start
                font-bold
                "
          >
            Data:
          </span>
          <Form.ContainerInput>
            <DatePicker
              className="datePicker"
              format="DD/MM/YYYY"
              defaultValue={null}
            />
          </Form.ContainerInput>
        </div>
        <div
          className="
              w-fit
              h-full
              flex
              flex-col
              gap-1
              text-sm
              text-start
              font-bold
              "
        >
          <span
            className="
                text-sm
                text-start
                font-bold
                "
          >
            Validade:
          </span>
          <Form.ContainerInput>
            <DatePicker
              className="datePicker"
              format="DD/MM/YYYY"
              defaultValue={null}
            />
          </Form.ContainerInput>
        </div>
        <div
          className="
              w-fit
              h-full
              flex
              flex-col
              self-stretch
              gap-1
              text-sm
              text-start
              font-bold
              "
        >
          <span
            className="
                text-sm
                text-start
                font-bold
                "
          >
            Status:
          </span>

          <div
            onClick={() => setModalStatusOpen(!modalStatusOpen)}
            className="
                w-full
                h-full
                p-2.5
                flex
                gap-3
                items-center
                justify-between
                border
                border-border-dark
                rounded-md
                duration-300
                hover:bg-blueHover
                cursor-pointer
                relative
              "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                    w-full
                    ${modalStatusOpen ? "flex" : "hidden"}
                    flex-col
                    items-center
                    absolute
                    top-full
                    left-0
                    py-2
                    cursor-pointer
                    border
                    rounded-t-none
                    rounded-lg
                    bg-secondary
                    shadow-lg
                    shadow-blueHover
                    font-normal
                    z-20
                    `}
            >
              {budgetStatus.map((status, index) => (
                <div
                  key={index}
                  className="
                      w-full
                      py-1.5
                      flex
                      items-center
                      justify-center
                      hover:bg-secondary-dark
                      "
                >
                  <div
                    key={index + crypto.randomUUID()}
                    className={`
                              w-[75%]
                              h-full
                              flex
                              items-center
                              justify-center
                              px-5
                              py-1
                              gap-2
                              text-xs
                              text-center
                              border
                              rounded-md
                          bg-${status.value}
                          border-${status.value}-dark
                          text-${status.value}-dark
                            `}
                  >
                    {status.text}
                  </div>
                </div>
              ))}
            </div>

            {rowData(firtsBudget).map((line, index) => {
              if (budgetStatus.map((obj) => obj.text).includes(line.data)) {
                const currentBudgetStatus = budgetStatus.reduce((obj, item) => {
                  if (item.value === firtsBudget.basic.status) obj = item.text;
                  return obj;
                }, {});

                return (
                  <div
                    key={index + crypto.randomUUID()}
                    className={
                      !isEmptyObject(currentBudgetStatus)
                        ? `
                              w-fit
                              h-full
                              flex
                              items-center
                              justify-center
                              px-5
                              py-1.25
                              gap-2
                              text-xs
                              text-center
                              border
                              rounded-md
                          ${statusClasses[currentBudgetStatus.toLowerCase()]}
                            `
                        : ""
                    }
                  >
                    {!isEmptyObject(currentBudgetStatus)
                      ? currentBudgetStatus
                      : ""}
                  </div>
                );
              }
            })}
            <ChevronDown />
          </div>
        </div>
        <div
          className="
                  w-fit
                  h-fit
                  self-end
                  p-3
                  flex
                  items-center
                  rounded-md

                  text-gray-500
                  duration-300
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
          <BrushCleaning />
        </div>
        <div
          onClick={handleCopy}
          className="
                  w-fit
                  h-fit
                  self-end
                  p-3
                  flex
                  items-center
                  rounded-md

                  text-gray-500
                  duration-300
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
        <div
          onClick={() => setIsDeleteModalOpen(true)}
          className="
                  w-fit
                  h-fit
                  self-end
                  p-3
                  flex
                  items-center
                  rounded-md

                  border-2
                  duration-300
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
      </div>

      <div
        className="
            w-full
            flex
            justify-end
            "
      >
        <div
          className="
            w-fit
            flex
            "
        >
          <Button.Primary>
            <Save />
            Atualizar
          </Button.Primary>
        </div>
      </div>
    </section>
  );
};

const BudgetMenu = ({ budget, actions, menuPosition }) => {
  const dispatch = useDispatch();
  const budgetMenu = () => [
    {
      icon: Pen,
      text: "Editar",
      action: (budget) => {
        actions.setBudgetOpen(budget);
        actions.setBudget(budget);
        actions.setBudgetMenuOpen(false);
      },
    },
    {
      icon: Copy,
      text: "Duplicar",
      action: (budget) => {
        const copy = { ...budget };
        copy.basic.code = generateBudgetCode();

        dispatch(createBudgetRequest(copy));
        actions.setBudgetMenuOpen(false);
      },
    },
    {
      icon: Printer,
      text: "Imprimir",
      action: (budget) => {
        actions.setViewBudget(budget);
        actions.setBudget(budget);
        actions.setBudgetMenuOpen(false);
      },
    },
    {
      icon: Trash2,
      text: "Deletar",
      action: () => {
        actions.setIsDeleteModalOpen(true);
      },
    },
  ];

  return (
    <div
      onClick={() => actions.setBudgetMenuOpen(false)}
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
    </div>
  );
};
