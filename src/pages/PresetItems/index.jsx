import { Items } from "../../components/Form/Items";
import Header from "../../components/Header";
import { Container } from "../../styles/GlobalStyles";
import "./style.css";

export default function PresetItems() {
  return (
    <>
      <Header />
      <Container>
        <main className="settings-page">
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
              cadastro de itens
            </span>
            <p
              className="
            text-secondary-text-dark
          "
            >
              Gerencie e cadastre itens predefinidos usados no dia a dia do
              negócio.
            </p>
          </section>
          <Items.Register />
        </main>
        <Items.List />
      </Container>
    </>
  );
}
