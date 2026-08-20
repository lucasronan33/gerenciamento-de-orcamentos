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
      max-w-[90%]
      min-h-[10vh]
      m-auto
      py-[2.5vh]
      flex
      justify-between
      items-center
      flex-auto
      flex-wrap
      gap-[3vh]
      "
    >
      {budgetOpen && <NewBudget />}
      <>
        <div
          className="
          flex
          max-md:flex-col
          items-center
          justify-between
          gap-[3vh]
          "
        >
          <Sidebar />
          <div
            className="
            max-md:w-full
            flex
            max-[375px]:flex-col
            max-[375px]:items-center
            gap-[3vh]
          "
          >
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
        </div>
        <div
          className="
          flex
          flex-1
          items-center
          justify-end
        "
        >
          <div
            className="
            max-sm:w-full
          "
          >
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
      </>
    </div>
  );
}
