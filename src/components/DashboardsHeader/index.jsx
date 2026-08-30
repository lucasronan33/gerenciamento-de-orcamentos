import {
  CircleCheckBig,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { getBudgetsByStatus } from "@/utils/budget";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../../context/Budget";
import { fetchClientsRequest } from "../../store/modules/client/actions";
import { amountPaid, sumValueByStatus } from "../../utils/calcs";
import { formatCurrency } from "../../utils/masks";
import { CardDashboard } from "../Cards/CardDashboard";

export default function DashboardsHeader() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { budgets } = useBudget();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const approvedPercent = useMemo(() => {
    const totalBudgets = budgets.length;
    const totalApprovedBudgets = getBudgetsByStatus(
      ["approved", "producing", "finished"],
      budgets,
    ).length;

    function calcTotal() {
      let total = (totalApprovedBudgets / totalBudgets) * 100;
      return total.toFixed(1);
    }
    return calcTotal();
  }, [budgets, getBudgetsByStatus]);

  const cards = [
    {
      title: "Receita",
      content: formatCurrency(amountPaid(budgets)),
      icon: DollarSign,
      colorIcon: "bg-success",
      colorText: "text-success",
    },
    {
      title: "A receber",
      content: formatCurrency(
        sumValueByStatus(["approved", "producing", "finished"], budgets) -
          amountPaid(budgets),
      ),
      icon: Clock,
      colorIcon: "bg-warning",
      colorText: "text-warning",
    },
    {
      title: "Orçamentos",
      content: `${budgets.length} emitidos`,
      icon: FileText,
      colorIcon: "bg-blueDocument",
      colorText: "text-blueDocument",
    },
    {
      title: "Orçamentos",
      content: `${getBudgetsByStatus(["approved", "producing", "finished"], budgets).length} aprovados`,
      icon: CircleCheckBig,
      colorIcon: "bg-success",
      colorText: "text-success",
    },
    {
      title: "Taxa de aprovação",
      content: `${approvedPercent}%`,
      icon: TrendingUp,
      colorIcon: "bg-blueDocument",
      colorText: "text-blueDocument",
    },
  ];
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchClientsRequest());
  }, [isLoggedIn, dispatch]);

  return (
    <div
      className="
      w-[90%]
      m-auto
      flex
      flex-wrap
      items-center
      justify-between
      gap-3
      py-7.5
    "
    >
      {cards.map((item, index) => (
        <div
          onClick={() => navigate("/dashboards")}
          key={index}
          className="
          bg-secondary-dark
          p-5
          flex
          flex-1
          gap-5
          flex-wrap
          items-center
          justify-between
          self-stretch
          border
          border-border
          rounded-2xl
          cursor-pointer
          "
        >
          <CardDashboard data={item} />
        </div>
      ))}
    </div>
  );
}
