import {
    CircleCheckBig,
    Clock,
    DollarSign,
    FileText,
    TrendingUp,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useBudget } from "../../context/Budget";
import { fetchClientsRequest } from "../../store/modules/client/actions";
import { formatCurrency } from "../../utils/masks";
import { CardDashboard } from "../Cards/CardDashboard";

export default function DashboardsHeader() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { budgets, getBudgetsByStatus } = useBudget();
    const dispatch = useDispatch();

    const sumValueByStatus = (status = []) => {
        const total = getBudgetsByStatus(status);
        return total
            .reduce((prevValue, currentValue) => {
                const value = Number(currentValue.totals.total);

                return prevValue + value;
            }, 0)
            .toFixed(2);
    };

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
            content: formatCurrency(sumValueByStatus(["finished"])),
            icon: DollarSign,
            colorIcon: "bg-success",
            colorText: "text-success",
        },
        {
            title: "A receber",
            content: formatCurrency(
                sumValueByStatus(["approved", "producing"]),
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
                <div className="card" key={index}>
                    <CardDashboard data={item} />
                </div>
            ))}
        </div>
    );
}
