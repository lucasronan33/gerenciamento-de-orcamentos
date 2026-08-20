import { FileText, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Client } from "../../components/Form/Client";
import Header from "../../components/Header";
import { useBudget } from "../../context/Budget";
import { Container } from "../../styles/GlobalStyles";

export function Clients() {
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
  ];
  return (
    <>
      <Header />
      <Container>
        <main>
          <section>
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
              cadastro de clientes
            </span>
            <p
              className="
            text-secondary-text-dark
          "
            >
              Gerencie e cadastre seus clientes para usar nos orçamentos.
            </p>
          </section>
          <Client.Register />
        </main>
        <Client.List />
        <Button.FixedMenu children={iconsMenu} />
      </Container>
    </>
  );
}
