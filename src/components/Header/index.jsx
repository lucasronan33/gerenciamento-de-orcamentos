import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../../context/Budget";
import { budgetReset } from "../../store/modules/budget/actions";
import { Button } from "../Button";
import NewBudget from "../NewBudget";
import Sidebar from "../Sidebar";

export default function Header() {
    const { budgetOpen, setBudgetOpen, setBudget, initialState } = useBudget();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!budgetOpen) {
            document.body.removeAttribute("style");
            dispatch(budgetReset());
            setBudget(initialState);
            return;
        }
        if (budgetOpen) {
            document.body.style.overflow = "hidden";
            return;
        }
    }, [budgetOpen, initialState, dispatch, setBudget]);

    return (
        <div
            className="
        w-full
        min-h-[10vh]
        flex
        items-center
        justify-around
        py-[2.5vh]
        "
        >
            {budgetOpen && <NewBudget />}
            <div
                className="
            w-[90%]
            flex
            justify-around
            items-center
            flex-auto
            flex-wrap
            gap-[3vh]
            "
            >
                <div
                    className="
                flex
                items-center
                justify-between
                gap-[3vh]
                "
                >
                    <Sidebar />
                    <div className="logo" onClick={() => navigate("/")} />
                    <div
                        className="
                    h-full
                    flex
                    flex-1
                    flex-col
                    justify-around
                    gap-y-[0.7vh]
                    "
                    >
                        <div className="subtitle">Bem-vindo ao ORCA</div>
                        <div className="title">{user.name}</div>
                    </div>
                </div>
                <div>
                    <Button.Primary
                        onClick={() => {
                            setBudgetOpen(true);
                        }}
                    >
                        <Plus />
                        Novo Orçamento
                    </Button.Primary>
                </div>
            </div>
        </div>
    );
}
