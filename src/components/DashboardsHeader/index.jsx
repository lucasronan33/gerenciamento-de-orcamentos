import {
  CircleCheckBig,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../../context/Budget";
import { fetchClientsRequest } from "../../store/modules/client/actions";
import { amountPaid, sumValueByStatus } from "../../utils/calcs";
import { formatCurrency } from "../../utils/masks";
import { CardDashboard } from "../Cards/CardDashboard";

export default function DashboardsHeader() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { budgets, getBudgetsByStatus } = useBudget();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const approvedPercent = useMemo(() => {
    const totalBudgets = budgets.length;
    const totalApprovedBudgets = getBudgetsByStatus([
      "approved",
      "producing",
      "finished",
    ]).length;

    function calcTotal() {
      let total = (totalApprovedBudgets / totalBudgets) * 100;
      return total.toFixed(1);
    }
    return calcTotal();
  }, [budgets, getBudgetsByStatus]);

  const cards = [
    {
      title: "Receita",
      content: formatCurrency(amountPaid()),
      icon: DollarSign,
      colorIcon: "bg-success",
      colorText: "text-success",
    },
    {
      title: "A receber",
      content: formatCurrency(
        sumValueByStatus(["approved", "producing", "finished"]) - amountPaid(),
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
      content: `${getBudgetsByStatus(["approved", "producing"]).length} aprovados`,
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
    <div className="container">
      {cards.map((item, index) => (
        <div
          onClick={() => navigate("/dashboards")}
          key={index}
          className="
          min-w-50
          bg-secondary-dark
          p-[3vh]
          flex
          gap-5
          flex-wrap
          items-center
          justify-between
          border
          border-border
          rounded-2xl
          grow
          cursor-pointer
          "
        >
          <CardDashboard data={item} />
        </div>
      ))}
    </div>
  );
}
