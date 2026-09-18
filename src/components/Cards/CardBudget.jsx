import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Copy, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

export const statusClasses = {
  rascunho: `
        bg-sketch
        border-sketch-dark
        text-sketch-dark
        `,
  enviado: `
        bg-sent
        border-sent-dark
        text-sent-dark
        `,
  aprovado: `
        bg-approved
        border-approved-dark
        text-approved-dark
        `,
  produzindo: `
        bg-producing
        border-producing-dark
        text-producing-dark
        `,
  rejeitado: `
        bg-rejected
        border-rejected-dark
        text-rejected-dark
        `,
  finalizado: `
        bg-finished
        border-finished-dark
        text-finished-dark
        `,
};
export default function CardBudget({ budget }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setBudgetOpen, setBudget, setViewBudget, viewBudget } = useBudget();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCopy = () => {
    const copy = { ...budget };
    copy.basic.code = generateBudgetCode();

    dispatch(createBudgetRequest(copy));
  };
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      dispatch(deleteBudgetRequest(budget));
      setIsDeleteModalOpen(false);
    } catch {
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };
  const currentBudgetStatus = budgetStatus.reduce((obj, item) => {
    if (item.value === budget.basic.status) obj = item.text;
    return obj;
  }, {});

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
      w-fit
        bg-secondary/50
        p-5
        flex
        flex-1
        flex-wrap
        items-center
        justify-center
        border
        border-border-dark
        rounded-2xl
        hover:shadow-xl
        text-sm
        "
    >
      {viewBudget && <ViewBudget />}
      <div
        className="
        w-full
        "
      >
        <h2
          className="
          line-clamp-1
          font-semibold
          w-full
          text-left
          justify-start
          "
          title={budget.basic.title}
        >
          {budget.basic.title}{" "}
        </h2>
        <h4
          className="
          py-1
          line-clamp-1
          text-secondaryText-dark
          text-left
          text-xs
          justify-start
          w-full
          "
          title={budget.client.name}
        >
          {budget.client.name}{" "}
        </h4>
        <div
          className="
          w-full
          flex
          justify-between
          items-end
          pb-5"
        >
          <p className="text-secondaryText-dark">{budget.basic.code} </p>
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
            {!isEmptyObject(currentBudgetStatus) ? currentBudgetStatus : ""}
            {["approved", "producing", "finished"].includes(
              budget.basic.status,
            ) &&
              (!budget.totals.amountPaid ||
                budget.totals.amountPaid < budget.totals.total) && (
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
        </div>
      </div>

      <div
        className="
        w-full
        flex
        flex-col
        py-1
        gap-y-3
        "
      >
        <div
          className="
          w-full
          flex
          justify-between
          "
        >
          <p>Data: </p>
          <p>{dayjs(budget.basic.date).format("DD/MM/YYYY")} </p>
        </div>

        {budget.basic.validUntil ? (
          <div
            className="
            w-full
            flex
            justify-between
            "
          >
            <p>Validade: </p>
            <p>{dayjs(budget.basic.validUntil).format("DD/MM/YYYY")} </p>
          </div>
        ) : (
          budget.basic.time && (
            <div
              className="
              w-full
              flex
              justify-between
              "
            >
              <p>Horário: </p>
              <p>{budget.basic.time} </p>
            </div>
          )
        )}

        <div
          className="
          w-full
          flex
          justify-between
          "
        >
          <p>Itens: </p>
          <p>{budget.items?.length || 0} </p>
        </div>
      </div>
      <div
        className="
          w-full
          flex
          flex-col
          py-[1vh]
          gap-y-[1vh]"
      >
        <div
          className="
          w-full
          flex
          justify-between
          font-bold
          "
        >
          <h3>Total: </h3>
          <h3>{formatCurrency(budget.totals.total)} </h3>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isHovered ? "fit-content" : 0 }}
        className="
          w-full
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
          overflow-hidden
          "
      >
        <div
          className="card-icon viewOrc"
          onClick={() => {
            setViewBudget(true);
            setBudget(budget);
          }}
        >
          <Eye /> Ver
        </div>

        <div
          className="card-icon links"
          onClick={() => {
            setBudgetOpen(true);
            setBudget(budget);
          }}
        >
          <Edit />
        </div>

        <div className="card-icon links" onClick={() => handleCopy()}>
          <Copy />
        </div>
        <div
          className="card-icon trash-icon links"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="trashIco" />
        </div>
      </motion.div>

      {isDeleteModalOpen && (
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
              <strong> {budget.basic.title} </strong>
              do historico.
            </p>
            <div className="confirm-delete-actions">
              <Button.Root
                className="btn-cancel"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
              >
                Cancelar
              </Button.Root>
              <Button.Root
                className="btn-delete"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </Button.Root>
            </div>
          </div>
        </ConfirmDeleteModal>
      )}
    </div>
  );
}
