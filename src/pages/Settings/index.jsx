import { FileText, Home, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import "../../components/Form/style.css";
import Header from "../../components/Header";
import { UserSettings } from "../../components/User";
import { useBudget } from "../../context/Budget";
import "./style.css";

export default function Settings() {
  const { setBudgetOpen } = useBudget();
  const navigate = useNavigate();

  const iconsMenu = [
    {
      title: "Home",
      icon: Home,
      action: () => navigate("/"),
    },
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
      <main
        className="
        w-[90%]
        m-auto"
      >
        <section className="settings-heading">
          <span
            className="
            font-black
            text-4xl
            max-sm:text-3xl
            uppercase
            bg-linear-to-br
            from-white
            to-blueDocument
            bg-clip-text text-transparent
          "
          >
            Configurações
          </span>
          <p
            className="
            text-secondary-text-dark
          "
          >
            Gerencie preferencias operacionais usadas no dia a dia do negocio.
          </p>
        </section>
        <UserSettings />
      </main>
      <Button.FixedMenu children={iconsMenu} />
    </div>
  );
}
